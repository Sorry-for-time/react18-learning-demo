import type { ReactPortal } from "react";
import { createPortal } from "react-dom";
import BackdropStyle from "./Backdrop.module.scss";

export function Backdrop(
  props: Partial<{
    zIndex: number;
    children: Readonly<JSX.Element>;
    onClick: () => void;
  }>
): ReactPortal {
  return createPortal(
    <div
      style={{
        zIndex: typeof props.zIndex === "number" ? props.zIndex : "unset"
      }}
      className={BackdropStyle["backdrop-wrapper"]}
      onClick={
        typeof props.onClick === "function" ? props.onClick : (): void => {}
      }
    >
      <div className={BackdropStyle["wrapper"]}>{props.children}</div>
    </div>,
    document.body
  );
}
