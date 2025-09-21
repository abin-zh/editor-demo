<template>
  <div class="editor-container">
    <!-- 工具栏 -->
    <div class="toolbar">
      <!-- 字体选择 -->
      <div class="toolbar-group">
        <select
          v-model="selectedFont"
          @change="changeFont"
          class="toolbar-select font-select"
          title="字体"
        >
          <option value="Microsoft YaHei">微软雅黑</option>
          <option value="SimSun">宋体</option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
      </div>

      <div class="toolbar-divider"></div>

      <!-- 标题选择 -->
      <div class="toolbar-group">
        <select
          v-model="selectedHeading"
          @change="changeHeading"
          class="toolbar-select heading-select"
          title="标题"
        >
          <option value="">正文</option>
          <option value="1">标题 1</option>
          <option value="2">标题 2</option>
          <option value="3">标题 3</option>
          <option value="4">标题 4</option>
          <option value="5">标题 5</option>
          <option value="6">标题 6</option>
        </select>
      </div>

      <div class="toolbar-divider"></div>

      <!-- 文本格式化 -->
      <div class="toolbar-group">
        <button
          @click="editor?.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor?.isActive('bold') }"
          class="toolbar-button"
          title="加粗"
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="currentColor"
              d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
            />
          </svg>
        </button>

        <button
          @click="editor?.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor?.isActive('italic') }"
          class="toolbar-button"
          title="斜体"
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z" />
          </svg>
        </button>

        <button
          @click="editor?.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor?.isActive('strike') }"
          class="toolbar-button"
          title="删除线"
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="currentColor"
              d="M7.24 8.75c-.26-.48-.39-1.03-.39-1.67 0-.61.13-1.16.4-1.67.26-.5.63-.93 1.11-1.29.48-.35 1.05-.63 1.7-.83.66-.19 1.39-.29 2.18-.29.81 0 1.54.11 2.21.34.66.22 1.23.54 1.69.94.47.4.83.88 1.08 1.43.25.55.38 1.15.38 1.81h-3.01c0-.31-.05-.59-.15-.85-.09-.27-.24-.49-.44-.68-.2-.19-.45-.33-.75-.44-.3-.1-.66-.16-1.06-.16-.39 0-.74.04-1.03.13-.29.09-.53.21-.72.36-.19.16-.33.34-.44.55-.10.21-.15.43-.15.66 0 .48.25.88.74 1.21.38.25.77.48 1.41.7H7.39c-.05-.08-.11-.17-.15-.25zM21 12v-2H3v2h9.62c.18.07.4.14.55.2.37.17.66.34.87.51.21.17.35.36.43.57.07.2.11.43.11.69 0 .23-.05.45-.14.66-.09.2-.23.38-.42.53-.19.15-.42.26-.71.35-.29.08-.63.13-1.01.13-.43 0-.83-.04-1.18-.13-.35-.09-.65-.22-.89-.39-.25-.17-.44-.37-.59-.62-.15-.24-.25-.55-.25-.93H9.05c0 .67.14 1.29.42 1.86.28.57.67 1.07 1.17 1.49.5.42 1.09.74 1.79.98.69.24 1.44.37 2.24.37.61 0 1.23-.08 1.87-.24.63-.16 1.21-.4 1.73-.73.52-.33.94-.75 1.26-1.26.32-.51.48-1.11.48-1.79 0-.8-.21-1.48-.63-2.05-.42-.57-.1-.04-1.04-.55L21 12z"
            />
          </svg>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <!-- 列表 -->
      <div class="toolbar-group">
        <button
          @click="editor?.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor?.isActive('bulletList') }"
          class="toolbar-button"
          title="无序列表"
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="currentColor"
              d="M7 5h14v2H7V5zm0 8v-2h14v2H7zM4 4.5A1.5 1.5 0 0 1 5.5 6A1.5 1.5 0 0 1 4 7.5A1.5 1.5 0 0 1 2.5 6A1.5 1.5 0 0 1 4 4.5zm0 6A1.5 1.5 0 0 1 5.5 12A1.5 1.5 0 0 1 4 13.5A1.5 1.5 0 0 1 2.5 12A1.5 1.5 0 0 1 4 10.5zm0 6A1.5 1.5 0 0 1 5.5 18A1.5 1.5 0 0 1 4 19.5A1.5 1.5 0 0 1 2.5 18A1.5 1.5 0 0 1 4 16.5zM7 19v-2h14v2H7z"
            />
          </svg>
        </button>

        <button
          @click="editor?.chain().focus().toggleCustomList().run()"
          :class="{ 'is-active': editor?.isActive('customList') }"
          class="toolbar-button"
          title="有序列表"
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="currentColor"
              d="M7 13v-2h14v2H7zm0 6v-2h14v2H7zM7 7V5h14v2H7zM3 8V5H2V4h2v4H3zm1 9v-1h-1v-1h1v-1H2v1.5h1v1H2V17h2zm-1-2.5H2.5v-.5h.5v.5zM2 11h2v1H3v1h1v1H2v-1.5h1v-1H2V11z"
            />
          </svg>
        </button>

        <button
          @click="openListFormatModal"
          :disabled="!editor?.isActive('orderedList') && !editor?.isActive('ftsList')"
          class="toolbar-button"
          title="列表格式"
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="currentColor"
              d="M3 17h18v2H3v-2zm0-6h18v2H3v-2zm0-6h18v2H3V5zm0 12h18v2H3v-2z"
            />
          </svg>
        </button>

        <button
          @click="formatListNumbers"
          class="toolbar-button"
          title="更新列表序号"
          style="background-color: #e3f2fd;"
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="currentColor"
              d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
            />
          </svg>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <!-- 撤销重做 -->
      <div class="toolbar-group">
        <button
          @click="editor?.chain().focus().undo().run()"
          :disabled="!editor?.can().undo()"
          class="toolbar-button"
          title="撤销"
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="currentColor"
              d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"
            />
          </svg>
        </button>

        <button
          @click="editor?.chain().focus().redo().run()"
          :disabled="!editor?.can().redo()"
          class="toolbar-button"
          title="重做"
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="currentColor"
              d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"
            />
          </svg>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <!-- 自定义扩展 -->
      <div class="toolbar-group">
        <button
          @click="triggerCustomExtension"
          class="toolbar-button custom-extension-button"
          title="自定义功能"
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="currentColor"
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        </button>

        <button
          @click="triggerVariableTool"
          class="toolbar-button variable-tool-button"
          title="设置变量"
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="currentColor"
              d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-8.5-7.5H11v-2H9.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5zm0 2H11v2H9.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5z"
            />
          </svg>
        </button>
      </div>

      <!-- <div class="toolbar-group">
        <button @click="exportDocx" class="toolbar-button" title="导出">导出</button>
      </div> -->
    </div>

    <!-- 编辑器内容区域 -->
    <div class="editor-content-wrapper">
      <editor-content :editor="editor" class="editor-content" />
    </div>

    <!-- 段落编辑弹窗 -->
    <ParagraphModal
      :visible="modalVisible"
      :paragraphs="selectedParagraphs"
      :initial-title="existingPartTitle"
      @close="closeModal"
      @confirm="confirmChanges"
    />

    <!-- 变量设置弹窗 -->
    <VariableModal
      :visible="variableModalVisible"
      :selected-text="selectedText"
      @close="closeVariableModal"
      @confirm="confirmVariableChanges"
    />

    <!-- 悬浮菜单 -->
    <div
      v-if="floatingMenuVisible"
      class="floating-menu-container"
      :style="{
        position: 'fixed',
        left: floatingMenuPosition.x - 16 + 'px',
        top: floatingMenuPosition.y - 40 + 'px',
        zIndex: 1000,
      }"
    >
      <!-- 触发按钮 -->
      <button
        @click="toggleFloatingMenu"
        class="menu-trigger"
        :class="{ active: floatingMenuOpen }"
      >
        ⚡
      </button>

      <!-- 菜单面板 -->
      <div v-if="floatingMenuOpen" class="menu-panel">
        <button
          v-for="item in menuItems"
          :key="item.action"
          @click="handleMenuAction(item.action)"
          class="menu-item"
        >
          {{ item.icon }} {{ item.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import { FontFamily, TextStyle } from "@tiptap/extension-text-style";
import UniqueId from "@tiptap/extension-unique-id";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import PartNode from "@/extensions/PartNode";
import VariableNode from "@/extensions/VariableNode";
import WidgetExtension from "@/extensions/WidgetExtension";
import { ListNode } from "@/extensions/list/ListNode";
import ParagraphModal from "@/components/ParagraphModal.vue";
import VariableModal from "@/components/VariableModal.vue";
import { writeDocx, DocxSerializer, defaultNodes, defaultMarks } from "prosemirror-docx";

interface ParagraphData {
  id: string;
  label: string;
  value: string;
  placeholder: string;
}

// 响应式数据
const selectedFont = ref("Microsoft YaHei");
const selectedHeading = ref("");
const modalVisible = ref(false);
const selectedParagraphs = ref<ParagraphData[]>([]);
const existingPartTitle = ref("");
const variableModalVisible = ref(false);
const selectedText = ref("");

// 悬浮菜单相关数据
const floatingMenuVisible = ref(false);
const floatingMenuPosition = ref({ x: 0, y: 0 });
const floatingMenuOpen = ref(false);
const menuItems = [
  { icon: "✏️", label: "编辑", action: "edit" },
  { icon: "📋", label: "复制", action: "copy" },
  { icon: "🗑️", label: "删除", action: "delete" },
  { icon: "➕", label: "插入", action: "insert" },
  { icon: "🎨", label: "格式", action: "format" },
];

// 列表格式相关数据
const listFormatModalVisible = ref(false);
const currentListFormat = ref("decimal");
const currentCustomFormat = ref("");

const editor = useEditor({
  // register extensions
  extensions: [
    Document,
    Paragraph,
    FontFamily,
    TextStyle,
    StarterKit.configure({
      orderedList: false
    }),
    Underline,
    UniqueId.configure({
      types: ["heading", "paragraph", "listItem"],
    }),
    PartNode,
    VariableNode,
    ListNode,
    WidgetExtension.configure({
      onSelectionChange: (position) => {
        floatingMenuPosition.value = { x: position.x, y: position.y };
        floatingMenuVisible.value = true;
        floatingMenuOpen.value = false; // 关闭菜单面板
      },
    }),
  ],
  // set the initial content
  content: '<p style="font-family: Microsoft YaHei">在这里开始编辑你的内容...</p>',
  // place the cursor in the editor after initialization
  autofocus: true,
  // make the text editable (default is true)
  editable: true,
  // prevent loading the default ProseMirror CSS that comes with Tiptap
  // should be kept as `true` for most cases as it includes styles
  // important for Tiptap to work correctly
  injectCSS: false,

  // 生命周期函数 - 打印所有事件
  onBeforeCreate({ editor }) {
    console.log('🔄 [Tiptap Lifecycle] onBeforeCreate - 编辑器视图创建之前', { editor });
  },

  onCreate({ editor }) {
    console.log('✅ [Tiptap Lifecycle] onCreate - 编辑器完全初始化并准备就绪', { editor });
  },

  onUpdate({ editor }) {
    console.log('📝 [Tiptap Lifecycle] onUpdate - 内容发生变化', {
      editor,
      content: editor.getHTML(),
      json: editor.getJSON()
    });
  },

  onSelectionUpdate({ editor }) {
    // console.log('🎯 [Tiptap Lifecycle] onSelectionUpdate - 选择发生变化', {
    //   editor,
    //   selection: editor.state.selection,
    //   from: editor.state.selection.from,
    //   to: editor.state.selection.to
    // });
  },

  onTransaction({ editor, transaction }) {
    console.log('🔄 [Tiptap Lifecycle] onTransaction - 编辑器状态改变', {
      editor,
      transaction,
      docChanged: transaction.docChanged,
      selectionSet: transaction.selectionSet
    });
  },

  // onFocus({ editor, event }) {
  //   console.log('🎯 [Tiptap Lifecycle] onFocus - 编辑器获得焦点', { editor, event });
  // },

  // onBlur({ editor, event }) {
  //   console.log('😴 [Tiptap Lifecycle] onBlur - 编辑器失去焦点', { editor, event });
  // },

  onDestroy() {
    console.log('💥 [Tiptap Lifecycle] onDestroy - 编辑器实例被销毁');
  },

  onPaste({ editor, event, slice }) {
    console.log('📋 [Tiptap Lifecycle] onPaste - 内容被粘贴到编辑器', {
      editor,
      event,
      slice,
      pastedContent: slice.content
    });
  },

  onDrop({ editor, event, slice, moved }) {
    console.log('🎯 [Tiptap Lifecycle] onDrop - 内容被拖放到编辑器', {
      editor,
      event,
      slice,
      moved,
      droppedContent: slice.content
    });
  },

  onDelete({ editor, type, deletedRange, newRange, partial, node, mark, from, to, newFrom, newTo }) {
    console.log('🗑️ [Tiptap Lifecycle] onDelete - 内容从编辑器中删除', {
      editor,
      type,
      deletedRange,
      newRange,
      partial,
      node,
      mark,
      from,
      to,
      newFrom,
      newTo
    });
  },

  onContentError({ editor, error, disableCollaboration }) {
    console.error('❌ [Tiptap Lifecycle] onContentError - 内容不匹配模式', {
      editor,
      error,
      disableCollaboration
    });
  },
});

// 字体更改功能
const changeFont = () => {
  if (!editor.value) return;

  if (selectedFont.value) {
    editor.value.chain().focus().setFontFamily(selectedFont.value).run();
  } else {
    editor.value.chain().focus().unsetFontFamily().run();
  }
};

// 标题更改功能
const changeHeading = () => {
  if (!editor.value) return;

  if (selectedHeading.value) {
    const level = parseInt(selectedHeading.value) as 1 | 2 | 3 | 4 | 5 | 6;
    editor.value.chain().focus().toggleHeading({ level }).run();
  } else {
    editor.value.chain().focus().setParagraph().run();
  }
};

// 监听编辑器选择变化，更新下拉框状态
const updateSelectionState = () => {
  if (!editor.value) return;

  // 更新字体选择状态
  const fontFamily = editor.value.getAttributes("textStyle").fontFamily;
  selectedFont.value = fontFamily || "";

  // 更新标题选择状态
  for (let level = 1; level <= 6; level++) {
    if (editor.value.isActive("heading", { level })) {
      selectedHeading.value = level.toString();
      return;
    }
  }
  selectedHeading.value = "";
};

// 触发自定义扩展功能
const triggerCustomExtension = () => {
  if (!editor.value) return;

  // 调用自定义扩展处理选中的段落
  const { from, to } = editor.value.state.selection;
  const selectedNodes: Array<{ node: any; pos: number }> = [];
  let isPartSelected = false;
  let existingPartData: any = null;

  // 遍历选中的内容，查找p标签和part标签
  editor.value.state.doc.nodesBetween(from, to, (node: any, pos: number) => {
    if (node.type.name === "part") {
      isPartSelected = true;
      existingPartData = {
        title: node.attrs["data-title"] || "",
        content: node.attrs["data-content"] || "[]",
      };
      // 如果选中了part，遍历其中的段落
      node.forEach((childNode: any) => {
        if (childNode.type.name === "paragraph") {
          selectedNodes.push({ node: childNode, pos });
        }
      });
    } else if (node.type.name === "paragraph" && !isPartSelected) {
      selectedNodes.push({ node, pos });
    }
  });

  if (selectedNodes.length === 0) {
    alert("请先选择一个或多个段落");
    return;
  }

  // 生成数据数组
  let paragraphsData: ParagraphData[];

  if (isPartSelected && existingPartData) {
    // 如果选中的是已存在的part，尝试解析其内容
    try {
      const parsedContent = JSON.parse(existingPartData.content.replace(/&quot;/g, '"'));
      paragraphsData = parsedContent.map((item: any, index: number) => ({
        id: item.id || `para_${Date.now()}_${index}`,
        label: item.label || selectedNodes[index]?.node.textContent || "",
        value: item.value || "",
        placeholder: item.placeholder || `请输入内容 ${index + 1}`,
      }));
    } catch (error) {
      // 如果解析失败，使用默认生成方式
      paragraphsData = selectedNodes.map((item, index) => {
        const id = item.node.attrs.id || `para_${Date.now()}_${index}`;
        const textContent = item.node.textContent || "";

        return {
          id,
          label: textContent,
          value: "",
          placeholder: `请输入内容 ${index + 1}`,
        };
      });
    }
  } else {
    // 新建part的情况
    paragraphsData = selectedNodes.map((item, index) => {
      const id = item.node.attrs.id || `para_${Date.now()}_${index}`;
      const textContent = item.node.textContent || "";

      return {
        id,
        label: textContent,
        value: "",
        placeholder: `请输入内容 ${index + 1}`,
      };
    });
  }

  selectedParagraphs.value = paragraphsData;
  existingPartTitle.value = isPartSelected && existingPartData ? existingPartData.title : "";
  modalVisible.value = true;
};

// 关闭弹窗
const closeModal = () => {
  modalVisible.value = false;
  selectedParagraphs.value = [];
  existingPartTitle.value = "";
};

// 确认修改
const confirmChanges = (data: { title: string; paragraphs: ParagraphData[] }) => {
  if (!editor.value) return;

  try {
    const { from, to } = editor.value.state.selection;

    // 简单的方法：直接用HTML替换选中内容
    let htmlContent = "";
    data.paragraphs.forEach((para, index) => {
      htmlContent += `<p data-id="${para.id}">${para.label}: <u> </u></p>`;
    });

    // 创建part标签包装
    const partId = `part_${Date.now()}`;
    const escapedContent = JSON.stringify(data.paragraphs).replace(/"/g, "&quot;");
    const partHtml = `<part data-id="${partId}" data-title="${data.title}" data-content="${escapedContent}">${htmlContent}</part>`;

    // 插入HTML内容
    editor.value
      .chain()
      .focus()
      .setTextSelection({ from, to })
      .deleteSelection()
      .insertContent(partHtml)
      .run();

    closeModal();
  } catch (error) {
    console.error("更新内容时出错:", error);
    alert("更新内容时出现错误，请重试");
    closeModal();
  }
};

// 触发变量工具
const triggerVariableTool = () => {
  if (!editor.value) return;

  const { from, to } = editor.value.state.selection;

  // 检查是否有选中的文本
  if (from === to) {
    alert("请先选择一段文字");
    return;
  }

  // 获取选中的文本
  const selectedTextContent = editor.value.state.doc.textBetween(from, to, " ");

  if (!selectedTextContent.trim()) {
    alert("请选择有效的文字内容");
    return;
  }

  selectedText.value = selectedTextContent;
  variableModalVisible.value = true;
};

// 关闭变量弹窗
const closeVariableModal = () => {
  variableModalVisible.value = false;
  selectedText.value = "";
};

// 悬浮菜单操作
const toggleFloatingMenu = () => {
  floatingMenuOpen.value = !floatingMenuOpen.value;
};

const handleMenuAction = (action: string) => {
  console.log(`执行操作: ${action}`);
  floatingMenuOpen.value = false;

  // 这里可以添加具体的操作逻辑
  switch (action) {
    case "edit":
      // 编辑操作
      break;
    case "copy":
      // 复制操作
      if (editor.value) {
        const { from, to } = editor.value.state.selection;
        const text = editor.value.state.doc.textBetween(from, to, " ");
        navigator.clipboard.writeText(text);
      }
      break;
    case "delete":
      // 删除操作
      if (editor.value) {
        editor.value.chain().focus().deleteSelection().run();
      }
      break;
    case "insert":
      // 插入操作
      break;
    case "format":
      // 格式操作
      break;
  }
};

// 点击外部关闭菜单
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".floating-menu-container")) {
    floatingMenuOpen.value = false;
  }
};

