'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cn } from '@/utils/cn';

export default function Header() {
  const { 
    getCartCount, 
    toggleCart, 
    user, 
    login, 
    logout,
    isCartOpen 
  } = useStore();

  const [cartCount, setCartCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCartCount(getCartCount());
  }, [getCartCount]);

  // Update cart count when cart changes
  useEffect(() => {
    setCartCount(getCartCount());
  }, [getCartCount]);

  const handleLogin = () => {
    // Simulate login with mock user
    login({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">
              MiniShop
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </a>
            <a href="/products" className="text-gray-700 hover:text-primary-600 transition-colors">
              Products
            </a>
            <a href="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
              About
            </a>
            <a href="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className={cn(
                "relative p-2 text-gray-700 hover:text-primary-600 transition-colors",
                isCartOpen && "text-primary-600"
              )}
            >
              <ShoppingCart size={24} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              {user ? (
                <div className="flex items-center space-x-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-700">{user.name}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <User size={20} />
                  <span className="hidden sm:inline">Login</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 