exports.mediaRule = {
  test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
  type: 'asset',
  /** 默认条件，
     * 自动地在 resource 和 inline 之间进行选择：小于 8kb 的文件，将会视为 inline 模块类型，否则会被视为 resource 模块类型。
     * 设置 Rule.parser.dataUrlCondition.maxSize 选项来修改此条件为1M
    */
  parser: {
    dataUrlCondition: {
      maxSize: 1000 * 1024 // 1M
    }
  }
};

