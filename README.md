# 📈 YFinance MCP Server

**[中文版](./README_ZH.md)** | **English**

> A comprehensive MCP server for accessing Yahoo Finance stock market data

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-Compatible-green?style=flat-square)](https://modelcontextprotocol.io/)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

## 🎯 Overview

A powerful Model Context Protocol (MCP) server that provides seamless access to Yahoo Finance data through the yahoo-finance2 library. This server enables AI assistants to retrieve real-time stock prices, historical data, charts, financial summaries, and perform market searches with comprehensive error handling and flexible parameters.

## ✨ Key Features

- 📊 **Historical Stock Data**: Comprehensive historical price data with flexible time periods and intervals
- 📈 **Chart Data**: Detailed chart information with intraday data and pre/post market support
- 💰 **Real-time Quotes**: Current stock quotes for single or multiple symbols
- 🔍 **Market Search**: Advanced search functionality for stocks, ETFs, and financial instruments
- 📋 **Quote Summary**: Complete financial summaries with customizable data modules
- 🌍 **Multi-language Support**: Configurable language and region settings
- 🔧 **TypeScript**: Full type safety with comprehensive Zod validation
- ⚡ **High Performance**: Efficient data retrieval with proper error handling

## 📦 Installation

```bash
npm install @szemeng76/yfinance-mcp-server
```

Or use directly with npx:

```bash
npx @szemeng76/yfinance-mcp-server
```

## 🔧 Configuration

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

### Local Development

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

## 🛠️ Available Tools

### `yahoo_stock_history`
Retrieve comprehensive historical stock data with flexible time periods.

**Parameters:**
- `symbol` (required): Stock symbol (e.g., "AAPL", "TSLA", "MSFT")
- `period` (optional): Time period shorthand ("1d", "1w", "1m", "3m", "6m", "1y")
- `period1` (optional): Custom start date (string, Date object, or timestamp)
- `period2` (optional): Custom end date (string, Date object, or timestamp)
- `interval` (optional): Data interval - "1d", "1wk", "1mo" (default: "1d")
- `events` (optional): Event types to include (e.g., "div|split")
- `includeAdjustedClose` (optional): Include adjusted close prices (boolean)
- `lang` (optional): Language code for localization
- `region` (optional): Region code for market-specific data

**Example Usage:**
```
"Get Apple's historical stock data for the past 6 months"
"Fetch Tesla's weekly stock prices for the last year"
"Show me Microsoft's daily data from January to March 2024"
```

**Smart Date Handling:**
- Uses `getStartDate()` helper function for period shortcuts
- Supports multiple date formats for flexibility
- Defaults to 1 month if no period specified

### `yahoo_chart`
Access detailed chart data with advanced options and intraday support.

**Parameters:**
- `symbol` (required): Stock symbol
- `period1` (optional): Start date/time (string, Date, or number)
- `period2` (optional): End date/time (default: current date)
- `interval` (optional): Time interval - "1m", "2m", "5m", "15m", "30m", "60m", "90m", "1h", "1d", "5d", "1wk", "1mo", "3mo" (default: "1d")
- `useYfid` (optional): Use Yahoo Finance ID (boolean)
- `includePrePost` (optional): Include pre/post market data (boolean)
- `events` (optional): Event types to include (string)
- `lang` (optional): Language code
- `return` (optional): Return format - "array" or "object"

**Example Usage:**
```
"Get Tesla's 5-minute chart data for today with pre-market data"
"Show Apple's hourly chart for the past week"
"Fetch Google's daily chart with dividend events included"
```

**Advanced Features:**
- Intraday data with minute-level granularity
- Pre and post-market trading data
- Event integration (dividends, splits, earnings)
- Flexible return formats

### `yahoo_quote`
Get real-time quote information for single or multiple stocks.

**Parameters:**
- `symbols` (required): Single symbol (string) or multiple symbols (array)
- `fields` (optional): Specific fields to return (array of strings)
- `return` (optional): Return format - "array", "map", or "object"

**Example Usage:**
```
"Get current quotes for Apple, Microsoft, and Google"
"Show me Tesla's current stock price"
"Fetch quotes for AAPL, TSLA, NVDA, AMD with specific fields"
```

**Supported Data:**
- Current price and market cap
- Volume and trading metrics
- 52-week high/low ranges
- P/E ratios and financial indicators
- Market status and trading hours

### `yahoo_search`
Search for stocks, ETFs, and financial instruments with advanced filtering.

**Parameters:**
- `query` (required): Search term or company name
- `lang` (optional): Language code
- `region` (optional): Region code
- `quotesCount` (optional): Maximum quotes to return (number)
- `newsCount` (optional): Maximum news items to return (number)
- `enableFuzzyQuery` (optional): Enable fuzzy search matching (boolean)
- `quotesQueryId` (optional): Quotes query identifier (string)
- `multiQuoteQueryId` (optional): Multi-quote query identifier (string)
- `newsQueryId` (optional): News query identifier (string)
- `enableCb` (optional): Enable callback functionality (boolean)
- `enableNavLinks` (optional): Enable navigation links (boolean)
- `enableEnhancedTrivialQuery` (optional): Enhanced trivial query processing (boolean)

**Example Usage:**
```
"Search for artificial intelligence companies"
"Find Tesla-related stocks and ETFs"
"Search for renewable energy investments"
```

**Search Features:**
- Company name and symbol matching
- Fuzzy search for approximate matches
- News integration with search results
- Regional market filtering

### `yahoo_quote_summary`
Retrieve comprehensive financial data and company information.

**Parameters:**
- `symbol` (required): Stock symbol
- `modules` (optional): Data modules to fetch (array, default: ["price", "summaryDetail"])
- `lang` (optional): Language code
- `region` (optional): Region code

**Available Modules:**
- `price` - Current pricing data
- `summaryDetail` - Key statistics and metrics
- `assetProfile` - Company profile and business description
- `balanceSheetHistory` - Historical balance sheet data
- `cashflowStatementHistory` - Cash flow statements
- `defaultKeyStatistics` - Key financial ratios and metrics
- `earnings` - Earnings data and forecasts
- `financialData` - Current financial ratios
- `incomeStatementHistory` - Historical income statements
- `recommendationTrend` - Analyst recommendations
- `upgradeDowngradeHistory` - Rating changes
- And many more...

**Example Usage:**
```
"Get Tesla's complete financial summary including earnings and balance sheet"
"Show Apple's key statistics and financial ratios"
"Fetch Microsoft's earnings data and analyst recommendations"
```

## 🎮 Usage Examples

### Investment Analysis
```
"Compare the 1-year performance of AAPL, MSFT, and GOOGL with weekly data"
"Get Tesla's financial summary and recent earnings data"
```

### Market Research
```
"Search for electric vehicle companies and show their market caps"
"Find semiconductor stocks with their current P/E ratios"
```

### Technical Analysis
```
"Get Apple's 15-minute chart for today with volume data"
"Show Tesla's daily chart for the past month with dividend events"
```

### Portfolio Management
```
"Get current quotes for my portfolio: AAPL, TSLA, NVDA, AMD, MSFT"
"Fetch historical data for my tech stocks over the past quarter"
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
├── dist/                 # Compiled JavaScript files
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # Documentation
```

### Core Dependencies

- **@modelcontextprotocol/sdk**: Official MCP server framework
- **yahoo-finance2**: Yahoo Finance API client library
- **zod**: Runtime type validation and schema definition

## 🔧 Technical Details

### Date Processing
The server includes a smart `getStartDate()` helper function that converts period shortcuts:
- `1d` → 1 day ago
- `1w` → 7 days ago
- `1m` → 1 month ago
- `3m` → 3 months ago
- `6m` → 6 months ago
- `1y` → 1 year ago
- Default: 1 month ago

### Error Handling
- Comprehensive error catching with descriptive messages
- Special handling for delisted stocks
- User-friendly error responses
- Graceful degradation for network issues

### Data Validation
- Full Zod schema validation for all parameters
- Type-safe parameter processing
- Optional parameter handling with defaults
- Flexible input format support

### Performance Optimization
- Efficient parameter processing
- Minimal overhead data retrieval
- Smart caching through yahoo-finance2 library
- Optimized JSON serialization

## ⚠️ Important Notes

### Rate Limiting
- Yahoo Finance has implicit rate limits
- Avoid making excessive rapid requests
- Consider implementing client-side caching for frequently accessed data

### Data Accuracy
- Data provided by Yahoo Finance may have slight delays
- Real-time quotes may not be truly real-time for all markets
- Always verify critical financial decisions with official sources

### Symbol Formats
- Use standard ticker symbols (e.g., "AAPL" for Apple)
- International stocks may require exchange suffixes (e.g., "0700.HK" for Tencent)
- Some delisted stocks may not return historical data

### Market Hours
- Data availability depends on market trading hours
- Pre/post market data availability varies by symbol
- Weekend and holiday data may be limited

## 🚀 Common Use Cases

### Investment Research
- **Stock Analysis**: Compare multiple stocks across different timeframes
- **Trend Analysis**: Identify market trends using historical data
- **Financial Health**: Assess company fundamentals using quote summaries

### Portfolio Management
- **Performance Tracking**: Monitor portfolio performance over time
- **Diversification**: Research new investment opportunities
- **Risk Assessment**: Analyze volatility and market metrics

### Trading and Analytics
- **Technical Analysis**: Use chart data for technical trading strategies
- **Market Timing**: Analyze intraday patterns with minute-level data
- **Event Impact**: Study the impact of corporate events on stock prices

### Educational and Research
- **Market Education**: Learn about different financial instruments
- **Academic Research**: Gather data for financial studies
- **Backtesting**: Test investment strategies with historical data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes with proper TypeScript types
4. Test with various symbols and parameters
5. Ensure error handling works correctly
6. Submit a pull request with clear description

### Development Guidelines

- Follow TypeScript best practices
- Add comprehensive error handling for new features
- Test with both popular and international symbols
- Document any new parameters or return formats
- Respect Yahoo Finance's terms of service

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## ⚖️ Legal and Disclaimer

- **Unofficial Tool**: Not affiliated with Yahoo Finance or Verizon Media
- **Data Source**: All data provided by Yahoo Finance public APIs
- **Investment Risk**: For informational purposes only, not investment advice
- **Accuracy**: Always verify important financial data with official sources
- **Terms of Service**: Users must comply with Yahoo Finance's terms of service

## 🙏 Acknowledgments

- **Yahoo Finance**: For providing comprehensive financial data APIs
- **yahoo-finance2**: Excellent JavaScript/TypeScript wrapper library
- **MCP Community**: For the standardized protocol enabling AI integration
- **Contributors**: Everyone who helps improve this project

---

*Built for intelligent financial analysis and market research* 📊🤖
