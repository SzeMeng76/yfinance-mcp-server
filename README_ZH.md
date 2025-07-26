# 📊 YFinance MCP 服务器

**中文版** | **[English](./README.md)**

> 访问 Yahoo Finance 股票数据的非官方 MCP 服务器

## 🎯 项目概述

一个轻量级的模型上下文协议（MCP）服务器，通过 yahoo-finance2 库提供对 Yahoo Finance 数据的访问。使用 TypeScript 构建，专为与 AI 助手和 MCP 兼容客户端的无缝集成而设计。

## ✨ 核心功能

- 📈 **历史股票数据**: 获取灵活时间段和间隔的历史价格
- 📊 **图表数据**: 获取详细图表信息，包含盘前/盘后数据和事件
- 💰 **实时报价**: 检索单个或多个股票代码的当前报价
- 🔍 **股票搜索**: 搜索股票、ETF 和金融工具
- 📋 **报价摘要**: 访问全面的财务数据和公司信息
- 🌍 **多语言支持**: 可配置的语言和地区设置
- 🔧 **TypeScript**: 使用 Zod 模式验证的完整类型安全

## 📦 安装

```bash
npm install @szemeng76/yfinance-mcp-server
```

## 🔧 配置

### Cursor IDE
```json
{
  "mcpServers": {
    "yfinance": {
      "command": "npx",
      "args": ["@szemeng76/yfinance-mcp-server"]
    }
  }
}
```

### Claude Desktop
```json
{
  "mcpServers": {
    "yfinance": {
      "command": "npx", 
      "args": ["@szemeng76/yfinance-mcp-server"]
    }
  }
}
```

### VS Code 与 GitHub Copilot
```json
{
  "mcp.servers": {
    "yfinance": {
      "command": "npx",
      "args": ["@szemeng76/yfinance-mcp-server"],
      "transport": "stdio"
    }
  }
}
```

## 🛠️ 可用工具

### `yahoo_stock_history`
获取具有全面选项的历史股票数据。

**参数：**
- `symbol`（必需）: 股票代码（如 "AAPL"、"TSLA"）
- `period`（可选）: 时间周期字符串（"1d"、"1w"、"1m"、"3m"、"6m"、"1y"）
- `period1`（可选）: 自定义开始日期（字符串、Date 或时间戳）
- `period2`（可选）: 自定义结束日期（字符串、Date 或时间戳）
- `interval`（可选）: 数据间隔 - "1d"、"1wk"、"1mo"（默认: "1d"）
- `events`（可选）: 要包含的事件类型（如 "div|split"）
- `includeAdjustedClose`（可选）: 包含调整后收盘价（布尔值）
- `lang`（可选）: 语言代码
- `region`（可选）: 地区代码

**示例：**
```
"获取苹果过去 3 个月的历史数据，使用周线间隔"
```

### `yahoo_chart`
检索具有高级选项的详细图表数据。

**参数：**
- `symbol`（必需）: 股票代码
- `period1`（可选）: 开始日期/时间（字符串、Date 或数字）
- `period2`（可选）: 结束日期/时间（默认: 当前日期）
- `interval`（可选）: 时间间隔 - "1m"、"2m"、"5m"、"15m"、"30m"、"60m"、"90m"、"1h"、"1d"、"5d"、"1wk"、"1mo"、"3mo"（默认: "1d"）
- `useYfid`（可选）: 使用 Yahoo Finance ID（布尔值）
- `includePrePost`（可选）: 包含盘前/盘后数据（布尔值）
- `events`（可选）: 事件类型（字符串）
- `lang`（可选）: 语言代码
- `return`（可选）: 返回格式 - "array" 或 "object"

**示例：**
```
"显示特斯拉的日内图表，使用 5 分钟间隔，包含盘前数据"
```

### `yahoo_quote`
获取一个或多个股票代码的当前报价信息。

**参数：**
- `symbols`（必需）: 单个代码（字符串）或多个代码（数组）
- `fields`（可选）: 要返回的特定字段（字符串数组）
- `return`（可选）: 返回格式 - "array"、"map" 或 "object"

**示例：**
```
"获取苹果、微软和谷歌的当前报价"
```

### `yahoo_search`
使用高级过滤搜索金融工具。

