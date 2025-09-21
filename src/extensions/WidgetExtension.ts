import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";

export interface WidgetExtensionOptions {
  widgetClass?: string;
  showMenu?: boolean;
  menuItems?: Array<{
    icon: string;
    label: string;
    action: string;
  }>;
  onSelectionChange?: (position: { x: number; y: number; from: number; to: number }) => void;
}

const widgetPluginKey = new PluginKey("widget-extension");

export const WidgetExtension = Extension.create<WidgetExtensionOptions>({
  name: "widgetExtension",

  addOptions() {
    return {
      widgetClass: "floating-menu",
      showMenu: true,
      menuItems: [
        { icon: "✏️", label: "编辑", action: "edit" },
        { icon: "📋", label: "复制", action: "copy" },
        { icon: "🗑️", label: "删除", action: "delete" },
        { icon: "➕", label: "插入", action: "insert" },
      ],
      onSelectionChange: () => {},
    };
  },

  addProseMirrorPlugins() {
    const options = this.options;

    return [
      new Plugin({
        key: widgetPluginKey,
        view(editorView) {
          return {
            update: (view, prevState) => {
              const { state } = view;
              const { selection } = state;

              // 检查选择是否发生变化
              if (!prevState || !selection.eq(prevState.selection)) {
                // 找到光标所在的顶级节点
                const { $from } = selection;
                let topLevelNodePos = 0;

                // 向上遍历找到顶级节点
                for (let depth = $from.depth; depth > 0; depth--) {
                  const node = $from.node(depth);
                  if (depth === 1) {
                    // 顶级节点（文档的直接子节点）
                    topLevelNodePos = $from.start(depth);
                    break;
                  }
                }

                // 获取顶级节点在屏幕上的坐标
                const coords = view.coordsAtPos(topLevelNodePos);

                // 调用回调函数，传递位置信息
                if (options.onSelectionChange) {
                  options.onSelectionChange({
                    x: coords.left - 50,
                    y: coords.top,
                    from: selection.from,
                    to: selection.to,
                  });
                }
              }
            },
          };
        },
      }),
    ];
  },
});

export default WidgetExtension;
