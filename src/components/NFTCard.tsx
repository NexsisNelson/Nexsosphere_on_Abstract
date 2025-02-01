import React from 'react';
import { NFT } from '../types';

interface NFTCardProps {
  nft: NFT;
}

export function NFTCard({ nft }: NFTCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{nft.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{nft.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-green-600 dark:text-green-400 font-medium">{nft.price} ETH</span>
          <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}