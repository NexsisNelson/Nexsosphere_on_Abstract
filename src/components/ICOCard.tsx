import React from 'react';
import { ICO } from '../types';
import { Timer, Users, Coins } from 'lucide-react';

interface ICOCardProps {
  ico: ICO;
}

export function ICOCard({ ico }: ICOCardProps) {
  const progress = (ico.raised / ico.target) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{ico.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{ico.description}</p>
        </div>
        <span className="text-lg font-medium text-green-600 dark:text-green-400">
          {ico.tokenSymbol}
        </span>
      </div>
      
      <div className="mt-4 space-y-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Coins className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {ico.raised}/{ico.target} ETH
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Timer className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {new Date(ico.endDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {ico.totalSupply} tokens
            </span>
          </div>
        </div>

        <button className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
          Participate Now
        </button>
      </div>
    </div>
  );
}