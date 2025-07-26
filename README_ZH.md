# 📈 YFinance MCP 服务器

**中文版** | **[English](./README.md)**

> 访问 Yahoo Finance 股票市场数据的综合 MCP 服务器

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-Compatible-green?style=flat-square)](https://modelcontextprotocol.io/)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

## 🎯 项目概述

一个强大的模型上下文协议（MCP）服务器，通过 yahoo-finance2 库提供对 Yahoo Finance 数据的无缝访问。该服务器使 AI 助手能够检索实时股价、历史数据、图表、财务摘要，并执行市场搜索，具有全面的错误处理和灵活的参数配置。

## ✨ 核心功能

- 📊 **历史股票数据**: 具有灵活时间段和间隔的全面历史价格数据
- 📈 **图表数据**: 详细的图表信息，支持日内数据和盘前/盘后交易
- 💰 **实时报价**: 单个或多个股票代码的当前股票报价
- 🔍 **市场搜索**: 股票、ETF 和金融工具的高级搜索功能
- 📋 **报价摘要**: 具有可自定义数据模块的完整财务摘要
- 🌍 **多语言支持**: 可配置的语言和地区设置
- 🔧 **TypeScript**: 具有全面 Zod 验证的完整类型安全
- ⚡ **高性能**: 高效的数据检索和适当的错误处理

## 📦 安装

```bash
npm install @szemeng76/yfinance-mcp-server
```

或直接使用 npx：

```bash
npx @szemeng76/yfinance-mcp-server
```

## 🔧 配置

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

### 本地开发

```json
{
  "mcpServers": {
    "yfinance": {
      "command": "node",
      "args": ["path/to/yfinance-mcp-server/dist/index.js"]
    }
  }
}
```

## 🛠️ 可用工具

### `yahoo_stock_history`
检索具有灵活时间段的全面历史股票数据。

**参数：**
- `symbol`（必需）: 股票代码（如 "AAPL"、"TSLA"、"MSFT"）
- `period`（可选）: 时间段简写（"1d"、"1w"、"1m"、"3m"、"6m"、"1y"）
- `period1`（可选）: 自定义开始日期（字符串、Date 对象或时间戳）
- `period2`（可选）: 自定义结束日期（字符串、Date 对象或时间戳）
- `interval`（可选）: 数据间隔 - "1d"、"1wk"、"1mo"（默认: "1d"）
- `events`（可选）: 要包含的事件类型（如 "div|split"）
- `includeAdjustedClose`（可选）: 包含调整后收盘价（布尔值）
- `lang`（可选）: 本地化语言代码
- `region`（可选）: 市场特定数据的地区代码

**使用示例：**
```
"获取苹果过去 6 个月的历史股票数据"
"获取特斯拉去年的周线股价"
"显示微软从 2024 年 1 月到 3 月的日线数据"
```

**智能日期处理：**
- 使用 `getStartDate()` 辅助函数处理时间段快捷方式
- 支持多种日期格式以提供灵活性
- 如果未指定时间段，默认为 1 个月

### `yahoo_chart`
访问具有高级选项和日内支持的详细图表数据。

**参数：**
- `symbol`（必需）: 股票代码
- `period1`（可选）: 开始日期/时间（字符串、Date 或数字）
- `period2`（可选）: 结束日期/时间（默认: 当前日期）
- `interval`（可选）: 时间间隔 - "1m"、"2m"、"5m"、"15m"、"30m"、"60m"、"90m"、"1h"、"1d"、"5d"、"1wk"、"1mo"、"3mo"（默认: "1d"）
- `useYfid`（可选）: 使用 Yahoo Finance ID（布尔值）
- `includePrePost`（可选）: 包含盘前/盘后数据（布尔值）
- `events`（可选）: 要包含的事件类型（字符串）
- `lang`（可选）: 语言代码
- `return`（可选）: 返回格式 - "array" 或 "object"

**使用示例：**
```
"获取特斯拉今天的 5 分钟图表数据，包含盘前数据"
"显示苹果过去一周的小时图表"
"获取谷歌的日线图表，包含分红事件"
```

**高级功能：**
- 分钟级粒度的日内数据
- 盘前和盘后交易数据
- 事件集成（分红、拆股、收益）
- 灵活的返回格式

### `yahoo_quote`
获取单个或多个股票的实时报价信息。

**参数：**
- `symbols`（必需）: 单个代码（字符串）或多个代码（数组）
- `fields`（可选）: 要返回的特定字段（字符串数组）
- `return`（可选）: 返回格式 - "array"、"map" 或 "object"

**使用示例：**
```
"获取苹果、微软和谷歌的当前报价"
"显示特斯拉的当前股价"
"获取 AAPL、TSLA、NVDA、AMD 的报价和特定字段"
```

**支持的数据：**
- 当前价格和市值
- 成交量和交易指标
- 52 周高低价范围
- 市盈率和财务指标
- 市场状态和交易时间

### `yahoo_search`
使用高级过滤搜索股票、ETF 和金融工具。

**参数：**
- `query`（必需）: 搜索词或公司名称
- `lang`（可选）: 语言代码
- `region`（可选）: 地区代码
- `quotesCount`（可选）: 返回的最大报价数（数字）
- `newsCount`（可选）: 返回的最大新闻项数（数字）
- `enableFuzzyQuery`（可选）: 启用模糊搜索匹配（布尔值）
- `quotesQueryId`（可选）: 报价查询标识符（字符串）
- `multiQuoteQueryId`（可选）: 多报价查询标识符（字符串）
- `newsQueryId`（可选）: 新闻查询标识符（字符串）
- `enableCb`（可选）: 启用回调功能（布尔值）
- `enableNavLinks`（可选）: 启用导航链接（布尔值）
- `enableEnhancedTrivialQuery`（可选）: 增强简单查询处理（布尔值）

**使用示例：**
```
"搜索人工智能公司"
"查找特斯拉相关的股票和 ETF"
"搜索可再生能源投资"
```

**搜索功能：**
- 公司名称和代码匹配
- 近似匹配的模糊搜索
- 搜索结果的新闻集成
- 区域市场过滤

### `yahoo_quote_summary`
检索全面的财务数据和公司信息。

**参数：**
- `symbol`（必需）: 股票代码
- `modules`（可选）: 要获取的数据模块（数组，默认: ["price", "summaryDetail"]）
- `lang`（可选）: 语言代码
- `region`（可选）: 地区代码

**可用模块：**
- `price` - 当前定价数据
- `summaryDetail` - 关键统计数据和指标
- `assetProfile` - 公司概况和业务描述
- `balanceSheetHistory` - 历史资产负债表数据
- `cashflowStatementHistory` - 现金流量表
- `defaultKeyStatistics` - 关键财务比率和指标
- `earnings` - 收益数据和预测
- `financialData` - 当前财务比率
- `incomeStatementHistory` - 历史利润表
- `recommendationTrend` - 分析师建议
- `upgradeDowngradeHistory` - 评级变化
- 还有更多...

**使用示例：**
```
"获取特斯拉的完整财务摘要，包括收益和资产负债表"
"显示苹果的关键统计数据和财务比率"
"获取微软的收益数据和分析师建议"
```

## 🎮 使用示例

### 投资分析
```
"比较 AAPL、MSFT 和 GOOGL 的 1 年表现，使用周线数据"
"获取特斯拉的财务摘要和最近的收益数据"
```

### 市场研究
```
"搜索电动汽车公司并显示其市值"
"查找半导体股票及其当前市盈率"
```

### 技术分析
```
"获取苹果今天的 15 分钟图表，包含成交量数据"
"显示特斯拉过去一个月的日线图表，包含分红事件"
```

### 投资组合管理
```
"获取我投资组合的当前报价：AAPL、TSLA、NVDA、AMD、MSFT"
"获取我的科技股过去一季度的历史数据"
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
├── dist/                 # 编译后的 JavaScript 文件
├── package.json          # 依赖和脚本
├── tsconfig.json         # TypeScript 配置
└── README.md            # 文档
```

### 核心依赖

- **@modelcontextprotocol/sdk**: 官方 MCP 服务器框架
- **yahoo-finance2**: Yahoo Finance API 客户端库
- **zod**: 运行时类型验证和模式定义

## 🔧 技术细节

### 日期处理
服务器包含智能的 `getStartDate()` 辅助函数，用于转换时间段快捷方式：
- `1d` → 1 天前
- `1w` → 7 天前
- `1m` → 1 个月前
- `3m` → 3 个月前
- `6m` → 6 个月前
- `1y` → 1 年前
- 默认: 1 个月前

### 错误处理
- 具有描述性消息的全面错误捕获
- 退市股票的特殊处理
- 用户友好的错误响应
- 网络问题的优雅降级

### 数据验证
- 所有参数的完整 Zod 模式验证
- 类型安全的参数处理
- 带默认值的可选参数处理
- 灵活的输入格式支持

### 性能优化
- 高效的参数处理
- 最小开销的数据检索
- 通过 yahoo-finance2 库的智能缓存
- 优化的 JSON 序列化

## ⚠️ 重要提示

### 速率限制
- Yahoo Finance 有隐性速率限制
- 避免过度频繁的快速请求
- 考虑为频繁访问的数据实现客户端缓存

### 数据准确性
- Yahoo Finance 提供的数据可能有轻微延迟
- 实时报价可能不是所有市场的真正实时
- 重要的财务决策请务必通过官方来源验证

### 股票代码格式
- 使用标准股票代码（如苹果公司使用 "AAPL"）
- 国际股票可能需要交易所后缀（如腾讯使用 "0700.HK"）
- 某些退市股票可能不返回历史数据

### 市场时间
- 数据可用性取决于市场交易时间
- 盘前/盘后数据可用性因股票代码而异
- 周末和节假日数据可能有限

## 🚀 常见用例

### 投资研究
- **股票分析**: 在不同时间框架内比较多只股票
- **趋势分析**: 使用历史数据识别市场趋势
- **财务健康**: 使用报价摘要评估公司基本面

### 投资组合管理
- **业绩跟踪**: 随时间监控投资组合表现
- **多元化**: 研究新的投资机会
- **风险评估**: 分析波动性和市场指标

### 交易和分析
- **技术分析**: 使用图表数据进行技术交易策略
- **市场择时**: 使用分钟级数据分析日内模式
- **事件影响**: 研究企业事件对股价的影响

### 教育和研究
- **市场教育**: 了解不同金融工具
- **学术研究**: 为金融研究收集数据
- **回测**: 使用历史数据测试投资策略

## 🤝 贡献

1. Fork 仓库
2. 创建功能分支：`git checkout -b feature-name`
3. 使用适当的 TypeScript 类型进行更改
4. 使用各种股票代码和参数进行测试
5. 确保错误处理正常工作
6. 提交带有清晰描述的 pull request

### 开发指南

- 遵循 TypeScript 最佳实践
- 为新功能添加全面的错误处理
- 使用热门和国际股票代码进行测试
- 记录任何新参数或返回格式
- 尊重 Yahoo Finance 的服务条款

## 📄 许可证

MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## ⚖️ 法律和免责声明

- **非官方工具**: 与 Yahoo Finance 或 Verizon Media 无关联
- **数据来源**: 所有数据由 Yahoo Finance 公共 API 提供
- **投资风险**: 仅供参考，非投资建议
- **准确性**: 请务必通过官方来源验证重要的财务数据
- **服务条款**: 用户必须遵守 Yahoo Finance 的服务条款

## 🙏 致谢

- **Yahoo Finance**: 提供全面的金融数据 API
- **yahoo-finance2**: 优秀的 JavaScript/TypeScript 包装库
- **MCP 社区**: 标准化协议使 AI 集成成为可能
- **贡献者**: 所有帮助改进这个项目的人

---

*为智能金融分析和市场研究而构建* 📊🤖
