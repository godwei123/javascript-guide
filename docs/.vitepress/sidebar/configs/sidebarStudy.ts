import { DefaultTheme } from "vitepress";

export const sidebarKotlin: DefaultTheme.SidebarItem[] = [
  { text: "Introduction", link: "/study/kotlin/introduction" },
];
export const sidebarRust: DefaultTheme.SidebarItem[] = [
  { text: "Introduction", link: "/study/rust/introduction" },
  { text: "笔记", link: "/study/rust/notes" },
];

export const sidebarStudy: DefaultTheme.SidebarItem[] = [
  {
    text: "Kotlin",
    items: sidebarKotlin,
  },
  {
    text: "Rust",
    items: sidebarRust,
  },
];
