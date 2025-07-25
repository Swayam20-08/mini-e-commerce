import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, User, Order, CheckoutForm } from '@/types';

interface StoreState {
  // Cart state
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // User state
  user: User | null;
  login: (user: User) => void;
  logout: () => void;

  // Orders state
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderHistory: () => Order[];

  // UI state
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;

  // Search and filter state
  searchQuery: string;
  selectedCategory: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cart: [],
      addToCart: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.cart.find(item => item.product.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          }
          return {
            cart: [...state.cart, { product, quantity }]
          };
        });
      },
      removeFromCart: (productId: string) => {
        set((state) => ({
          cart: state.cart.filter(item => item.product.id !== productId)
        }));
      },
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          cart: state.cart.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          )
        }));
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },
      getCartCount: () => {
        const { cart } = get();
        return cart.reduce((count, item) => count + item.quantity, 0);
      },

      // User state
      user: null,
      login: (user: User) => set({ user }),
      logout: () => set({ user: null }),

      // Orders state
      orders: [],
      addOrder: (order: Order) => {
        set((state) => ({
          orders: [order, ...state.orders],
          cart: [] // Clear cart after order
        }));
      },
      getOrderHistory: () => {
        const { orders, user } = get();
        if (!user) return [];
        return orders.filter(order => order.userId === user.id);
      },

      // UI state
      isCartOpen: false,
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      closeCart: () => set({ isCartOpen: false }),

      // Search and filter state
      searchQuery: '',
      selectedCategory: '',
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      setSelectedCategory: (category: string) => set({ selectedCategory: category }),
    }),
    {
      name: 'ecommerce-store',
      partialize: (state) => ({
        cart: state.cart,
        user: state.user,
        orders: state.orders,
      }),
    }
  )
); 