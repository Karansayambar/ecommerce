import { createContext, useContext, useState, type ReactNode } from "react";

type Product = {
  id: number;
  title: string;
  img: string;
  description: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: Product[];
  count: number;
  openCart: boolean;
  total: number;
  toggleCart: () => void;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  resetCart: () => void;
};

const ProductContext = createContext<CartContextType | undefined>(undefined);

export default function ProductProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);
  const [openCart, setOpenCart] = useState(false);

  function toggleCart() {
    setOpenCart(!openCart);
  }

  let count =
    cart.length > 0
      ? cart.reduce((acc, item) => acc + (item.quantity || 1), 0)
      : 0;

  function addToCart(product: Product) {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  function removeFromCart(productId: number) {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === productId);
      if (!existing) return prevCart;

      if (existing.quantity > 1) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter((item) => item.id !== productId);
      }
    });
  }

  function resetCart() {
    setCart([]);
  }

  const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <ProductContext.Provider
      value={{
        count,
        openCart,
        toggleCart,
        setOpenCart,
        addToCart,
        cart,
        removeFromCart,
        resetCart,
        total,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProduct must be used inside ProductProvider");
  }
  return context;
};
