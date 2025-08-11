'use client';

import { useState } from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';
import { cn } from '@/utils/cn';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className="card group hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        <button
          onClick={handleToggleFavorite}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full transition-all duration-200",
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-white/80 text-gray-600 hover:bg-white"
          )}
        >
          <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        <button
          onClick={handleAddToCart}
          className={cn(
            "absolute bottom-3 left-3 right-3 bg-primary-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 transform",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
        >
          <ShoppingCart size={16} className="inline mr-2" />
          Add to Cart
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={cn(
                  "mr-1",
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </div>
          <div className={cn(
            "text-sm px-2 py-1 rounded-full",
            product.inStock
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          )}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </div>
        </div>

        <div className="mt-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );

} 
