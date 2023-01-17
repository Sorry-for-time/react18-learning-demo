import { CommonToolCollection } from "@/utils/CommonToolCollection";
import { setBasicLayoutUnit } from "@/utils/setBasicLayoutUnit";

/**
 * 设置布局
 */
function setLayout(): void {
  console.log("<----------layout change--------->");
  const toLowerCaseUserAgent: string = navigator.userAgent.toLowerCase();
  if (
    toLowerCaseUserAgent.includes("iphone") ||
    toLowerCaseUserAgent.includes("android") ||
    toLowerCaseUserAgent.includes("ipad") ||
    toLowerCaseUserAgent.includes("mobile")
  ) {
    setBasicLayoutUnit(import.meta.env.VITE_MOBILE_VIEWPORT_UNIT);
  } else {
    const clientWidth: number = document.body.clientWidth;
    const configWidth: number = Number.parseInt(
      import.meta.env.VITE_PC_VIEWPORT_UNIT
    );

    if (clientWidth >= configWidth) {
      setBasicLayoutUnit(configWidth + (clientWidth - configWidth));
    } else {
      setBasicLayoutUnit(document.body.clientWidth * 1.4);
    }
  }
}

// 设置初始状态
setLayout();
// 监听窗口大小改变
window.visualViewport?.addEventListener(
  "resize",
  CommonToolCollection.debounce(setLayout, 500, false)
);
