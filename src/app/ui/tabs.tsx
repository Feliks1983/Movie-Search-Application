"use client";
import { Suspense } from "react";
import { Tabs } from "antd";
import { createStaticStyles } from "antd-style";
import Search from "../search/search";
import Rated from "../rated/rated";
import { GuestProvider } from "../lib/guestSession";

const styleTabs = createStaticStyles(({ css }) => ({
  item: css`
    color: #000000a6;
    font-family: Inter;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0;
    text-align: center;

    .ant-tabs-tab-active & {
      color: #1890ff;
    }
  `,
}));

const items = [
  {
    label: <span className={styleTabs.item}>Search</span>,
    key: "1",
    children: (
      <Suspense fallback={null}>
        <Search />
      </Suspense>
    ),
  },
  {
    label: <span className={styleTabs.item}>Rated</span>,
    key: "2",
    children: (
      <Suspense fallback={null}>
        <Rated />
      </Suspense>
    ),
  },
];

const ComponentTabs = () => {
  return (
    <GuestProvider>
      <Tabs items={items} defaultActiveKey="1" centered />
    </GuestProvider>
  );
};

export default ComponentTabs;
