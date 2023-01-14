import ORIGIN_MEAL_DATA from "@/assets/data/mealData.json";
import { MealList } from "@/components/mealList/MealList";
import type { CartStateType, MealDataType } from "@/interface/typeDefine";
import { useState } from "react";
import { CartContext } from "./store/CartContext";

/**
 * 商品默认信息展示数组
 */
const mealListState: Array<MealDataType> = ORIGIN_MEAL_DATA.list.map(
  (originItem): MealDataType => {
    return {
      ...originItem,
      count: 0
    };
  }
);

export function App(): JSX.Element {
  /**
   * 购物车信息以及更新函数
   */
  const [cartState, setCartState] = useState<CartStateType>({
    items: [],
    totalCount: 0,
    totalAmount: 0
  });

  /**
   * 添加购物车操作
   * @param mealData 商品信息
   * @param operationType 操作类型: 添加, 删除, 清空所有
   */
  const setCartHandler = (
    mealData: MealDataType,
    operationType: Readonly<"add" | "delete" | "clear">
  ): void => {
    // 浅复制数据
    const newCart = { ...cartState };
    // 取得数据在列表里的索引位置, 如果不存在为 `-1`
    const existIndex: number = newCart.items.findIndex(
      (item: MealDataType): boolean => item.id === mealData.id
    );

    switch (operationType) {
      // 增加商品数量
      case "add":
        // 如果不存在相同元素的情况
        if (existIndex === -1) {
          newCart.items.push(mealData);
          mealData.count = 1;
        }
        // 如果存在元素, 那么直接更改原数组的计数值
        else {
          mealData.count++;
        }
        // 更新商品总数量
        newCart.totalCount++;
        // 更新总价格
        newCart.totalAmount += mealData.price;
        break;
      // 减少商品数量
      case "delete":
        // 判断是否存在购物车中(一般情况下不需要判断)
        if (existIndex !== -1) {
          mealData.count--;
          if (mealData.count <= 0) {
            // 如果数量为 0, 从购物车中移除选项
            newCart.items.splice(existIndex, 1);
          }
          // 更新购物出统计数据
          newCart.totalAmount -= mealData.price;
          newCart.totalCount--;
        }
        break;
      // 清空购物车
      case "clear":
        newCart.items = [];
        newCart.totalAmount = 0;
        newCart.totalCount = 0;
        // 将原始数组每项的商品计数信息归 0
        for (const item of mealListState) {
          item.count = 0;
        }
        break;
      default:
        // ...... 假设需要进行其它的操作的话 ..........
        break;
    }

    setCartState(() => newCart);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto"
      }}
    >
      <CartContext.Provider
        value={{
          setCartHandler
        }}
      >
        <MealList dataList={mealListState} />
      </CartContext.Provider>
    </div>
  );
}
