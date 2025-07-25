import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    tags: ['wireless', 'bluetooth', 'noise-cancelling', 'audio']
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor, GPS, and water resistance.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.3,
    reviews: 89,
    inStock: true,
    tags: ['fitness', 'smartwatch', 'health', 'tracking']
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable cotton t-shirt made from 100% organic materials.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'Clothing',
    rating: 4.7,
    reviews: 256,
    inStock: true,
    tags: ['organic', 'cotton', 'sustainable', 'comfortable']
  },
  {
    id: '4',
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    category: 'Home & Garden',
    rating: 4.6,
    reviews: 342,
    inStock: true,
    tags: ['insulated', 'stainless-steel', 'eco-friendly', 'durable']
  },
  {
    id: '5',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.2,
    reviews: 67,
    inStock: true,
    tags: ['wireless', 'charging', 'qi-enabled', 'fast-charging']
  },
  {
    id: '6',
    name: 'Leather Crossbody Bag',
    description: 'Handcrafted genuine leather crossbody bag with adjustable strap.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    category: 'Fashion',
    rating: 4.4,
    reviews: 134,
    inStock: true,
    tags: ['leather', 'handcrafted', 'crossbody', 'adjustable']
  },
  {
    id: '7',
    name: 'Smart LED Light Bulb',
    description: 'WiFi-enabled smart bulb with 16 million colors and voice control.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    category: 'Home & Garden',
    rating: 4.1,
    reviews: 98,
    inStock: true,
    tags: ['smart', 'led', 'wifi', 'voice-control']
  },
  {
    id: '8',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat made from eco-friendly materials with carrying strap.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    category: 'Sports',
    rating: 4.8,
    reviews: 189,
    inStock: true,
    tags: ['yoga', 'non-slip', 'eco-friendly', 'fitness']
  },
  {
    id: '9',
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with 360-degree sound and 20-hour battery.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.6,
    reviews: 203,
    inStock: true,
    tags: ['portable', 'bluetooth', 'waterproof', 'speaker']
  },
  {
    id: '10',
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 handcrafted ceramic coffee mugs with modern design.',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=400&fit=crop',
    category: 'Home & Garden',
    rating: 4.5,
    reviews: 156,
    inStock: true,
    tags: ['ceramic', 'coffee', 'handcrafted', 'set']
  },
  {
    id: '11',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with superior cushioning and breathable mesh.',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    category: 'Sports',
    rating: 4.7,
    reviews: 278,
    inStock: true,
    tags: ['running', 'lightweight', 'cushioning', 'breathable']
  },
  {
    id: '12',
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with active noise cancellation and touch controls.',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.4,
    reviews: 167,
    inStock: true,
    tags: ['wireless', 'earbuds', 'noise-cancelling', 'touch-controls']
  }
];

export const categories = [
  'All',
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Fashion',
  'Sports'
];

export const getProductsByCategory = (category: string) => {
  if (category === 'All') return products;
  return products.filter(product => product.category === category);
};

export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}; 