import { MealDataType } from "@/interface/typeDefine";
import { Counter } from "@/components/ui/counter/Counter";
import MealStyle from "./Meal.module.scss";

/**
 * 在图片加载失败的时候添加伪类进行替换显示
 * @param ev 图片加载失败事件
 */
function setImgLoadingErrorHint(
  ev: React.SyntheticEvent<HTMLImageElement, Event>
): void {
  ev.currentTarget.classList.add(MealStyle["when-error"]);
}

export function Meal(props: {
  mealData: MealDataType & {
    count?: number;
  };
  setCartHandler: (
    aMeal: MealDataType,
    operationType: "add" | "delete"
  ) => void;
}): JSX.Element {
  const whenCartDelete: VoidFunction = (): void => {
    props.setCartHandler(props.mealData, "delete");
  };

  const whenCartAdd: VoidFunction = (): void => {
    props.setCartHandler(props.mealData, "add");
  };

  return (
    <div className={MealStyle["meal-wrapper"]}>
      {/* 商品图片 */}
      <div>
        <img
          src={props.mealData.img}
          className={MealStyle["meal-img"]}
          alt="加载失败..."
          loading="lazy"
          decoding="async"
          onError={setImgLoadingErrorHint}
        />
      </div>

      {/* 商品描述 */}
      <div className={MealStyle["text-wrapper"]}>
        <h1 className={MealStyle["meal-title"]}>{props.mealData.title}</h1>
        <p className={MealStyle["meal-desc"]}>{props.mealData.desc}</p>

        <div className={MealStyle["price-wrapper"]}>
          {/* 总价 */}
          <div className={MealStyle["meal-price"]}>{props.mealData.price}</div>

          {/* 计数器 */}
          <Counter
            displayNum={props.mealData.count}
            onDecrease={whenCartDelete}
            onIncrease={whenCartAdd}
          />
        </div>
      </div>
    </div>
  );
}
