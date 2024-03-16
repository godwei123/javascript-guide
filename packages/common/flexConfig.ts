import { SelectOption } from "naive-ui";

const flexDirectionOptions: Array<SelectOption> = [
  {
    label: "row",
    value: "row",
  },
  {
    label: "row-reverse",
    value: "row-reverse",
  },
  {
    label: "column",
    value: "column",
  },
  {
    label: "column-reverse",
    value: "column-reverse",
  },
];

const flexWrapOptions = [
  {
    label: "nowrap",
    value: "nowrap",
  },
  {
    label: "wrap",
    value: "wrap",
  },
  {
    label: "wrap-reverse",
    value: "wrap-reverse",
  },
];

const justifyContentOptions = [
  {
    label: "flex-start",
    value: "flex-start",
  },
  {
    label: "flex-end",
    value: "flex-end",
  },
  {
    label: "center",
    value: "center",
  },
  {
    label: "space-between",
    value: "space-between",
  },
  {
    label: "space-around",
    value: "space-around",
  },
];

const alignItemsOptions = [
  {
    label: "stretch",
    value: "stretch",
  },
  {
    label: "flex-start",
    value: "flex-start",
  },
  {
    label: "flex-end",
    value: "flex-end",
  },
  {
    label: "center",
    value: "center",
  },
  {
    label: "baseline",
    value: "baseline",
  },
];

const alignContentOptions = [
  {
    label: "flex-start",
    value: "flex-start",
  },
  {
    label: "flex-end",
    value: "flex-end",
  },
  {
    label: "center",
    value: "center",
  },
  {
    label: "space-between",
    value: "space-between",
  },
  {
    label: "space-around",
    value: "space-around",
  },
  {
    label: "stretch",
    value: "stretch",
  },
];

export {
  flexDirectionOptions,
  flexWrapOptions,
  justifyContentOptions,
  alignContentOptions,
  alignItemsOptions,
};