// 列表格式相关函数
const openListFormatModal = () => {
  if (!editor.value) return;

  // 检查当前是否在列表中
  if (editor.value.isActive("ftsList")) {
    const attrs = editor.value.getAttributes("ftsList");
    currentListFormat.value = attrs.listStyleType || "decimal";
    currentCustomFormat.value = attrs.customFormat || "";
  } else {
    currentListFormat.value = "decimal";
    currentCustomFormat.value = "";
  }

  listFormatModalVisible.value = true;
};

const closeListFormatModal = () => {
  listFormatModalVisible.value = false;
};

const formatListNumbers = () => {
  if (!editor.value) return;

  console.log('🔄 手动触发 formatNumberContent 命令');
  const result = editor.value.commands.formatNumberContent();
  console.log('✅ formatNumberContent 命令执行结果:', result);
};

const confirmListFormat = (data: {
  formatType: string;
  customFormat?: string;
  resetNumbers: boolean;
}) => {
  if (!editor.value) return;

  try {
    // 如果当前不在列表中，先创建列表
    if (!editor.value.isActive("orderedList") && !editor.value.isActive("ftsList")) {
      editor.value
        .chain()
        .focus()
        .toggleCustomOrderedList(data.formatType, data.customFormat)
        .run();
    } else {
      // 如果已经在列表中，更新格式
      editor.value.chain().focus().setCustomListType(data.formatType, data.customFormat).run();
    }

    // 如果需要重置编号，设置为1
    if (data.resetNumbers) {
      editor.value.chain().focus().resetNumber().run();
    }

    closeListFormatModal();
  } catch (error) {
    console.error("设置列表格式时出错:", error);
    alert("设置列表格式时出现错误，请重试");
  }
};