**参数：**
- `query`（必需）: 搜索词
- `lang`（可选）: 语言代码
- `region`（可选）: 地区代码
- `quotesCount`（可选）: 返回的最大报价数（数字）
- `newsCount`（可选）: 返回的最大新闻项数（数字）
- `enableFuzzyQuery`（可选）: 启用模糊搜索（布尔值）
- `quotesQueryId`（可选）: 报价查询 ID（字符串）
- `multiQuoteQueryId`（可选）: 多报价查询 ID（字符串）
- `newsQueryId`（可选）: 新闻查询 ID（字符串）
- `enableCb`（可选）: 启用回调（布尔值）
- `enableNavLinks`（可选）: 启用导航链接（布尔值）
- `enableEnhancedTrivialQuery`（可选）: 增强简单查询（布尔值）

**示例：**
```
"搜索可再生能源公司，返回 10 个结果和新闻"
```

### `yahoo_quote_summary`
检索全面的财务数据和公司信息。

**参数：**
- `symbol`（必需）: 股票代码
- `modules`（可选）: 要获取的数据模块（数组，默认: ["price", "summaryDetail"]）
- `lang`（可选）: 语言代码
- `region`（可选）: 地区代码

**可用模块包括：**
- `price` - 当前价格数据
- `summaryDetail` - 关键统计数据
- `assetProfile` - 公司概况
- `balanceSheetHistory` - 资产负债表数据
- `cashflowStatementHistory` - 现金流量表
- `defaultKeyStatistics` - 关键财务指标
- `earnings` - 收益数据
- `financialData` - 财务比率
- `incomeStatementHistory` - 利润表
- 还有更多...

**示例：**
```
"获取特斯拉的完整财务摘要，包括收益和资产负债表"
```

## 🎮 使用示例

### 投资分析
```
"比较 AAPL、MSFT 和 GOOGL 过去 6 个月的表现，使用周线数据"
```

### 市场研究
```
"搜索人工智能公司并显示它们当前的市盈率"
```

### 技术分析
```
"获取 TSLA 过去一周的小时图表，包含成交量和分红事件"
```

### 投资组合跟踪
```
"显示我投资组合的当前报价：AAPL、TSLA、NVDA、AMD"
```

## 🏗️ 开发

### 本地设置

```bash
# 克隆仓库
git clone https://github.com/SzeMeng76/yfinance-mcp-server.git
cd yfinance-mcp-server

# 安装依赖
npm install

# 构建项目
npm run build

# 启动服务器
npm start
```

### 项目结构

```
yfinance-mcp-server/
├── src/
│   └── index.ts          # 主 MCP 服务器实现
├── package.json          # 依赖和脚本
├── tsconfig.json         # TypeScript 配置
└── README.md            # 文档
```

### 核心依赖

- **@modelcontextprotocol/sdk**: 官方 MCP 服务器框架
- **yahoo-finance2**: Yahoo Finance API 客户端库
- **zod**: 运行时类型验证和模式定义

## 🔧 技术细节

### 错误处理
服务器包含全面的错误处理：
- 常见问题的友好错误消息
- 退市股票的特殊处理
- 缺失数据的优雅降级

### 日期处理
智能日期转换，使用 `getStartDate` 辅助函数：
- 支持周期快捷方式（"1d"、"1w"、"1m" 等）
- 处理多种日期格式（字符串、Date 对象、时间戳）
- 自动降级到合理的默认值

### 类型安全
使用 Zod 模式的完整 TypeScript 实现确保：
- 运行时参数验证
- 清晰的 API 契约
- 更好的开发体验

## ⚠️ 重要提示

### 速率限制
- Yahoo Finance 有隐性速率限制
- 避免过于频繁的快速请求
- 考虑实现客户端缓存

### 数据准确性
- Yahoo Finance 提供的数据可能有延迟
- 通过官方来源验证关键信息
- 此工具仅供参考

### 符号和市场
- 支持全球股票市场
- 使用正确的符号格式（如美国 "AAPL"，香港 "0700.HK"）
- 某些退市股票可能不返回历史数据

## 🤝 贡献

1. Fork 仓库
2. 创建功能分支：`git checkout -b feature-name`
3. 使用适当的 TypeScript 类型进行更改
4. 使用不同符号和参数彻底测试
5. 提交带有清晰描述的 pull request

## 📄 许可证

ISC 许可证 - 详见 [LICENSE](LICENSE) 文件。

## ⚖️ 免责声明

- **非官方工具**: 与 Yahoo Finance 或 Verizon Media 无关联
- **数据来源**: 所有数据由 Yahoo Finance 公共 API 提供
- **投资风险**: 仅供参考，非投资建议
- **准确性**: 请务必通过官方来源验证重要的财务数据

---

*为 AI 和金融社区用 ❤️ 构建*
