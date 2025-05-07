#! /usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import yahooFinance from "yahoo-finance2";

const server = new McpServer({
	name: "yfinance",
	version: "0.0.1",
});

// Add a stock price fetching tool
server.tool(
	"yahoo_stock_history",
	{
		symbol: z.string(),
		period: z.string(),
		interval: z.enum(["1d", "1wk", "1mo"]).optional(),
	},
	async ({ symbol, period, interval = "1d" }) => {
		try {
			const queryOptions = {
				period1: getStartDate(period),
				period2: new Date(),
				interval: interval as "1d" | "1wk" | "1mo",
			};

			const result = await yahooFinance.historical(symbol, queryOptions);

			return {
				content: [
					{
						type: "text",
						text: JSON.stringify(result, null, 2),
					},
				],
			};
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error occurred";
			return {
				content: [
					{
						type: "text",
						text: `Error: ${errorMessage}`,
					},
				],
			};
		}
	},
);

// 添加 chart 工具 - 获取图表数据
server.tool(
  "yahoo_chart",
  {
    symbol: z.string(),
    period1: z.union([z.string(), z.date(), z.number()]).optional(),
    period2: z.union([z.string(), z.date(), z.number()]).optional(),
    useYfid: z.boolean().optional(),
    interval: z.enum(["1m", "2m", "5m", "15m", "30m", "60m", "90m", "1h", "1d", "5d", "1wk", "1mo", "3mo"]).optional(),
    includePrePost: z.boolean().optional(),
    events: z.string().optional(),
    lang: z.string().optional(),
    return: z.enum(["array", "object"]).optional(),
  },
  async ({ symbol, period1, period2 = new Date(), useYfid, interval = "1d", includePrePost, events, lang, return: returnType }) => {
    try {
      const queryOptions = {
        period1: period1 || getStartDate("1m"),
        period2,
        interval,
      };
      
      // 添加可选参数
      if (useYfid !== undefined) {
        queryOptions.useYfid = useYfid;
      }
      
      if (includePrePost !== undefined) {
        queryOptions.includePrePost = includePrePost;
      }
      
      if (events !== undefined) {
        queryOptions.events = events;
      }
      
      if (lang !== undefined) {
        queryOptions.lang = lang;
      }
      
      if (returnType !== undefined) {
        queryOptions.return = returnType;
      }
      
      const result = await yahooFinance.chart(symbol, queryOptions);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return {
        content: [
          {
            type: "text",
            text: `Error: ${errorMessage}`,
          },
        ],
      };
    }
  }
);

// 添加 quote 工具 - 获取股票的实时报价信息
server.tool(
  "yahoo_quote",
  {
    symbols: z.union([z.string(), z.array(z.string())]),
    fields: z.array(z.string()).optional(),
    return: z.enum(["array", "map", "object"]).optional(),
  },
  async ({ symbols, fields, return: returnType }) => {
    try {
      const queryOptions = {};
      
      // 添加可选参数
      if (fields !== undefined) {
        queryOptions.fields = fields;
      }
      
      if (returnType !== undefined) {
        queryOptions.return = returnType;
      }
      
      const result = await yahooFinance.quote(symbols, queryOptions);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return {
        content: [
          {
            type: "text",
            text: `Error: ${errorMessage}`,
          },
        ],
      };
    }
  }
);

// 添加 search 工具 - 搜索股票功能
server.tool(
  "yahoo_search",
  {
    query: z.string(),
    lang: z.string().optional(),
    region: z.string().optional(),
    quotesCount: z.number().optional(),
    newsCount: z.number().optional(),
    enableFuzzyQuery: z.boolean().optional(),
    quotesQueryId: z.string().optional(),
    multiQuoteQueryId: z.string().optional(),
    newsQueryId: z.string().optional(),
    enableCb: z.boolean().optional(),
    enableNavLinks: z.boolean().optional(),
    enableEnhancedTrivialQuery: z.boolean().optional(),
  },
  async ({ 
    query, 
    lang, 
    region, 
    quotesCount, 
    newsCount, 
    enableFuzzyQuery,
    quotesQueryId,
    multiQuoteQueryId,
    newsQueryId,
    enableCb,
    enableNavLinks,
    enableEnhancedTrivialQuery
  }) => {
    try {
      const queryOptions = {};
      
      // 添加可选参数
      if (lang !== undefined) queryOptions.lang = lang;
      if (region !== undefined) queryOptions.region = region;
      if (quotesCount !== undefined) queryOptions.quotesCount = quotesCount;
      if (newsCount !== undefined) queryOptions.newsCount = newsCount;
      if (enableFuzzyQuery !== undefined) queryOptions.enableFuzzyQuery = enableFuzzyQuery;
      if (quotesQueryId !== undefined) queryOptions.quotesQueryId = quotesQueryId;
      if (multiQuoteQueryId !== undefined) queryOptions.multiQuoteQueryId = multiQuoteQueryId;
      if (newsQueryId !== undefined) queryOptions.newsQueryId = newsQueryId;
      if (enableCb !== undefined) queryOptions.enableCb = enableCb;
      if (enableNavLinks !== undefined) queryOptions.enableNavLinks = enableNavLinks;
      if (enableEnhancedTrivialQuery !== undefined) queryOptions.enableEnhancedTrivialQuery = enableEnhancedTrivialQuery;
      
      const result = await yahooFinance.search(query, queryOptions);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return {
        content: [
          {
            type: "text",
            text: `Error: ${errorMessage}`,
          },
        ],
      };
    }
  }
);

// 添加 quoteSummary 工具 - 获取股票的详细信息
server.tool(
  "yahoo_quote_summary",
  {
    symbol: z.string(),
    modules: z.array(z.string()).optional(),
    lang: z.string().optional(),
    region: z.string().optional(),
  },
  async ({ symbol, modules = ["price", "summaryDetail"], lang, region }) => {
    try {
      const queryOptions = {
        modules
      };
      
      // 添加可选参数
      if (lang !== undefined) {
        queryOptions.lang = lang;
      }
      
      if (region !== undefined) {
        queryOptions.region = region;
      }
      
      const result = await yahooFinance.quoteSummary(symbol, queryOptions);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return {
        content: [
          {
            type: "text",
            text: `Error: ${errorMessage}`,
          },
        ],
      };
    }
  }
);

// Helper function to calculate start date based on period
function getStartDate(period: string): Date {
	const now = new Date();
	switch (period.toLowerCase()) {
		case "1d":
			return new Date(now.setDate(now.getDate() - 1));
		case "1w":
			return new Date(now.setDate(now.getDate() - 7));
		case "1m":
			return new Date(now.setMonth(now.getMonth() - 1));
		case "3m":
			return new Date(now.setMonth(now.getMonth() - 3));
		case "6m":
			return new Date(now.setMonth(now.getMonth() - 6));
		case "1y":
			return new Date(now.setFullYear(now.getFullYear() - 1));
		default:
			return new Date(now.setMonth(now.getMonth() - 1)); // Default to 1 month
	}
}

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
