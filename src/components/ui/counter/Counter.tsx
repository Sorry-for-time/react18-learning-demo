import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CounterStyle from "./Counter.module.scss";

/**
 * 空函数标识
 */
const emptyFn: VoidFunction = (): void => {};

/**
 * 计数器组件
 * @param props 计数器参数
 * @returns {JSX.Element}
 */
export function Counter(
  props: Partial<{
    displayNum: number;
    onDecrease: VoidFunction;
    onIncrease: VoidFunction;
  }>
): JSX.Element {
  const decreaseFn: VoidFunction = (): void => {
    if (typeof props.onDecrease === "function") {
      props.onDecrease();
    }
  };

  const increaseFn: VoidFunction = (): void => {
    if (typeof props.onIncrease === "function") {
      props.onIncrease();
    }
  };

  return (
    <div className={CounterStyle["counter-wrapper"]}>
      {/* 判断 num 是否大于 0, 决定是否显示组件 */}
      {props.displayNum && props.displayNum > 0 ? (
        <>
          {/* 减少数量 */}
          <button
            className={
              CounterStyle["ct-button"] + " " + CounterStyle["bt-minus"]
            }
            disabled={!(typeof props.onDecrease === "function")}
            onClick={decreaseFn}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>

          {/* 数量显示 */}
          <span className={CounterStyle["ct-text"]}>{props.displayNum}</span>
        </>
      ) : null}

      {/* 增加数量 */}
      <button
        className={CounterStyle["ct-button"] + " " + CounterStyle["bt-plus"]}
        disabled={!(typeof props.onIncrease === "function")}
        onClick={increaseFn}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}
