import React from 'react';
import { DeFiStats } from '../types';
import { LineChart, Users, Wallet } from 'lucide-react';

interface StatsProps {
  stats: DeFiStats;
}

export function Stats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center space-x-3">
          <Wallet className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Value Locked</p>
            <p className="text-2xl font-semibold text-gray-800 dark:text-white">
              ${stats.totalValueLocked.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center space-x-3">
          <LineChart className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">24h Volume</p>
            <p className="text-2xl font-semibold text-gray-800 dark:text-white">
              ${stats.dailyVolume.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center space-x-3">
          <Users className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
            <p className="text-2xl font-semibold text-gray-800 dark:text-white">
              {stats.activeUsers.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}