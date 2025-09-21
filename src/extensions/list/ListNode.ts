//
import { Node as TiptapNode, mergeAttributes } from "@tiptap/core";
import type { Node } from "@tiptap/pm/model";
import { complexFormat } from "./listManager";

export interface ListOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customList: {
      formatNumberContent: () => ReturnType;
      toggleCustomList: () => ReturnType;
      splitCustomList: () => ReturnType;
      addIndent: () => ReturnType;
    };
  }
}

export const ListNode = TiptapNode.create<ListOptions>({
  name: "customList",
  group: "block",
  content: "listItem+",

  addAttributes() {
    return {
      // 列表缩进层级
      "data-indent": {
        default: 1,
        parseHTML: (element: HTMLElement) => element.getAttribute("data-indent"),
        renderHTML: (attributes: Record<string, any>) => {
          return {
            "data-indent": attributes["data-indent"],
          };
        },
      },
      // 列表序号
      "data-number": {
        default: 1,
        parseHTML: (element: HTMLElement) => {
          const value = element.getAttribute("data-number");
          return value ? parseInt(value) : 1;
        },
        renderHTML: (attributes: Record<string, any>) => {
          return {
            "data-number": attributes["data-number"],
          };
        },
      },
      // 列表序号内容
      "data-number-content": {
        default: "1.",
        parseHTML: (element: HTMLElement) => element.getAttribute("data-number-content"),
        renderHTML: (attributes: Record<string, any>) => {
          return {
            "data-number-content": attributes["data-number-content"],
          };
        },
      },
      "data-list-style-type": {
        default: "decimal",
        parseHTML: (element: HTMLElement) => element.getAttribute("data-list-style-type"),
        renderHTML: (attributes: Record<string, any>) => {
          return {
            "data-list-style-type": attributes["data-list-style-type"],
          };
        },
      },
      start: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute("start"),
        renderHTML: (attributes: Record<string, any>) => {
          return {
            start: attributes["start"],
          };
        },
      },
    };
  },

  parseHTML: () => {
    return [
      {
        tag: "ol",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["ol", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      formatNumberContent:
        () =>
        ({ editor, state, tr, dispatch }) => {

          const customListNodes: { node: Node; pos: number }[] = [];

          // 收集所有customList节点
          editor.state.doc.descendants((node, pos) => {
            if (node.type.name === "customList") {
              customListNodes.push({ node, pos });
            }
          });

          if (customListNodes.length === 0) return false;

          // 按层级分组统计序号
          const indentCounters: { [key: number]: number } = {};

          console.log("customListNodes", customListNodes);
          customListNodes.forEach(({ node, pos }, index) => {
            const { "data-indent": indent, "data-list-style-type": listStyleType } = node.attrs;
            const currentIndent = parseInt(indent) || 1;

            // 重置更深层级的计数器
            for (let level in indentCounters) {
              if (parseInt(level) > currentIndent) {
                delete indentCounters[level];
              }
            }

            // 初始化或递增当前层级的计数器
            if (!indentCounters[currentIndent]) {
              indentCounters[currentIndent] = 1;
            } else {
              indentCounters[currentIndent]++;
            }

            console.log(indentCounters);
            // 构建当前项的完整序号内容（用于多层级显示）
            let fullNumberContent = "";
            for (let i = 1; i <= currentIndent; i++) {
              if (indentCounters[i]) {
                if (i === 1) {
                  // 第一层级直接使用格式化函数
                  fullNumberContent = complexFormat(
                    listStyleType || "decimal",
                    i,
                    indentCounters[i],
                    ""
                  );
                } else {
                  // 更深层级需要传入上级内容
                  fullNumberContent = complexFormat(
                    listStyleType || "decimal",
                    i,
                    indentCounters[i],
                    fullNumberContent
                  );
                }
              }
            }

            // 更新节点属性
            const newAttrs = {
              ...node.attrs,
              "data-number": indentCounters[currentIndent],
              "data-number-content": fullNumberContent,
            };

            tr.setNodeMarkup(pos, undefined, newAttrs);
          });

          if (dispatch) {
            dispatch(tr);
          }
          return true;
        },
      toggleCustomList:
        () =>
        ({ state, commands, tr, chain }) => {
          const { selection } = state;
          const { from, to } = selection;

          // 检查当前选择是否在customList中
          let isInCustomList = false;
          state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.type.name === "customList") {
              isInCustomList = true;
              return false; // 停止遍历
            }
          });

          if (isInCustomList) {
            // 如果在customList中，将其转换为普通段落
            // 使用lift命令将listItem提升为段落
            return chain().focus().lift("listItem").run();
          } else {
            // 如果不在customList中，将段落转换为customList
            // 首先将段落包装为listItem，然后包装为customList
            return chain()
              .focus()
              .lift("listItem")
              .wrapIn("customList", {
                "data-indent": 1,
                "data-number-content": "1.",
                "data-list-style-type": "decimal",
              })
              .run();
          }
        },
      splitCustomList:
        () =>
        ({ state, commands, tr, chain, dispatch }) => {
          const { selection } = state;
          const { from, to } = selection;

          // 查找当前customList节点的位置和属性
          let customListNode: Node | null = null;
          let customListPos = -1;
          state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.type.name === "customList" && pos <= from && pos + node.nodeSize > from) {
              customListNode = node;
              customListPos = pos;
              return false; // 停止遍历
            }
          });

          if (customListNode && customListPos !== -1) {
            // 获取当前列表的属性
            const currentAttrs = (customListNode as Node)?.attrs;

            // 创建新的customList节点，继承当前列表的样式属性
            const newListAttrs = {
              ...currentAttrs,
              "data-number-content": "1.", // 重置序号
              "data-start": 1, // 重置起始编号
            };

            // 创建新的customList节点，包含一个空的listItem
            const newListItem = state.schema.nodes.listItem.create(
              { "data-indent": currentAttrs["data-indent"] || "0" },
              state.schema.nodes.paragraph.create()
            );

            const newCustomList = state.schema.nodes.customList.create(newListAttrs, [newListItem]);

            // 在当前customList后面插入新的customList
            const insertPos = customListPos + (customListNode as Node)?.nodeSize;

            chain()
              .insertContentAt(insertPos, newCustomList)
              .setTextSelection(insertPos + 2) // 定位到新列表的第一个段落
              .formatNumberContent()
              .run();

            return true;
          }

          return false;
        },
      addIndent:
        () =>
        ({ state, commands, tr, chain }) => {
          const { selection } = state;
          const { from, to } = selection;

          // 查找当前customList节点的位置和属性
          let customListNode: Node | null = null;
          let customListPos = -1;
          state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.type.name === "customList" && pos <= from && pos + node.nodeSize > from) {
              customListNode = node;
              customListPos = pos;
              return false; // 停止遍历
            }
          });

          if (customListNode && customListPos !== -1) {
            // 增加缩进
            const newIndent = (customListNode as Node)?.attrs["data-indent"] || 0;
            const newAttrs = {
              ...(customListNode as Node)?.attrs,
              "data-indent": Math.min(newIndent + 1, 4),
            };
            tr.setNodeMarkup(customListPos, (customListNode as Node)?.type, newAttrs);
            return true;
          }

          return false;
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitCustomList(),
      Tab: () => this.editor.commands.addIndent(),
    };
  },
});
