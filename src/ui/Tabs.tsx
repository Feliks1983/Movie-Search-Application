"use client";
import { Suspense } from "react";
import { Tabs } from "antd";
import Search from "../search/Search";
import Rated from "../rated/Rated";
import { GuestProvider } from "../lib/guestSession";
import { RatingsProvider } from "../lib/ratingsContext";
import { GenresProvider } from "../lib/genresContext";
import "./css/tabs.css";

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
      <RatingsProvider>
        <GenresProvider>
          <Tabs items={items} defaultActiveKey="1" centered />
        </GenresProvider>
      </RatingsProvider>
    </GuestProvider>
  );
};

export default ComponentTabs;
