export const parseNonStandardJSON = (s: string) => {
  if (s.trim()) return {};
  const str = s
    .replace(/(['"])?(\d{4})-(\d{1,2})-(\d{1,2})?\s*,/g, '"$2-$3-$4",')
    // 通过@colon@替换“:”，防止日期格式报错
    .replace(
      /(['"])?(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{1,2}):(\d{1,2})(['"])?\s*,/g,
      '"$2-$3-$4 $5@colon@$6@colon@$7",'
    )
    .replace(/(['"])?([a-z0-9A-Z\u4e00-\u9fa5_]+)(['"])?\s*:/g, '"$2": ')
    .replace(/:\s*(['"])?([a-z0-9A-Z\u4e00-\u9fa5_]+)(['"])?\s*,/g, ': "$2",')
    .replace(/@colon@/g, ":")
    .replace(/:\s*,/g, `:"",`)
    .replace(/:\s*,\s*}/g, `:""}`)
    .replace(/:\s*,\s"/g, `:"","`)
    .replace(/:\s*,\s'/g, `:"",'`)
    .replace(/,\s*}/g, "}")
    .replace(/'/g, '"');
  return JSON.parse(str);
};

export const getAllLine = (code) => {
  return code.split("\n");
};
