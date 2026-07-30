"use client";
import { Tag } from "antd";
import './css/button-mobile.css'

const tagsData = ["Action", "Drama"];

export default function Buttons() {
  return (
    <div className="button">
      {tagsData.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </div>
  );
}
