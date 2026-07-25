"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Layout } from "antd";
import PaginationContainer from "./pagination";
import './css/footer.css'

const { Footer } = Layout;


export default function ComponentFooter({ current, total, pageSize }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (newPage) => {
    const query = searchParams.get("query") || "return";
    router.push(`/?query=${encodeURIComponent(query)}&page=${newPage}`);
  };
  return (
    <div className="footerContainerStyle">
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
