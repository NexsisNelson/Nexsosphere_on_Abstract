import React, { useState, useEffect } from 'react';
import { TrendingUp, BookOpen, History, AlertTriangle, Search } from 'lucide-react';
import { useCryptoData, useCryptoSearch, useCryptoPair } from '../hooks/useCryptoData';
import { PriceChart } from '../components/PriceChart';
import { formatCurrency } from '@coingecko/cryptoformat';

export function Trading() {
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPair, setSelectedPair] = useState('bitcoin');
  const [chartData, setChartData] = useState<any[]>([]);

  const { cryptos, isLoading } = useCryptoData();
  const { results: searchResults } = useCryptoSearch(searchQuery);
  const { price, change24h, volume24h } = useCryptoPair(selectedPair);

  // Simulate real-time price updates for the chart
  useEffect(() => {
    if (!price) return;

    const now = new Date().getTime() / 1000;
    setChartData(prev => {
      const newData = [...prev, { time: now, value: price }];
      if (newData.length > 100) newData.shift();
      return newData;
    });

    const interval = setInterval(() => {
      const time = new Date().getTime() / 1000;
      const randomChange = (Math.random() - 0.5) * 0.001; // Small random price variation
      const newPrice = price * (1 + randomChange);
      
      setChartData(prev => {
        const newData = [...prev, { time, value: newPrice }];
        if (newData.length > 100) newData.shift();
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [price]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Trading Pairs */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Markets</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search pairs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="space-y-2 max-h-[calc(100vh-20rem)] overflow-y-auto">
              {isLoading ? (
                <div className="text-center py-4 text-gray-500">Loading...</div>
              ) : (
                (searchQuery ? searchResults : cryptos)?.map((crypto: any) => (
                  <div
                    key={crypto.id}
                    onClick={() => setSelectedPair(crypto.id)}
                    className={`flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer ${
                      selectedPair === crypto.id ? 'bg-gray-50 dark:bg-gray-700' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <img src={crypto.image} alt={crypto.name} className="w-6 h-6 mr-3" />
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {crypto.symbol.toUpperCase()}/USD
                        </span>
                        <p className="text-xs text-gray-500">{crypto.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-900 dark:text-white">
                        {formatCurrency(crypto.current_price, 'USD', 'en')}
                      </div>
                      <div className={crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {crypto.price_change_percentage_24h > 0 ? '+' : ''}
                        {crypto.price_change_percentage_24h?.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chart and Order Book */}
          <div className="lg:col-span-2 space-y-8">
            {/* Price Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  {selectedPair.toUpperCase()}/USD
                </h2>
                <div className="flex space-x-2">
                  {['1H', '4H', '1D', '1W'].map((timeframe) => (
                    <button
                      key={timeframe}
                      className="px-3 py-1 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {timeframe}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-96 w-full">
                <PriceChart data={chartData} />
              </div>
            </div>

            {/* Order Book */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-4">
                <BookOpen className="w-5 h-5 mr-2" />
                Order Book
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Bids</div>
                  <div className="space-y-1">
                    {[...Array(5)].map((_, i) => {
                      const randomVariation = (1 - i * 0.001);
                      return (
                        <div key={i} className="flex justify-between text-green-500">
                          <span>{formatCurrency(price * randomVariation, 'USD', 'en')}</span>
                          <span>{(Math.random() * 2).toFixed(4)} {selectedPair.toUpperCase()}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Asks</div>
                  <div className="space-y-1">
                    {[...Array(5)].map((_, i) => {
                      const randomVariation = (1 + i * 0.001);
                      return (
                        <div key={i} className="flex justify-between text-red-500">
                          <span>{formatCurrency(price * randomVariation, 'USD', 'en')}</span>
                          <span>{(Math.random() * 2).toFixed(4)} {selectedPair.toUpperCase()}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Form and History */}
          <div className="lg:col-span-1 space-y-8">
            {/* Order Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={() => setTradeType('buy')}
                  className={`flex-1 py-2 rounded-lg font-medium ${
                    tradeType === 'buy'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setTradeType('sell')}
                  className={`flex-1 py-2 rounded-lg font-medium ${
                    tradeType === 'sell'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Sell
                </button>
              </div>

              <div className="flex space-x-2 mb-4">
                <button
                  onClick={() => setOrderType('market')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                    orderType === 'market'
                      ? 'bg-gray-200 dark:bg-gray-600'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  Market
                </button>
                <button
                  onClick={() => setOrderType('limit')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                    orderType === 'limit'
                      ? 'bg-gray-200 dark:bg-gray-600'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  Limit
                </button>
              </div>

              <div className="space-y-4">
                {orderType === 'limit' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Price (USD)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="0.00"
                      defaultValue={price?.toFixed(2)}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount ({selectedPair.toUpperCase()})
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0.00"
                  />
                </div>
                <button
                  className={`w-full py-3 rounded-lg font-medium text-white ${
                    tradeType === 'buy' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedPair.toUpperCase()}
                </button>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-4">
                <History className="w-5 h-5 mr-2" />
                Recent Trades
              </h2>
              <div className="space-y-3">
                {[...Array(5)].map((_, index) => {
                  const isBuy = Math.random() > 0.5;
                  const amount = (Math.random() * 2).toFixed(4);
                  const priceVariation = price * (1 + (Math.random() - 0.5) * 0.002);
                  return (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <span className={isBuy ? 'text-green-500' : 'text-red-500'}>
                          {isBuy ? 'Bought' : 'Sold'} {amount} {selectedPair.toUpperCase()}
                        </span>
                        <div className="text-sm text-gray-500">
                          {Math.floor(Math.random() * 5) + 1}m ago
                        </div>
                      </div>
                      <div className="text-right">
                        <div>{formatCurrency(priceVariation, 'USD', 'en')}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Risk Warning */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
              <div className="flex items-center text-yellow-800 dark:text-yellow-200">
                <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                <p className="text-sm">
                  Cryptocurrency trading involves substantial risk. Please trade responsibly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}