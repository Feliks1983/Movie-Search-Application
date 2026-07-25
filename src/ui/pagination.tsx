"use client";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./css/pagination.css";

const group_size = 5;

export default function PaginationContainer({
  current = 1,
  total = 0,
  pageSize = 6,
  onChange,
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const currents = Math.floor((current - 1) / group_size);
  const start = currents * group_size + 1;
  const end = Math.min(start + group_size - 1, totalPages);

  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  const hasBack = start > 1;
  const hasNext = end < totalPages;

  const back = () => {
    const target = Math.max(1, start - group_size);
    onChange?.(target);
  };

  const next = () => {
    const target = Math.min(totalPages, start + group_size);
    onChange?.(target);
  };

  return (
    <ul className="pagination">
      <Button
        className="pagination-arrow"
        icon={<LeftOutlined />}
        disabled={!hasBack}
        onClick={back}
      />

      {pages.map((p) => (
        <Button
          key={p}
          className={
            p === current ? "pagination-item active" : "pagination-item"
          }
          type={p === current ? "primary" : "default"}
          onClick={() => onChange?.(p)}
        >
          {p}
        </Button>
      ))}

      <Button
        className="pagination-arrow"
        icon={<RightOutlined />}
        disabled={!hasNext}
        onClick={next}
      />
    </ul>
  );
}
