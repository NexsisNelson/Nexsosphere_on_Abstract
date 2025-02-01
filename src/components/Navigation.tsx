import React, { useState, useEffect } from 'react';
import { 
  Home, 
  LayoutDashboard, 
  TrendingUp, 
  Wallet, 
  Droplets, 
  Lock, 
  Vote, 
  Image, 
  Search, 
  ListPlus, 
  PlusSquare, 
  Gavel, 
  UserCircle, 
  Coins, 
  BarChart3, 
  DollarSign, 
  FileText, 
  GraduationCap, 
  MessagesSquare, 
  HelpCircle,
  ChevronDown,
  X,
  Menu as MenuIcon
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  { label: 'Home', icon: <Home className="w-5 h-5" />, href: '/' },
  { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, href: '/dashboard' },
  {
    label: 'DeFi',
    icon: <Coins className="w-5 h-5" />,
    href: '#',
    children: [
      { label: 'Trading', icon: <TrendingUp className="w-5 h-5" />, href: '/trading' },
      { label: 'Lending/Borrowing', icon: <Wallet className="w-5 h-5" />, href: '/lending' },
      { label: 'Liquidity Pools', icon: <Droplets className="w-5 h-5" />, href: '/pools' },
      { label: 'Staking', icon: <Lock className="w-5 h-5" />, href: '/staking' },
      { label: 'Governance', icon: <Vote className="w-5 h-5" />, href: '/governance' },
    ]
  },
  {
    label: 'NFT',
    icon: <Image className="w-5 h-5" />,
    href: '#',
    children: [
      { label: 'NFT Home', icon: <Home className="w-5 h-5" />, href: '/nft' },
      { label: 'Explore', icon: <Search className="w-5 h-5" />, href: '/nft/explore' },
      { label: 'Listings', icon: <ListPlus className="w-5 h-5" />, href: '/nft/listings' },
      { label: 'Create/Mint', icon: <PlusSquare className="w-5 h-5" />, href: '/nft/create' },
      { label: 'Auctions', icon: <Gavel className="w-5 h-5" />, href: '/nft/auctions' },
    ]
  },
  {
    label: 'ICO',
    icon: <DollarSign className="w-5 h-5" />,
    href: '#',
    children: [
      { label: 'ICO Listings', icon: <ListPlus className="w-5 h-5" />, href: '/ico/listings' },
      { label: 'Investment Dashboard', icon: <BarChart3 className="w-5 h-5" />, href: '/ico/dashboard' },
      { label: 'Token Sales', icon: <Coins className="w-5 h-5" />, href: '/ico/token-sales' },
      { label: 'Project Analysis', icon: <FileText className="w-5 h-5" />, href: '/ico/analysis' },
    ]
  },
  { label: 'Profile', icon: <UserCircle className="w-5 h-5" />, href: '/profile' },
  { label: 'Education', icon: <GraduationCap className="w-5 h-5" />, href: '/education' },
  { label: 'Community', icon: <MessagesSquare className="w-5 h-5" />, href: '/community' },
  { label: 'Support', icon: <HelpCircle className="w-5 h-5" />, href: '/support' },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleDropdown = (label: string) => {
    setOpenDropdowns(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const NavLink = ({ item }: { item: NavItem }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openDropdowns.includes(item.label);

    return (
      <div className="relative">
        <div
          className={`flex items-center justify-between px-4 py-3 text-gray-100 hover:text-green-400 cursor-pointer transition-colors duration-200 ${
            hasChildren ? 'pr-8' : ''
          }`}
          onClick={() => hasChildren ? toggleDropdown(item.label) : null}
        >
          <a
            href={!hasChildren ? item.href : undefined}
            className="flex items-center space-x-3 text-lg"
            onClick={(e) => {
              if (hasChildren) {
                e.preventDefault();
              } else {
                setIsMobileMenuOpen(false);
              }
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
          {hasChildren && (
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${
                isOpen ? 'transform rotate-180' : ''
              }`}
            />
          )}
        </div>

        {hasChildren && isOpen && (
          <div className="pl-8 mt-1 space-y-2 border-l border-gray-700">
            {item.children.map((child) => (
              <a
                key={child.label}
                href={child.href}
                className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-green-400 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {child.icon}
                <span>{child.label}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-1">
        {navigation.map((item) => (
          <div key={item.label} className="relative group">
            {item.children ? (
              <div className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 cursor-pointer">
                {item.icon}
                <span className="ml-2">{item.label}</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </div>
            ) : (
              <a
                href={item.href}
                className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </a>
            )}

            {item.children && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {item.children.map((child) => (
                  <a
                    key={child.label}
                    href={child.href}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {child.icon}
                    <span>{child.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MenuIcon className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`fixed inset-y-0 left-0 w-full bg-gray-900 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <span className="text-xl font-bold text-green-400">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-green-400 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="h-[calc(100vh-4rem)] overflow-y-auto py-4 space-y-2">
            {navigation.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}