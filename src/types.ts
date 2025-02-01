export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  owner: string;
}

export interface ICO {
  id: string;
  name: string;
  description: string;
  tokenSymbol: string;
  price: number;
  totalSupply: number;
  raised: number;
  target: number;
  endDate: Date;
}

export interface DeFiStats {
  totalValueLocked: number;
  dailyVolume: number;
  activeUsers: number;
}