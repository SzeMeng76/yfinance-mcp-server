# yfinance-mcp-server
[中文版](./README-cn.md)

**Important Note: This is an unofficial MCP server.**
A Message Control Protocol (MCP) server for accessing Yahoo Finance data. This server provides a simple interface to retrieve stock market data through yahoo-finance2.
## Features
- Get historical stock data with customizable periods and intervals
- Search for stocks, ETFs, and other financial instruments
- Retrieve detailed quote information for specific symbols
- Access comprehensive financial data summaries
- Obtain chart data with various time frames and granularity
- Easy to use with any MCP client
- Built with TypeScript for type safety and better developer experience
## Usage
Example Cursor MCP Client.
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
Retrieves historical stock data for a given symbol.
Parameters:
- `symbol` (required): The stock symbol (e.g., "AAPL" for Apple Inc.)
- `period` (required): Time period to fetch data for (e.g., "1d", "5d", "1mo", "3mo", "6mo", "1y", "2y", "5y", "10y", "ytd", "max")
- `interval` (optional): Data interval ("1d", "1wk", "1mo")

Example MCP request:
```markdown
> (Request) 
Please use the `yahoo_stock_history` tool to fetch the daily stock data for AAPL for the past week (`period`='1w', `interval`='1d'). Then, render the results as a markdown table.
> (Response Example)
I'll help you fetch Apple's stock data and format it nicely as a markdown table.
First, I'll call the yahoo_stock_history tool to fetch the data:
Let me format this data into a more readable markdown table:
| Date | Open | High | Low | Close | Volume |
|------|------|------|-----|-------|---------|
| Mar 31, 2025 | $217.01 | $225.62 | $216.23 | $222.13 | 65.30M |
| Apr 1, 2025 | $219.81 | $223.68 | $218.90 | $223.19 | 36.41M |
| Apr 2, 2025 | $221.32 | $225.19 | $221.02 | $223.89 | 35.91M |
| Apr 3, 2025 | $205.54 | $207.49 | $201.25 | $203.19 | 103.42M |
| Apr 4, 2025 | $193.89 | $199.88 | $187.34 | $188.38 | 125.57M |
```

### yahoo_chart
Retrieves chart data with more flexible options than yahoo_stock_history.
Parameters:
- `symbol` (required): The stock symbol (e.g., "AAPL" for Apple Inc.)
- `period1` (optional): Starting period - can be a Date object, string, or unix timestamp
- `period2` (optional): Ending period (defaults to current date)
- `interval` (optional): Data interval ("1m", "2m", "5m", "15m", "30m", "60m", "90m", "1h", "1d", "5d", "1wk", "1mo", "3mo")
- `includePrePost` (optional): Include pre and post market data (boolean)
- `events` (optional): Event types to return, "|"-separated (e.g., "div|split|earn")
- `return` (optional): Return format - "array" or "object"

Example MCP request:
```markdown
> (Request)
Please use the `yahoo_chart` tool to fetch Apple's stock data for the past month with daily intervals. I'd like to see dividend events too.
> (Response Example)
I'll fetch Apple's stock chart data for the past month including dividend events:

The chart data shows daily price movements for Apple stock over the past month. I can see the data includes:
- Daily OHLC (open, high, low, close) prices 
- Trading volumes
- A dividend payment of $0.24 per share on April 7, 2025

Would you like me to visualize this data or analyze any specific aspects of it?
```

### yahoo_quote
Retrieves current quote information for one or multiple symbols.
Parameters:
- `symbols` (required): Single stock symbol or array of symbols (e.g., "AAPL" or ["AAPL", "MSFT"])
- `fields` (optional): Array of specific fields to return
- `return` (optional): Return format - "array", "map", or "object"

Example MCP request:
```markdown
> (Request)
Can you get the current quote information for both Apple and Microsoft using the `yahoo_quote` tool?
> (Response Example)
I'll retrieve the current quote information for both Apple and Microsoft:

Based on the data from Yahoo Finance, here's the current market information:

Apple (AAPL):
- Current Price: $188.38
- Market Cap: $2.94T
- P/E Ratio: 31.1
- 52-Week Range: $156.72 - $227.11

Microsoft (MSFT):
- Current Price: $410.34
- Market Cap: $3.05T
- P/E Ratio: 35.6
- 52-Week Range: $309.45 - $428.74

Both stocks are currently trading in the regular market session.
```

### yahoo_search
Searches for financial instruments matching a query.
Parameters:
- `query` (required): Search term (e.g., "apple", "tech", "S&P")
- `quotesCount` (optional): Maximum number of quotes to return
- `newsCount` (optional): Maximum number of news items to return
- Many additional optional parameters for fine-tuning results

Example MCP request:
```markdown
> (Request)
Can you search for companies related to artificial intelligence using the `yahoo_search` tool?
> (Response Example)
I'll search for companies related to artificial intelligence:

Here are some top companies related to artificial intelligence based on the search results:

1. NVIDIA Corporation (NVDA)
2. Microsoft Corporation (MSFT)
3. Alphabet Inc. (GOOGL)
4. Amazon.com, Inc. (AMZN)
5. C3.ai, Inc. (AI)
6. Palantir Technologies Inc. (PLTR)

The search also returned some related industry ETFs and recent news articles about AI developments in the market.

Would you like more detailed information about any of these companies or additional search results?
```

### yahoo_quote_summary
Retrieves comprehensive financial data for a symbol.
Parameters:
- `symbol` (required): The stock symbol (e.g., "AAPL")
- `modules` (optional): Array of data modules to retrieve (defaults to ["price", "summaryDetail"])
- Many available modules including: assetProfile, balanceSheetHistory, cashflowStatementHistory, defaultKeyStatistics, earnings, financialData, incomeStatementHistory, etc.

Example MCP request:
```markdown
> (Request)
Can you get a financial summary for Tesla using the `yahoo_quote_summary` tool? I'm interested in the price and key statistics.
> (Response Example)
I'll retrieve financial summary data for Tesla focusing on price and key statistics:

Tesla (TSLA) Financial Summary:

Current Price Information:
- Regular Market Price: $172.63
- Day Range: $168.42 - $174.91
- 52-Week Range: $138.80 - $299.29
- Market Cap: $550.2B

Key Statistics:
- P/E Ratio: 50.14
- EPS (TTM): $3.44
- Forward P/E: 42.08
- PEG Ratio: 1.79
- Price to Book: 9.12
- Revenue Growth (YoY): 8.2%

The stock is currently trading on the NasdaqGS exchange in regular market hours.
```

## Development
To set up the development environment:
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
## License
ISC License (ISC)
