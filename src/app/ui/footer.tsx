"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Layout } from "antd";
import PaginationContainer from "./pagination";

const { Footer } = Layout;

const footerStyle = {
  display: "flex",
  justifyContent: "center",
  width: 204,
  height: 24,
  opacity: 1,
  background: "none",
};

const footerContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: 36,
};

export default function ComponentFooter({ current, total, pageSize }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (newPage) => {
    const query = searchParams.get("query") || "return";
    router.push(`/?query=${encodeURIComponent(query)}&page=${newPage}`);
  };
  return (
    <div style={footerContainerStyle}>
      <Footer style={footerStyle}>
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
