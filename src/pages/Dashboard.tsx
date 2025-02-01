import React from 'react';
import { BarChart3, TrendingUp, Wallet } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <Wallet className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Portfolio Value</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$25,432.89</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">24h Change</p>
                <p className="text-2xl font-bold text-green-500">+5.23%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Assets</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Activity items would go here */}
            <div className="border-b dark:border-gray-700 pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">Bought ETH</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">0.5 ETH @ $2,450.00</p>
                </div>
                <span className="text-green-500">+$1,225.00</span>
              </div>
            </div>
            {/* More activity items... */}
          </div>
        </div>
      </div>
    </div>
  );
}