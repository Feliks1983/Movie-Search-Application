"use client";
import { Layout } from "antd";
import ComponentTabs from "./Tabs";
import './css/header.css'

const { Header } = Layout;

export default function ComponentHeader() {
  return (
    <div className="header-ui">
      <Header>
        <ComponentTabs />
      </Header>
    </div>
  );
}
