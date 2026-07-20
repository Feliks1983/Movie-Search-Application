"use client";
import { Tabs } from "antd";

const ComponentTabs = () => (
  <Tabs
    defaultActiveKey="1"
    items={[
      {
        label: "Search",
        key: "1",
      },
      {
        label: "Rated",
        key: "2",
        disabled: true,
      },
    ]}
  />
);

export default ComponentTabs;
