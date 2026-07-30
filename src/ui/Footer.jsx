"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Layout } from "antd";
import PaginationContainer from "./Pagination";
import "./css/footer.css";

const { Footer } = Layout;

export default function ComponentFooter({ current, total, pageSize }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="footer-ui">
      <Footer>
        <PaginationContainer
          current={current}
          total={total}
          pageSize={pageSize}
          onChange={handleChange}
        />
      </Footer>
    </div>
  );
}
