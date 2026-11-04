import { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'nextfurn_wishlist_items';

function normalizeWishlistItem(product) {
  const variant = product.selectedVariant || product.variants?.[0] || {};
  const id = product.id || product.slug || product.name;
  if (!id || !product.name) {
    throw new Error('Wishlist items must include a product id and name');
  }

  return {
    id: String(id),
    slug: product.slug || String(id),
    name: product.name,
    category: product.type || product.category || '',
    description: product.desc || product.description || '',
    model: variant.model || product.model || '',
    variant: variant.label || product.size || product.finish || '',
    price: Number(variant.price ?? product.price ?? 0),
    image: variant.image || product.image || '',
  };
}

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Unable to load saved wishlist items.', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Unable to save wishlist items.', error);
    }
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    const item = normalizeWishlistItem(product);
    setWishlistItems((items) => (
      items.some((saved) => saved.id === item.id)
        ? items.filter((saved) => saved.id !== item.id)
        : [...items, item]
    ));
  };

  const removeWishlistItem = (id) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id));
  };

  const isWishlisted = (id) => wishlistItems.some((item) => item.id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, wishlistCount: wishlistItems.length, toggleWishlist, removeWishlistItem, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
