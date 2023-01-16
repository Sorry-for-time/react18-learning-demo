import ORIGIN_MEAL_DATA from "@/assets/data/mealData.json";
import { CartBar } from "@/components/cartBar/CartBar";
import { MealList } from "@/components/mealList/MealList";
import type { CartStateType, MealDataType } from "@/interface/typeDefine";
import { useState } from "react";
import AppStyle from "./App.module.scss";
import { FilterMealList } from "./components/filterMeal/FilterMealList";
import { CartContext } from "./store/CartContext";

/**
 * 商品默认信息展示数组
 */
const allMealList: Array<MealDataType> = ORIGIN_MEAL_DATA.list.map(
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

  const [mealListState, setMealListState] =
    useState<Array<MealDataType>>(allMealList);

  /**
   * 清空购物车
   * @param confirm 确认字符串, 只允许为 `clear`
   */
  function setCartHandler(confirm: "clear"): void;
  /**
   * 根据操作类型对购物车的数据进行添加或者修改
   * @param mealData 匹配的数据
   * @param operationType 操作类型, `add`: 添加, `delete`: 删除
   */
  function setCartHandler(
    mealData: MealDataType,
    operationType: "add" | "delete"
  ): void;
  function setCartHandler(): void {
    // 清空购物车数据以及还原原数组商品的计数统计
    if (arguments.length === 1) {
      for (const item of allMealList) {
        item.count = 0;
      }
      setCartState(() => {
        return {
          items: [],
          totalAmount: 0,
          totalCount: 0
        };
      });
    }
    // 根据情况进行判断
    else if (arguments.length === 2) {
      // 浅复制数据
      const newCart = { ...cartState };
      // 取得数据在列表里的索引位置, 如果不存在为 `-1`
      const existIndex: number = newCart.items.findIndex(
        (item: MealDataType): boolean => item.id === arguments[0].id
      );
      switch (arguments[1]) {
        // 增加商品数量
        case "add":
          // 如果不存在相同元素的情况
          if (existIndex === -1) {
            newCart.items.push(arguments[0]);
            arguments[0].count = 1;
          }
          // 如果存在元素, 那么直接更改原数组的计数值
          else {
            arguments[0].count++;
          }
          // 更新商品总数量
          newCart.totalCount++;
          // 更新总价格
          newCart.totalAmount += arguments[0].price;
          break;
        // 减少商品数量
        case "delete":
          // 判断是否存在购物车中(一般情况下不需要判断)
          if (existIndex !== -1) {
            arguments[0].count--;
            if (arguments[0].count <= 0) {
              // 如果数量为 0, 从购物车中移除选项
              newCart.items.splice(existIndex, 1);
            }
            // 更新购物出统计数据
            newCart.totalAmount -= arguments[0].price;
            newCart.totalCount--;
          }
          break;

        default:
          // ...... 假设需要进行其它的操作的话 ..........
          break;
      }
      setCartState(() => newCart);
    }
  }

  return (
    <CartContext.Provider
      value={{
        setCartHandler,
        cartState
      }}
    >
      <div className={AppStyle["app-wrapper"]}>
        <FilterMealList
          filterHandler={setMealListState}
          originalList={allMealList}
        />

        <MealList dataList={mealListState} />

        <CartBar cartState={cartState} />
      </div>
    </CartContext.Provider>
  );
}
