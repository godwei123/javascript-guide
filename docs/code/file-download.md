# 文件下载

```typescript
export const downloadFile = (url: string, filename: string = "", newWindow: boolean = false) => {
  const $link = document.createElement("a");
  $link.download = filename || Date.now().toString();
  $link.href = url;
  $link.style.display = "none";
  if (newWindow) {
    $link.target = "view_window";
  }
  document.body.appendChild($link);
  $link.click();
  document.body.removeChild($link);
};

export const postDownloadFile = (url: string, data: any) => {
  const win = window.open("", "_blank");
  const formStr = `<form method="post" action="${url}">${Object.keys(data)
    .map((key) => `<input type="hidden" name="${key}" value="${data[key]}">`)
    .join("")}</form>`;
  // @ts-ignore
  win?.document.body.innerHTML = formStr;
  win?.document.forms[0].submit();
};

export const saveAs = (blob: Blob, filename: string) => {
  const { type, size } = blob;
  const forceSavableType = "application/octet-stream";
  if (type && type !== forceSavableType) {
    const slice = blob.slice || blob["webkitSlice"];
    blob = slice.call(blob, 0, size, forceSavableType);
  }
  const url = URL.createObjectURL(blob);
  downloadFile(url, filename);
  URL.revokeObjectURL(url);
};

const limitDownload = (fn: (...args: any) => any) => {
  let lock = false;
  return async (...args: any[]) => {
    if (lock) return;
    lock = true;
    await fn(...args);
    lock = false;
  };
};

const lockFn = (fn: (...args: any) => any) => {
  let lock = false;
  return async (...args: any[]) => {
    if (lock) return;
    lock = true;
    try {
      await fn(...args);
    } catch (e) {
      lock = false;
      throw e;
    }
    lock = false;
  };
};

export const downloadFileByPostStream = async (url: string, data: any, filename: string = "") => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const blob = await res.blob();
  const name = res.headers.get("Content-Disposition")?.split("filename=")[1] || filename;
  saveAs(blob, decodeURIComponent(name));
};

export const downloadFileAsStream = async (url: string, filename: string = "") => {
  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  const blob = await res.blob();
  const name = res.headers.get("Content-Disposition")?.split("filename=")[1] || filename;
  saveAs(blob, decodeURIComponent(name));
};

export const downloadResource = async (data: any, filename: string = "") => {
  if (typeof data === "string") {
    await downloadFileAsStream(data, filename);
  } else {
    saveAs(new Blob([data]), filename);
  }
};
```
