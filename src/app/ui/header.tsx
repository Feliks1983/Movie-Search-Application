"use client";
import { Layout } from "antd";
import ComponentTabs from "./tabs";

const { Header } = Layout;

const headerStyle = {
  display: "flex",
  justifyContent: "center",
  width: 'auto',
  height: 53.8,
  opacity: 1,
  background: "#FFFFFF",
};

const headerContainerStyle = {
  display: "flex",
  justifyContent: "center",
  width: 'auto',
};

export default function ComponentHeader() {
  return (
    <div style={headerContainerStyle}>
      <Header style={headerStyle}>
        <ComponentTabs />
      </Header>
    </div>
  );
}
