import type { CartContextType } from "@/interface/typeDefine";
import { createContext, type Context } from "react";

/**
 * 购物车操作函数
 */
export const CartContext: Context<CartContextType> =
  createContext<CartContextType>({} as CartContextType);
