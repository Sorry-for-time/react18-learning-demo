import { setBasicLayoutUnit } from "@/utils/setBasicLayoutUnit";

setBasicLayoutUnit();
window.visualViewport?.addEventListener("resize", (): void => {
  const toLowerCaseUserAgent: string = navigator.userAgent.toLowerCase();
  if (
    toLowerCaseUserAgent.includes("iphone") ||
    toLowerCaseUserAgent.includes("android")
  ) {
    setBasicLayoutUnit(import.meta.env.VITE_MOBILE_VIEWPORT_UNIT);
  } else {
    setBasicLayoutUnit(import.meta.env.VITE_PC_VIEWPORT_UNIT);
  }
});
