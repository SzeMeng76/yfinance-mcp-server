# 📊 YFinance MCP Server

**[中文版](./README_ZH.md)** | **English**

> Unofficial MCP server for accessing Yahoo Finance stock data

## 🎯 Overview

A lightweight Model Context Protocol (MCP) server that provides access to Yahoo Finance data through the yahoo-finance2 library. Built with TypeScript and designed for seamless integration with AI assistants and MCP-compatible clients.

## ✨ Features

- 📈 **Historical Stock Data**: Fetch historical prices with flexible time periods and intervals
- 📊 **Chart Data**: Get detailed chart information with pre/post market data and events
- 💰 **Real-time Quotes**: Retrieve current stock quotes for single or multiple symbols
- 🔍 **Stock Search**: Search for stocks, ETFs, and financial instruments
- 📋 **Quote Summary**: Access comprehensive financial data and company information
- 🌍 **Multi-language Support**: Configurable language and region settings
- 🔧 **TypeScript**: Full type safety with Zod schema validation

## 📦 Installation

```bash
npm install @szemeng76/yfinance-mcp-server
```

## 🔧 Configuration

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

### VS Code with GitHub Copilot
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

## 🛠️ Available Tools

### `yahoo_stock_history`
Fetches historical stock data with comprehensive options.

**Parameters:**
- `symbol` (required): Stock symbol (e.g., "AAPL", "TSLA")
- `period` (optional): Time period string ("1d", "1w", "1m", "3m", "6m", "1y")
- `period1` (optional): Custom start date (string, Date, or timestamp)
- `period2` (optional): Custom end date (string, Date, or timestamp)
- `interval` (optional): Data interval - "1d", "1wk", "1mo" (default: "1d")
- `events` (optional): Event types to include (e.g., "div|split")
- `includeAdjustedClose` (optional): Include adjusted close prices (boolean)
- `lang` (optional): Language code
- `region` (optional): Region code

**Example:**
```
"Get Apple's historical data for the past 3 months with weekly intervals"
```

### `yahoo_chart`
Retrieves detailed chart data with advanced options.

**Parameters:**
- `symbol` (required): Stock symbol
- `period1` (optional): Start date/time (string, Date, or number)
- `period2` (optional): End date/time (default: current date)
- `interval` (optional): Time interval - "1m", "2m", "5m", "15m", "30m", "60m", "90m", "1h", "1d", "5d", "1wk", "1mo", "3mo" (default: "1d")
- `useYfid` (optional): Use Yahoo Finance ID (boolean)
- `includePrePost` (optional): Include pre/post market data (boolean)
- `events` (optional): Event types (string)
- `lang` (optional): Language code
- `return` (optional): Return format - "array" or "object"

**Example:**
```
"Show Tesla's intraday chart with 5-minute intervals including pre-market data"
```

### `yahoo_quote`
Gets current quote information for one or multiple symbols.

**Parameters:**
- `symbols` (required): Single symbol (string) or multiple symbols (array)
- `fields` (optional): Specific fields to return (array of strings)
- `return` (optional): Return format - "array", "map", or "object"

**Example:**
```
"Get current quotes for Apple, Microsoft, and Google"
```

### `yahoo_search`
Searches for financial instruments with advanced filtering.

**Parameters:**
- `query` (required): Search term
- `lang` (optional): Language code
- `region` (optional): Region code
- `quotesCount` (optional): Maximum quotes to return (number)
- `newsCount` (optional): Maximum news items to return (number)
- `enableFuzzyQuery` (optional): Enable fuzzy search (boolean)
- `quotesQueryId` (optional): Quotes query ID (string)
- `multiQuoteQueryId` (optional): Multi-quote query ID (string)
- `newsQueryId` (optional): News query ID (string)
- `enableCb` (optional): Enable callback (boolean)
- `enableNavLinks` (optional): Enable navigation links (boolean)
- `enableEnhancedTrivialQuery` (optional): Enhanced trivial query (boolean)

**Example:**
```
"Search for renewable energy companies with 10 results and news"
```

### `yahoo_quote_summary`
Retrieves comprehensive financial data and company information.

**Parameters:**
- `symbol` (required): Stock symbol
- `modules` (optional): Data modules to fetch (array, default: ["price", "summaryDetail"])
- `lang` (optional): Language code
- `region` (optional): Region code

**Available modules include:**
- `price` - Current price data
- `summaryDetail` - Key statistics
- `assetProfile` - Company profile
- `balanceSheetHistory` - Balance sheet data
- `cashflowStatementHistory` - Cash flow statements
- `defaultKeyStatistics` - Key financial metrics
- `earnings` - Earnings data
- `financialData` - Financial ratios
- `incomeStatementHistory` - Income statements
- And many more...

**Example:**
```
"Get Tesla's complete financial summary including earnings and balance sheet"
```

## 🎮 Usage Examples

### Investment Analysis
```
"Compare the 6-month performance of AAPL, MSFT, and GOOGL with weekly data"
```

### Market Research
```
"Search for artificial intelligence companies and show their current P/E ratios"
```

### Technical Analysis
```
"Get TSLA's hourly chart for the past week with volume and dividend events"
```

### Portfolio Tracking
```
"Show me current quotes for my portfolio: AAPL, TSLA, NVDA, AMD"
```

## 🏗️ Development

### Local Setup

```bash
# Clone the repository
git clone https://github.com/SzeMeng76/yfinance-mcp-server.git
cd yfinance-mcp-server

# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start
```

### Project Structure

```
yfinance-mcp-server/
├── src/
│   └── index.ts          # Main MCP server implementation
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # Documentation
```

### Core Dependencies

- **@modelcontextprotocol/sdk**: Official MCP server framework
- **yahoo-finance2**: Yahoo Finance API client library
- **zod**: Runtime type validation and schema definition

## 🔧 Technical Details

### Error Handling
The server includes comprehensive error handling:
- Friendly error messages for common issues
- Special handling for delisted stocks
- Graceful fallbacks for missing data

### Date Handling
Smart date conversion with the `getStartDate` helper function:
- Supports period shortcuts ("1d", "1w", "1m", etc.)
- Handles multiple date formats (string, Date object, timestamp)
- Automatic fallback to sensible defaults

### Type Safety
Full TypeScript implementation with Zod schemas ensures:
- Runtime parameter validation
- Clear API contracts
- Better development experience

## ⚠️ Important Notes

### Rate Limiting
- Yahoo Finance has implicit rate limits
- Avoid making too many rapid requests
- Consider implementing client-side caching

### Data Accuracy
- Data provided by Yahoo Finance may have delays
- Verify critical information with official sources
- This tool is for informational purposes only

### Symbols and Markets
- Supports global stock markets
- Use proper symbol formats (e.g., "AAPL" for US, "0700.HK" for Hong Kong)
- Some delisted stocks may not return historical data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes with proper TypeScript types
4. Test thoroughly with different symbols and parameters
5. Submit a pull request with clear description

## 📄 License

ISC License - see [LICENSE](LICENSE) file for details.

## ⚖️ Disclaimer

- **Unofficial Tool**: Not affiliated with Yahoo Finance or Verizon Media
- **Data Source**: All data provided by Yahoo Finance public APIs
- **Investment Risk**: For informational purposes only, not investment advice
- **Accuracy**: Always verify important financial data with official sources

---

*Built with ❤️ for the AI and Finance communities*
