import { type MealDataType } from "@/interface/typeDefine";
import { Meal } from "./meal/Meal";
import mealListStyle from "./MealList.module.scss";

/**
 * 食物列表信息展示组件
 * @param props 商品信息数组
 * @returns {JSX.Element}
 */
export function MealList(props: {
  dataList: Array<MealDataType>;
  setCartHandler: (
    aMeal: MealDataType,
    operationType: "add" | "delete"
  ) => void;
}): JSX.Element {
  return (
    <div className={mealListStyle["meal-list"]}>
      {props.dataList.map((item: MealDataType): JSX.Element => {
        return (
          <Meal
            key={item.id}
            mealData={item}
            setCartHandler={props.setCartHandler}
          />
        );
      })}
    </div>
  );
}
