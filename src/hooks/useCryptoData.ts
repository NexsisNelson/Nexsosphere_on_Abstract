import useSWR from 'swr';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useCryptoData(limit = 100) {
  const { data, error, isLoading } = useSWR(
    `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&sparkline=true&price_change_percentage=1h,24h,7d`,
    fetcher,
    { refreshInterval: 10000 } // Refresh every 10 seconds
  );

  return {
    cryptos: data,
    isLoading,
    isError: error
  };
}

export function useCryptoSearch(query: string) {
  const { cryptos, isLoading, isError } = useCryptoData(250);

  const filteredCryptos = cryptos?.filter(crypto => 
    crypto.name.toLowerCase().includes(query.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(query.toLowerCase())
  ) || [];

  return {
    results: filteredCryptos,
    isLoading,
    isError
  };
}

export function useCryptoPair(baseId: string, quoteId = 'tether') {
  const { data, error, isLoading } = useSWR(
    `${COINGECKO_API}/simple/price?ids=${baseId},${quoteId}&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true`,
    fetcher,
    { refreshInterval: 5000 } // Refresh every 5 seconds
  );

  return {
    price: data?.[baseId]?.usd,
    change24h: data?.[baseId]?.usd_24h_change,
    volume24h: data?.[baseId]?.usd_24h_vol,
    isLoading,
    isError: error
  };
}