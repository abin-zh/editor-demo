import { Node, mergeAttributes } from '@tiptap/core'

export interface PartOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    part: {
      setPart: (attributes?: { 'data-id'?: string; 'data-title'?: string; 'data-content'?: string }) => ReturnType
      unsetPart: () => ReturnType
    }
  }
}

export const PartNode = Node.create<PartOptions>({
  name: 'part',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  content: 'paragraph+',

  group: 'block',

  defining: true,

  addAttributes() {
    return {
      'data-id': {
        default: null,
        parseHTML: element => element.getAttribute('data-id'),
        renderHTML: attributes => {
          if (!attributes['data-id']) {
            return {}
          }
          return {
            'data-id': attributes['data-id'],
          }
        },
      },
      'data-title': {
        default: null,
        parseHTML: element => element.getAttribute('data-title'),
        renderHTML: attributes => {
          if (!attributes['data-title']) {
            return {}
          }
          return {
            'data-title': attributes['data-title'],
          }
        },
      },
      'data-content': {
        default: null,
        parseHTML: element => element.getAttribute('data-content'),
        renderHTML: attributes => {
          if (!attributes['data-content']) {
            return {}
          }
          return {
            'data-content': attributes['data-content'],
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'part',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['part', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setPart: (attributes = {}) => ({ commands }) => {
        return commands.wrapIn(this.name, attributes)
      },
      unsetPart: () => ({ commands }) => {
        return commands.lift(this.name)
      },
    }
  },
})

export default PartNode 