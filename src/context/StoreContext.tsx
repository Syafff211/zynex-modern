import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, StoreSettings, Order } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS, INITIAL_ORDERS } from '../data/initialData';
import { STORAGE_KEYS, generateInvoiceNumber } from '../utils/helpers';

interface StoreContextType {
  products: Product[];
  settings: StoreSettings;
  orders: Order[];
  currentView: 'store' | 'admin';
  isAdminAuthenticated: boolean;
  activeOrderProduct: Product | null;
  selectedVariant: any | null;
  navigateTo: (view: 'store' | 'admin') => void;
  openOrderModal: (product: Product, variant?: any) => void;
  closeOrderModal: () => void;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStock: (id: string) => void;
  updateSettings: (settings: Partial<StoreSettings>) => void;
  createOrder: (orderData: {
    customerName: string;
    customerWhatsapp: string;
    productId: string;
    productName: string;
    variantName?: string;
    specs?: string;
    price: number;
    paymentMethod: 'qris' | 'dana' | 'gopay' | 'shopeepay' | 'bca';
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: 'pending' | 'completed' | 'cancelled') => void;
  deleteOrder: (orderId: string) => void;
  resetToDefaultData: () => void;
  exportDataJson: () => string;
  importDataJson: (json: string) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch (e) {
      console.error('Failed to load products from storage', e);
      return INITIAL_PRODUCTS;
    }
  });

  // Settings state
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch (e) {
      console.error('Failed to load settings from storage', e);
      return INITIAL_SETTINGS;
    }
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch (e) {
      console.error('Failed to load orders from storage', e);
      return INITIAL_ORDERS;
    }
  });

  // Detect initial view based on URL path or hash
  const getInitialView = (): 'store' | 'admin' => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path === '/admin' || path.startsWith('/admin') || hash === '#admin' || hash === '#/admin') {
      return 'admin';
    }
    return 'store';
  };

  const [currentView, setCurrentView] = useState<'store' | 'admin'>(getInitialView);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });

  // Active modal product
  const [activeOrderProduct, setActiveOrderProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Save products failed', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Save settings failed', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Save orders failed', e);
    }
  }, [orders]);

  // Handle URL change detection (supports /admin, #admin, browser back/forward)
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || path.startsWith('/admin') || hash === '#admin' || hash === '#/admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('store');
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    // Secret shortcut: Ctrl + Shift + A to jump to /admin
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        navigateTo('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navigateTo = (view: 'store' | 'admin') => {
    setCurrentView(view);
    if (view === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openOrderModal = (product: Product, variant?: any) => {
    setActiveOrderProduct(product);
    setSelectedVariant(variant || null);
  };

  const closeOrderModal = () => {
    setActiveOrderProduct(null);
    setSelectedVariant(null);
  };

  const loginAdmin = (pin: string): boolean => {
    const cleanPin = pin.trim().toLowerCase();
    if (cleanPin === '123456' || cleanPin === 'zynex123' || cleanPin === 'admin') {
      setIsAdminAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    navigateTo('store');
  };

  const addProduct = (newProd: Omit<Product, 'id'>): Product => {
    const id = 'prod-' + Date.now();
    const productWithId: Product = { ...newProd, id };
    setProducts((prev) => [productWithId, ...prev]);
    return productWithId;
  };

  const updateProduct = (id: string, updatedData: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleProductStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStock =
            p.stock === 'ready'
              ? 'limited'
              : p.stock === 'limited'
              ? 'out_of_stock'
              : 'ready';
          return { ...p, stock: nextStock };
        }
        return p;
      })
    );
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const createOrder = (orderData: {
    customerName: string;
    customerWhatsapp: string;
    productId: string;
    productName: string;
    variantName?: string;
    specs?: string;
    price: number;
    paymentMethod: 'qris' | 'dana' | 'gopay' | 'shopeepay' | 'bca';
    notes?: string;
  }): Order => {
    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').substring(0, 19);
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      invoiceNumber: generateInvoiceNumber(),
      createdAt: dateStr,
      status: 'pending',
      ...orderData
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: 'pending' | 'completed' | 'cancelled') => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const resetToDefaultData = () => {
    setProducts(INITIAL_PRODUCTS);
    setSettings(INITIAL_SETTINGS);
    setOrders(INITIAL_ORDERS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
  };

  const exportDataJson = (): string => {
    return JSON.stringify({ products, settings, orders }, null, 2);
  };

  const importDataJson = (json: string): boolean => {
    try {
      const data = JSON.parse(json);
      if (data.products && Array.isArray(data.products)) {
        setProducts(data.products);
      }
      if (data.settings && typeof data.settings === 'object') {
        setSettings(data.settings);
      }
      if (data.orders && Array.isArray(data.orders)) {
        setOrders(data.orders);
      }
      return true;
    } catch (e) {
      console.error('Failed to import JSON', e);
      return false;
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        settings,
        orders,
        currentView,
        isAdminAuthenticated,
        activeOrderProduct,
        selectedVariant,
        navigateTo,
        openOrderModal,
        closeOrderModal,
        loginAdmin,
        logoutAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
        updateSettings,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        resetToDefaultData,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
