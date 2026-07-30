"use client";
import { Suspense } from "react";
import { Tabs } from "antd";
import Search from "../search/page";
import Rated from "../rated/page";
import { GuestProvider } from "../lib/guestSession";
import './css/tabs.css'

const items = [
  {
    label: <span className="style-tabs">Search</span>,
    key: "1",
    children: (
      <Suspense fallback={null}>
        <Search />
      </Suspense>
    ),
  },
  {
    label: <span className="style-tabs">Rated</span>,
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