// 添加和移除事件监听器
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// 确认变量设置
const confirmVariableChanges = (data: { title: string; placeholder: string }) => {
  if (!editor.value) return;

  try {
    const { from, to } = editor.value.state.selection;

    // 生成变量ID
    const variableId = `var_${Date.now()}`;

    // 创建variable标签
    const variableHtml = `<variable data-id="${variableId}" data-title="${data.title}" data-value="" data-comment="${data.placeholder}">${selectedText.value}</variable>`;

    // 替换选中的内容
    editor.value
      .chain()
      .focus()
      .setTextSelection({ from, to })
      .deleteSelection()
      .insertContent(variableHtml)
      .run();

    closeVariableModal();
  } catch (error) {
    console.error("设置变量时出错:", error);
    alert("设置变量时出现错误，请重试");
    closeVariableModal();
  }
};

const exportDocx = async () => {
  if (!editor.value) return;

  const nodeSerializer = {
    ...defaultNodes,
    hardBreak: defaultNodes.hard_break,
    codeBlock: defaultNodes.code_block,
    orderedList: defaultNodes.ordered_list,
    listItem: defaultNodes.list_item,
    bulletList: defaultNodes.bullet_list,
    horizontalRule: defaultNodes.horizontal_rule,
  };

  const myDocxSerializer = new DocxSerializer(nodeSerializer, defaultMarks);

  const opts = {
    getImageBuffer(src: string) {
      return new Uint8Array([1, 2, 3]);
    },
  };

  const wordDocument = myDocxSerializer.serialize(editor.value.state.doc, opts);

  writeDocx(wordDocument, (buffer) => {
    // use buffer
  });
};

