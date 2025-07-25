'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import Cart from '@/components/Cart';
import { products, categories, getProductsByCategory, searchProducts } from '@/data/products';
import { useStore } from '@/store/useStore';

export default function Home() {
  const { searchQuery, selectedCategory, setSearchQuery, setSelectedCategory } = useStore();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      let filtered = products;
      
      if (selectedCategory && selectedCategory !== 'All') {
        filtered = getProductsByCategory(selectedCategory);
      }
      
      if (searchQuery) {
        filtered = searchProducts(searchQuery);
      }
      
      setFilteredProducts(filtered);
    }
  }, [searchQuery, selectedCategory, mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Cart />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} />
      </main>

      {/* Cart Sidebar */}
      <Cart />
    </div>
  );
} 