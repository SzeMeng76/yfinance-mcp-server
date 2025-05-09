# yfinance-mcp-server
[English Version](./README.md)

**重要提示：这是一个非官方的MCP服务器。**
一个用于访问Yahoo财经数据的消息控制协议(MCP)服务器。该服务器提供了一个简单的接口，通过yahoo-finance2获取股票市场数据。
## 功能特点
- 获取可定制期间和时间间隔的历史股票数据
- 搜索股票、ETF和其他金融工具
- 获取特定股票代码的详细报价信息
- 访问全面的财务数据摘要
- 获取不同时间框架和粒度的图表数据
- 易于与任何MCP客户端一起使用
- 使用TypeScript构建，提供类型安全和更好的开发者体验
## 使用方法
Cursor MCP客户端示例：
```json
{
  "mcpServers": {
    "yfinance": {
      "command": "npx",
      "args": [
        "@szemeng76/yfinance-mcp-server"
      ]
    }
  }
}
```

### yahoo_stock_history
获取指定股票代码的历史数据。
参数：
- `symbol`（必需）：股票代码（例如，苹果公司为"AAPL"）
- `period`（必需）：获取数据的时间段（例如，"1d"，"5d"，"1mo"，"3mo"，"6mo"，"1y"，"2y"，"5y"，"10y"，"ytd"，"max"）
- `interval`（可选）：数据间隔（"1d"，"1wk"，"1mo"）

MCP请求示例：
```markdown
> (请求) 
请使用`yahoo_stock_history`工具获取AAPL过去一周的每日股票数据（`period`='1w'，`interval`='1d'）。然后将结果以markdown表格形式展示。
> (响应示例)
我将帮您获取苹果公司的股票数据，并以美观的markdown表格格式呈现。
首先，我将调用yahoo_stock_history工具获取数据：
让我将这些数据格式化成更易读的markdown表格：
| 日期 | 开盘价 | 最高价 | 最低价 | 收盘价 | 成交量 |
|------|--------|--------|--------|--------|---------|
| 2025年3月31日 | $217.01 | $225.62 | $216.23 | $222.13 | 6530万 |
| 2025年4月1日 | $219.81 | $223.68 | $218.90 | $223.19 | 3641万 |
| 2025年4月2日 | $221.32 | $225.19 | $221.02 | $223.89 | 3591万 |
| 2025年4月3日 | $205.54 | $207.49 | $201.25 | $203.19 | 1.0342亿 |
| 2025年4月4日 | $193.89 | $199.88 | $187.34 | $188.38 | 1.2557亿 |
```

### yahoo_chart
获取比yahoo_stock_history更灵活选项的图表数据。
参数：
- `symbol`（必需）：股票代码（例如，苹果公司为"AAPL"）
- `period1`（可选）：起始时间 - 可以是Date对象、字符串或Unix时间戳
- `period2`（可选）：结束时间（默认为当前日期）
- `interval`（可选）：数据间隔（"1m"，"2m"，"5m"，"15m"，"30m"，"60m"，"90m"，"1h"，"1d"，"5d"，"1wk"，"1mo"，"3mo"）
- `includePrePost`（可选）：包含盘前和盘后数据（布尔值）
- `events`（可选）：返回的事件类型，以"|"分隔（例如，"div|split|earn"）
- `return`（可选）：返回格式 - "array"或"object"

MCP请求示例：
```markdown
> (请求)
请使用`yahoo_chart`工具获取苹果公司过去一个月的每日股票数据。我也想看到股息事件。
> (响应示例)
我将获取苹果公司过去一个月的股票图表数据，包括股息事件：

图表数据显示了苹果股票在过去一个月的每日价格走势。我可以看到数据包括：
- 每日OHLC（开盘、最高、最低、收盘）价格
- 交易量
- 2025年4月7日支付了每股$0.24的股息

您希望我对这些数据进行可视化或分析其中的特定方面吗？
```

### yahoo_quote
获取一个或多个股票代码的当前报价信息。
参数：
- `symbols`（必需）：单个股票代码或股票代码数组（例如，"AAPL"或["AAPL", "MSFT"]）
- `fields`（可选）：要返回的特定字段数组
- `return`（可选）：返回格式 - "array"、"map"或"object"

MCP请求示例：
```markdown
> (请求)
能否使用`yahoo_quote`工具获取苹果和微软的当前报价信息？
> (响应示例)
我将获取苹果和微软的当前报价信息：

根据Yahoo财经的数据，以下是当前市场信息：

苹果(AAPL)：
- 当前价格：$188.38
- 市值：2.94万亿美元
- 市盈率：31.1
- 52周区间：$156.72 - $227.11

微软(MSFT)：
- 当前价格：$410.34
- 市值：3.05万亿美元
- 市盈率：35.6
- 52周区间：$309.45 - $428.74

两只股票目前都在常规市场交易时段内交易。
```

### yahoo_search
搜索与查询匹配的金融工具。
参数：
- `query`（必需）：搜索词（例如，"apple"，"tech"，"S&P"）
- `quotesCount`（可选）：返回的最大报价数量
- `newsCount`（可选）：返回的最大新闻条目数量
- 许多其他可选参数用于微调结果

MCP请求示例：
```markdown
> (请求)
能否使用`yahoo_search`工具搜索与人工智能相关的公司？
> (响应示例)
我将搜索与人工智能相关的公司：

根据搜索结果，以下是一些与人工智能相关的顶级公司：

1. 英伟达公司(NVDA)
2. 微软公司(MSFT)
3. Alphabet公司(GOOGL)
4. 亚马逊公司(AMZN)
5. C3.ai公司(AI)
6. Palantir科技公司(PLTR)

搜索还返回了一些相关的行业ETF和关于AI市场发展的最新新闻文章。

您是否需要关于这些公司的更详细信息或其他搜索结果？
```

### yahoo_quote_summary
获取股票代码的全面财务数据。
参数：
- `symbol`（必需）：股票代码（例如，"AAPL"）
- `modules`（可选）：要检索的数据模块数组（默认为["price", "summaryDetail"]）
- 许多可用模块，包括：assetProfile, balanceSheetHistory, cashflowStatementHistory, defaultKeyStatistics, earnings, financialData, incomeStatementHistory等

MCP请求示例：
```markdown
> (请求)
能否使用`yahoo_quote_summary`工具获取特斯拉的财务摘要？我对价格和关键统计数据感兴趣。
> (响应示例)
我将获取特斯拉的财务摘要数据，重点关注价格和关键统计数据：

特斯拉(TSLA)财务摘要：

当前价格信息：
- 常规市场价格：$172.63
- 日内区间：$168.42 - $174.91
- 52周区间：$138.80 - $299.29
- 市值：5502亿美元

关键统计数据：
- 市盈率：50.14
- 每股收益(TTM)：$3.44
- 远期市盈率：42.08
- PEG比率：1.79
- 市净率：9.12
- 收入增长(同比)：8.2%

该股票目前在纳斯达克全球精选市场的常规交易时段内交易。
```

## 开发
设置开发环境：
1. 克隆仓库
2. 安装依赖：
```bash
npm install
```
3. 启动开发服务器：
```bash
npm run dev
```
## 贡献
欢迎贡献！请随时提交Pull Request。
## 许可证
ISC许可证(ISC)
