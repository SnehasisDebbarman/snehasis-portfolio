import { ReactNode } from "react";
import { classNames } from "../../../utility/classNames";

export type ForeignNodeWrapper = {
  width: number | undefined;
  height: number | undefined;
  children?: ReactNode;
  isObject: boolean;
  nodeId?: string;
  isHighlighted?: boolean;
};

export function ForeignNodeWrapper(props: ForeignNodeWrapper) {
  return (
    <foreignObject
      width={props.width}
      height={props.height}
      style={{ overflow: "hidden" }}
      {...(props.nodeId && { "data-node-id": props.nodeId })}
      className={classNames(
        !props.isObject ? "text-center" : "",
        "pointer-events-none font-medium",
        "jt-tree-node",
        props.isHighlighted ? "jt-tree-node-highlighted" : "",
      )}
    >
      <div
        {...({ xmlns: "http://www.w3.org/1999/xhtml" } as Record<
          string,
          string
        >)}
        style={{ width: props.width, height: props.height }}
        className="jt-tree-node-inner"
      >
        {props.children}
      </div>
    </foreignObject>
  );
}
