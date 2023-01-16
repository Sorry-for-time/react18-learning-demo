import type { CartStateType } from "@/interface/typeDefine";
import { useEffect, useState } from "react";
import CartBarStyle from "./CartBar.module.scss";
import { CartDetail } from "./cartDetail/CartDetail";

export function CartBar(props: { cartState: CartStateType }): JSX.Element {
  /**
   * 遮罩层可见性
   */
  const [visibleState, setVisibleState] = useState<boolean>(false);
  useEffect((): void => {
    if (props.cartState.totalCount <= 0) {
      setVisibleState(() => false);
    }
  }, [props.cartState.totalCount]);

  return (
    <>
      <div
        className={CartBarStyle["cart-bar"]}
        onClick={(ev): void => {
          ev.stopPropagation();
          if (props.cartState.totalAmount > 0) {
            setVisibleState((oldVal: boolean): boolean => !oldVal);
          }
        }}
      >
        <div className={CartBarStyle["icon-wrapper"]}>
          <img
            src="/icon_img/bag.png"
            alt="..."
            className={CartBarStyle["bag-size"]}
          />
          <span
            // 动态拼接样式字符串, 如果购物车商品数量为 0 的情况下添加灰色背景样式
            className={`${CartBarStyle["count-hint"]} ${
              props.cartState.totalCount <= 0 ? CartBarStyle["when-zero"] : ""
            }`.trim()}
          >
            {props.cartState.totalCount}
          </span>
        </div>

        {props.cartState.totalCount > 0 ? (
          <div className={CartBarStyle["cart-price"]}>
            {props.cartState.totalAmount}
          </div>
        ) : (
          <div className={CartBarStyle["un-selected"]}>当前未选择任何商品</div>
        )}

        <div className={CartBarStyle["confirm-btn-wrapper"]}>
          {props.cartState.totalCount > 0 ? (
            <button
              className={CartBarStyle["confirm-btn"]}
              onClick={(ev): void => {
                ev.stopPropagation();
              }}
            >
              去结算
            </button>
          ) : (
            <button disabled className={CartBarStyle["disable-btn"]}>
              未选择商品
            </button>
          )}
        </div>
      </div>

      {/* 弹出遮罩 */}
      {visibleState && props.cartState.totalCount > 0 ? (
        <CartDetail setVisibleState={setVisibleState} />
      ) : null}
    </>
  );
}
