import MealStyle from "@/components/mealList/meal/Meal.module.scss";
import { Backdrop } from "@/components/ui/backdrop/Backdrop";
import { Counter } from "@/components/ui/counter/Counter";
import { MealDataType } from "@/interface/typeDefine";
import { CartContext } from "@/store/CartContext";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import CartDetailStyle from "./CartDetail.module.scss";

/**
 * 在图片加载失败的时候添加伪类进行替换显示
 * @param ev 图片加载失败事件
 */
function setImgLoadingErrorHint(
  ev: React.SyntheticEvent<HTMLImageElement, Event>
): void {
  ev.currentTarget.classList.add(MealStyle["when-error"]);
}

export function CartDetail(props: {
  setVisibleState: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const cartCtx = useContext(CartContext);

  return (
    <Backdrop
      onClick={(): void => {
        props.setVisibleState((): boolean => false);
      }}
    >
      <div
        className={CartDetailStyle["cart-detail-wrapper"]}
        onClick={(ev): void => {
          // 阻止事件冒泡
          ev.stopPropagation();
        }}
      >
        {/* 头部信息 */}
        <header className={CartDetailStyle["header-wrapper"]}>
          <p className={CartDetailStyle["text-desc"]}>套餐详情</p>
          <div
            className={CartDetailStyle["clear-cart"]}
            onClick={(): void => {
              cartCtx.setCartHandler("clear");
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
            <span className={CartDetailStyle["clear-desc"]}>清空购物车</span>
          </div>
        </header>

        {/* 列表 */}
        <div className={CartDetailStyle["meals-wrapper"]}>
          {cartCtx.cartState.items.map((item: MealDataType): JSX.Element => {
            return (
              <div className={MealStyle["meal-wrapper"]} key={item.id}>
                {/* 商品图片 */}
                <div>
                  <img
                    src={item.img}
                    className={MealStyle["meal-img"]}
                    alt="加载失败..."
                    loading="lazy"
                    decoding="async"
                    onError={setImgLoadingErrorHint}
                  />
                </div>

                {/* 商品描述 */}
                <div className={MealStyle["text-wrapper"]}>
                  <h1 className={MealStyle["meal-title"]}>{item.title}</h1>

                  <div className={MealStyle["price-wrapper"]}>
                    {/* 总价 */}
                    <div className={MealStyle["meal-price"]}>{item.price}</div>

                    {/* 计数器 */}
                    <Counter
                      displayNum={item.count}
                      onDecrease={(): void => {
                        cartCtx.setCartHandler(item, "delete");
                      }}
                      onIncrease={(): void => {
                        cartCtx.setCartHandler(item, "add");
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Backdrop>
  );
}
