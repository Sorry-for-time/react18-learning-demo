/**
 * 通用工具抽象基类
 */
export abstract class CommonToolCollection {
  /**
   * 节流函数包装器
   * @param executeFn 需要进行节流处理的原始函数
   * @param wait 等待时间, 默认 `200ms`
   * @param startImmediate 首次执行是否立即执行, 无需等待, 默认为 `true`
   * @param thisArg 函数执使用 `call()` 的 `thisArg`, 默认为 `null`
   * @returns {T} 进行节流处理过的包装函数
   */
  public static readonly throttle = <T extends (...args: Array<any>) => any>(
    executeFn: T,
    wait: number = 200,
    startImmediate: boolean = true,
    thisArg: object | null = null
  ): T => {
    // 锁信号量
    const signal: Int8Array = new Int8Array([0]);

    return ((...params: Array<any>): void => {
      if (startImmediate) {
        startImmediate = false;
        executeFn(thisArg, ...params);
      } else {
        // 如果当前信号量为 1, 那么中断本次执行
        if (signal[0]) {
          return;
        }
        // 上锁
        Atomics.xor(signal, 0, 1);
        window.setTimeout((): void => {
          executeFn.call(thisArg, ...params);
          // 执行完后进行解锁
          Atomics.xor(signal, 0, 1);
        }, wait);
      }
    }) as T;
  };

  /**
   * 防抖函数包装器
   * @param executeFn 需要进行防抖处理的原始函数
   * @param wait 等待时间, 默认 `200ms`
   * @param startImmediate 首次执行是否立即执行, 无需等待, 默认为 `true`
   * @param thisArg 函数执使用 `call()` 的 `thisArg`, 默认为 `null`
   * @returns {T} 进行防抖处理过的包装函数
   */
  public static readonly debounce = <T extends (...args: Array<any>) => any>(
    executeFn: T,
    wait: number = 200,
    startImmediate: boolean = true,
    thisArg: object | null = null
  ): T => {
    // 监听器引用记录
    let timer: number;

    return ((...params: Array<any>): void => {
      if (startImmediate) {
        startImmediate = false;
        timer = window.setTimeout((): void => {
          executeFn.call(thisArg, ...params);
        });
      } else {
        if (timer) {
          clearTimeout(timer);
        }
        timer = window.setTimeout((): void => {
          executeFn.call(thisArg, ...params);
        }, wait);
      }
    }) as T;
  };
}
