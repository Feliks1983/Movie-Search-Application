"use client";
import { Layout } from "antd";
import ComponentContent from "./componentContent";
import "./css/content.css";
import LoadSpin from "./spin";
import ErrorPage from "../dashboard/error";

const { Content } = Layout;

export default function ContainerContent({ post = [], loading, error }) {
  return (
    <div className="content-style">
      <Content>
        {loading ? (
          <LoadSpin />
        ) : error ? (
          <ErrorPage />
        ) : post.length === 0 ? (
          <p>No results found.</p>
        ) : (
          post.map((movie) => (
            <ComponentContent
              key={movie.id}
              movie={movie}
              loading={loading}
              error={error}
            />
          ))
        )}
      </Content>
    </div>
  );
}
