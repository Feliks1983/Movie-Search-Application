"use client";
import { useCallback, useMemo } from "react";
import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "./css/pagination.css";

export default function PaginationContainer({
  current = 1,
  total = 0,
  pageSize = 4,
  onChange,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

const totalPages = useMemo(() => {
  return Math.max(1, Math.ceil(total / pageSize));
}, [total, pageSize]);

 const { groupStart, groupEnd } = useMemo(() => {
   const start = Math.floor((current - 1) / pageSize) * pageSize + 1;
   const end = Math.min(start + pageSize - 1, totalPages);
   return { groupStart: start, groupEnd: end };
 }, [current, totalPages, pageSize]);

 const goToPage = useCallback(
   (page) => {
     if (onChange) {
       onChange(page);
       return;
     }
     const params = new URLSearchParams(searchParams.toString());
     params.set("page", String(page));
     router.push(`${pathname}?${params.toString()}`);
   },
   [onChange, router, pathname, searchParams],
 );

 const handleChange = useCallback(
   (page) => {
     if (page === current + 1 && page > groupEnd) {
       goToPage(Math.min(totalPages, groupEnd + 1));
       return;
     }
     if (page === current - 1 && page < groupStart) {
       goToPage(Math.max(1, groupStart - 1));
       return;
     }
     goToPage(page);
   },
   [current, groupStart, groupEnd, totalPages, goToPage],
 );

 const itemRender = useCallback(
   (page, type, element) => {
   if (type === "jump-next" || type === "jump-prev") return null;
     if (type === "page") {
       if (page < groupStart || page > groupEnd) return null;
       return element;
     }
     return element;
   },
   [groupStart, groupEnd],
 );

 return (
   <div className="pagination">
     <Pagination
       current={current}
       total={total}
       pageSize={pageSize}
       onChange={handleChange}
       itemRender={itemRender}
       showSizeChanger={false}
     />
   </div>
 );
}