// 监听编辑器更新
onMounted(() => {
  if (editor.value) {
    editor.value.on("selectionUpdate", updateSelectionState);
    editor.value.on("transaction", updateSelectionState);
  }
});
</script>

<style scoped>
.editor-container {
  width: 800px;
  margin: 0 auto;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.toolbar {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  border-radius: 8px 8px 0 0;
  gap: 8px;
  flex-wrap: wrap;
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.toolbar-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s ease;
  font-size: 12px;
  font-weight: 600;
}

.toolbar-button:hover {
  background: #e5e7eb;
  border-color: #d1d5db;
}

.toolbar-button:active {
  background: #d1d5db;
}

.toolbar-button.is-active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.toolbar-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.toolbar-button:disabled:hover {
  background: transparent;
  border-color: transparent;
}

.toolbar-select {
  height: 32px;
  padding: 4px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: white;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s ease;
  outline: none;
}

.toolbar-select:hover {
  border-color: #9ca3af;
}

.toolbar-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.1);
}

.font-select {
  min-width: 120px;
}

.heading-select {
  min-width: 80px;
}

.toolbar-divider {
  width: 1px;
  height: 20px;
  background: #d1d5db;
  margin: 0 4px;
}

.editor-content-wrapper {
  padding: 16px;
  min-height: 400px;
}

