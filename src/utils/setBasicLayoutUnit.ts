/**
 * 设置视口的 rem 单位的参考大小
 * @param unit 参考设计稿宽度(默认会读取: `import.meta.env.VITE_VIEWPORT_UNIT`)
 */
export const setBasicLayoutUnit: (unit?: number | string) => void = (
  unit: string | number = import.meta.env.VITE_MOBILE_VIEWPORT_UNIT
): void => {
  if (typeof unit === "string") {
    unit = Number.parseInt(unit);
  }
  /**
   * 100vw 表示视口的总宽度, rem 单位会根据根元素(即: `body` 的 font-size 为参考, 1rem=body.style.font-size)
   * 假设设计稿的宽度是 `750px`, 那么布局中 1rem 所代表的宽度就为 (100/750)vw, 即: '0.133333vw'
   */
  document.documentElement.style.fontSize = `${100 / unit}vw`;
};
