'use client';

import Link from 'next/link';
import { PanelLeft, PanelLeftClose } from 'lucide-react';

interface TopBarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  showCart?: boolean;
  cartCount?: number;
  onCartClick?: () => void;
  onSearchClick?: () => void;
}

const TopBar = ({ isSidebarOpen, onToggleSidebar, showCart, cartCount = 0, onCartClick, onSearchClick }: TopBarProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-[60] flex items-center px-8">
      {/* Logo */}
      <Link href="https://thewellnesslondon.com" className="flex items-center gap-4">
        <h1
          className="text-2xl font-normal text-gray-800 cursor-pointer hover:opacity-80 transition-opacity"
          style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}
        >
          The Wellness
        </h1>
      </Link>

      {/* Sidebar Toggle Button - Desktop (left side) */}
      <button
        onClick={onToggleSidebar}
        className="hidden lg:block p-2 rounded-md hover:bg-gray-100 transition-all duration-200 cursor-pointer ml-4"
        aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
      >
        {isSidebarOpen ? (
          <PanelLeftClose className="w-4 h-4 text-gray-800" />
        ) : (
          <PanelLeft className="w-4 h-4 text-gray-800" />
        )}
      </button>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-4">
        {/* Sidebar Toggle Button - Mobile (right side) */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-all duration-200 cursor-pointer"
          aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-4 h-4 text-gray-800" />
          ) : (
            <PanelLeft className="w-4 h-4 text-gray-800" />
          )}
        </button>
        {/* Search Button */}
        {onSearchClick && (
          <button
            onClick={onSearchClick}
            className="p-2 rounded-md hover:bg-gray-100 transition-all duration-200 cursor-pointer"
            aria-label="Search services"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-800"
            >
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
        )}

        {/* Cart Button */}
        {showCart && onCartClick && (
          <button
            onClick={onCartClick}
            className="p-2 rounded-md hover:bg-gray-100 transition-all duration-200 cursor-pointer relative"
            aria-label="View cart"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-800"
            >
              <path d="M9 2L6 9H18L15 2M6 9H18L17 22H7L6 9Z"/>
            </svg>
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                style={{ fontSize: '10px' }}
              >
                {cartCount}
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default TopBar;
