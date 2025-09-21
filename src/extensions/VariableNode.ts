import { Node, mergeAttributes } from '@tiptap/core'

export interface VariableOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    variable: {
      setVariable: (attributes?: { 
        'data-id'?: string
        'data-title'?: string
        'data-value'?: string
        'data-comment'?: string 
      }) => ReturnType
      unsetVariable: () => ReturnType
    }
  }
}

export const VariableNode = Node.create<VariableOptions>({
  name: 'variable',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  content: 'text*',

  group: 'inline',

  inline: true,

  selectable: true,

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
      'data-value': {
        default: null,
        parseHTML: element => element.getAttribute('data-value'),
        renderHTML: attributes => {
          if (!attributes['data-value']) {
            return {}
          }
          return {
            'data-value': attributes['data-value'],
          }
        },
      },
      'data-comment': {
        default: null,
        parseHTML: element => element.getAttribute('data-comment'),
        renderHTML: attributes => {
          if (!attributes['data-comment']) {
            return {}
          }
          return {
            'data-comment': attributes['data-comment'],
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'variable',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['variable', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setVariable: (attributes = {}) => ({ commands }) => {
        return commands.wrapIn(this.name, attributes)
      },
      unsetVariable: () => ({ commands }) => {
        return commands.lift(this.name)
      },
    }
  },
})

export default VariableNode 