.editor-content {
  outline: none;
}

/* 编辑器内容样式 */
.editor-content :deep(.ProseMirror) {
  outline: none;
  padding: 0;
  line-height: 1.6;
  font-size: 16px;
  color: #1f2937;
  font-family: "Microsoft YaHei", sans-serif;
}

.editor-content :deep(.ProseMirror p) {
  margin: 0 0 16px 0;
}

.editor-content :deep(.ProseMirror p:last-child) {
  margin-bottom: 0;
}

.editor-content :deep(.ProseMirror h1) {
  font-size: 2em;
  font-weight: bold;
  margin: 24px 0 16px 0;
  line-height: 1.2;
}

.editor-content :deep(.ProseMirror h2) {
  font-size: 1.5em;
  font-weight: bold;
  margin: 20px 0 12px 0;
  line-height: 1.3;
}

.editor-content :deep(.ProseMirror h3) {
  font-size: 1.25em;
  font-weight: bold;
  margin: 16px 0 8px 0;
  line-height: 1.4;
}

.editor-content :deep(.ProseMirror h4) {
  font-size: 1.1em;
  font-weight: bold;
  margin: 14px 0 6px 0;
  line-height: 1.4;
}

.editor-content :deep(.ProseMirror h5) {
  font-size: 1em;
  font-weight: bold;
  margin: 12px 0 4px 0;
  line-height: 1.4;
}

