export function getPageNumbers(pageRange: string, pageCount: number): number[] {
  const ranges = pageRange.split(",");
  let pages = [];
  for (const r of ranges) {
    if (r.indexOf("-") < 0) {
      pages.push(Math.min(pageCount, Number(r)));
    } else {
      const [start, end] = r.split("-");
      const s = Number(start);
      const e = end === "" ? pageCount : Number(end);
      let a = Math.min(pageCount, Math.min(s, e));
      const b = Math.min(Math.max(s, e), pageCount);
      while (b >= a) {
        pages.push(a);
        a++;
      }
    }
  }
  if (pages.length === 0) {
    pages = [...Array(pageCount).keys()].map((x) => ++x);
  }
  return pages;
}
