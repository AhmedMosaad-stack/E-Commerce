"use client";
import { CartProduct } from "@/lib/interfaces/cart";
import { getUserCart } from "@/lib/services/getUserCart";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type CartContextType = {
  cartNumber: number;
  setcartNumber: Dispatch<SetStateAction<number>>;
  cartID: string | null;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartNumber, setcartNumber] = useState<number>(0);
  const [cartID, setcartID] = useState(null)
  async function getCart(): Promise<void> {
    const res = await getUserCart();

    let sum = 0;
    res.data.products.forEach((product: CartProduct) => {
      sum += product.count;
    });
    setcartNumber(sum);
  }
  useEffect(() => {
    getCart();
  }, []);
  return (
    <CartContext.Provider value={{ cartNumber, setcartNumber, cartID }}>
      {children}
    </CartContext.Provider>
  );
}