.editor-content :deep(.ProseMirror h6) {
  font-size: 0.9em;
  font-weight: bold;
  margin: 10px 0 4px 0;
  line-height: 1.4;
}

.editor-content :deep(.ProseMirror li) {
  margin: 4px 0;
}

.editor-content :deep(.ProseMirror strong) {
  font-weight: bold;
}

.editor-content :deep(.ProseMirror em) {
  font-style: italic;
}

.editor-content :deep(.ProseMirror s) {
  text-decoration: line-through;
}

.editor-content :deep(.ProseMirror p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: #9ca3af;
  pointer-events: none;
  height: 0;
}

/* 字体族样式 */
.editor-content :deep(.ProseMirror [style*="font-family: Microsoft YaHei"]) {
  font-family: "Microsoft YaHei", sans-serif;
}

.editor-content :deep(.ProseMirror [style*="font-family: SimSun"]) {
  font-family: "SimSun", serif;
}

.editor-content :deep(.ProseMirror [style*="font-family: Arial"]) {
  font-family: "Arial", sans-serif;
}

.editor-content :deep(.ProseMirror [style*="font-family: Times New Roman"]) {
  font-family: "Times New Roman", serif;
}

/* 自定义扩展按钮样式 */
.custom-extension-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.custom-extension-button:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  transform: translateY(-1px);
}

