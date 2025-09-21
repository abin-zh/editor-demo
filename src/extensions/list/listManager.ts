// 列表类型定义
interface BaseListType {
  /**
   * 列表项的序号
   */
  numbers: string[];
  /**
   * 格式化函数
   * @param formatExec 格式化表达式，#占位符表序号，&占位符表序号内容(多层级叠加情况)
   * @param number 列表项的序号
   * @returns 格式化后的字符串
   */
  format: (number: number) => string;
}

// 列表样式类型定义
type ListStyleType = {
  [key: string]: BaseListType;
};

interface BaseComplexListType {
  baseStyle: string;
  formatExec: string;
}

type ComplexListType = {
  [key: string]: BaseComplexListType[];
};


/**
 * 基础列表样式
 */
const baseListStyle: ListStyleType = {
  'number': {
    numbers: [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
      '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
      '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
    ],
    format: (number: number) => {
      return baseListStyle['number'].numbers[number - 1] || number.toString();
    }
  },
  'cn-number': {
    numbers: [
      '一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
      '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
      '二十一', '二十二', '二十三', '二十四', '二十五', '二十六', '二十七', '二十八', '二十九', '三十'
    ],
    format: (number: number) => {
      return baseListStyle['cn-number'].numbers[number - 1] || '一';
    }
  },
};

const listStyle = {
  DECIMAL: 'decimal',
  CHINESE_DESCRIPTIVE: 'cn-descriptive',
}

/**
 * 多层级复杂列表样式
 */
const complexListStyle: ComplexListType = {
  'decimal': [
    {
      baseStyle: 'number',
      formatExec: '#.'
    },
    {
      baseStyle: 'number',
      formatExec: '&#.'
    },
    {
      baseStyle: 'number',
      formatExec: '&#.'
    }
  ],
  'cn-descriptive': [
    {
      baseStyle: 'cn-number',
      formatExec: '第#条'
    },
    {
      baseStyle: 'number',
      formatExec: '&#.'
    },
    {
      baseStyle: 'number',
      formatExec: '(#)'
    }
  ]
}

/**
 * 复杂列表格式化函数
 * @param listStyle 复杂列表样式
 * @param indent 列表项的缩进层级
 * @param number 列表项的序号
 * @param content 列表项的当前显示序号
 * @returns 格式化后的字符串
 */
export const complexFormat = (listStyle: string, indent: number, number: number, content: string): string => {
  const complexList = complexListStyle[listStyle];
  if (!complexList) {
    return number.toString();
  }

  const commonStyle = complexList[indent - 1];

  // 获取对应序号
  const numberFormat = baseListStyle[commonStyle.baseStyle].format(number)

  let formattedNumber = numberFormat;
  // 根据格式化表达式替换序号
  if(commonStyle.formatExec.includes('#')) {
    formattedNumber = commonStyle.formatExec.replace('#', numberFormat);
  }
  if(commonStyle.formatExec.includes('&')) {
    formattedNumber = commonStyle.formatExec.replace('&', content);
  }
  return formattedNumber;
}
