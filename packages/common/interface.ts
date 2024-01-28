export type FlexDirect = "row" | "column" | "row-reverse" | "column-reverse";

export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

export type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around";

export type AlignItems = "stretch" | "flex-start" | "flex-end" | "center" | "baseline";

export type AlignContent = JustifyContent;

export interface FlexItem {
  id: string;
  width: number;
  height: number;
  order: number;
  flexGrow: number;
  flexShrink: number;
  flexBasis: string;
  alignSelf: "auto" | AlignContent;
}

export interface ListOption {
  id: number;
  label: string;
  description: string;
  filterValue?: any;
  backdropFilterValue?: any;
  value?: string;
}