.custom-extension-button:active {
  background: linear-gradient(135deg, #4e5bc6 0%, #5e377e 100%);
  transform: translateY(0);
}

/* 变量工具按钮样式 */
.variable-tool-button {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  border: none;
}

.variable-tool-button:hover {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  transform: translateY(-1px);
}

.variable-tool-button:active {
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
  transform: translateY(0);
}

/* 悬浮菜单样式 */
.floating-menu-container {
  pointer-events: auto;
}

.menu-trigger {
  background: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  position: relative;
}

.menu-trigger:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.menu-trigger.active {
  transform: rotate(180deg);
  background: #0056b3;
}

.menu-panel {
  position: absolute;
  top: 40px;
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 8px;
  min-width: 160px;
  z-index: 1001;
  border: 1px solid #e1e5e9;
  animation: menuFadeIn 0.2s ease-out;
}

@keyframes menuFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  transition: background-color 0.2s ease;
  text-align: left;
}

.menu-item:hover {
  background-color: #f8f9fa;
}

.menu-item:active {
  background-color: #e9ecef;
}

/* Part标签样式 */
.editor-content :deep(part) {
  display: inline;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  margin: 0 2px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.editor-content :deep(part:hover) {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Variable标签样式 */
.editor-content :deep(variable) {
  display: inline;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  margin: 0 2px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.editor-content :deep(variable:hover) {
  background: linear-gradient(135deg, #ee82f0 0%, #f44462 100%);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.editor-content :deep(.ProseMirror ul) {
  margin: 0;
  padding: 0;
}

.editor-content :deep(.ProseMirror ol) {
  margin: 0;
  padding: 0;
}

.editor-content :deep(.ProseMirror ol::before) {
  content: attr(data-number-content);
  padding-right: 0.5em;
}

.editor-content :deep(.ProseMirror ol li) {
  list-style: none;
  display: inline;
}

.editor-content :deep(.ProseMirror ol li p,h3) {
  display: inline;
}


/* 禁用状态的工具栏按钮 */
.toolbar-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.toolbar-button:disabled:hover {
  background-color: transparent;
  transform: none;
}
</style>
