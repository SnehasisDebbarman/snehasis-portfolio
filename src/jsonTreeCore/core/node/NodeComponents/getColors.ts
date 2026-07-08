type getKeyColor = {
  parent?: boolean;
  type?: string;
  objectKey?: boolean;
};

/**
 * Portfolio color palette:
 *   amber:       hsl(40, 70%, 67%)  → #d4a373 / #e9c46a
 *   text:        hsl(38, 25%, 94%)  → warm off-white
 *   text-muted:  hsl(30, 10%, 52%)  → warm grey
 *   teal:        #84c0a8             → numbers
 *   bg3:         hsl(14, 6%, 16%)   → subtle backgrounds
 */

export function getKeyColor({ parent, type, objectKey }: getKeyColor) {
  if (parent) {
    // Array parent → amber (main accent)
    if (type === "array") return "jt-node-array";
    // Object parent → amber variant
    return "jt-node-object";
  }
  if (objectKey) {
    // Object keys → muted amber
    return "jt-node-key";
  }
  // Default text
  return "jt-node-default";
}

export function getValueColor(value: string) {
  if (!Number.isNaN(+value)) return "jt-node-number";
  if (value === "true")  return "jt-node-bool-true";
  if (value === "false") return "jt-node-bool-false";
  if (value === "null")  return "jt-node-null";
  // String values
  return "jt-node-string";
}
