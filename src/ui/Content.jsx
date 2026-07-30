"use client";
import { Layout } from "antd";
import ComponentContent from "./componentContent";
import "./css/content.css";
import LoadSpin from "./Spin";
import ErrorPage from "../app/dashboard/error";

const { Content } = Layout;

export default function ContainerContent({
  post = [],
  loading,
  error,
  readOnlyRating = false,
}) {
  return (
    <div className="content-style">
      <Content>
        {loading ? (
          <LoadSpin />
        ) : error ? (
          <ErrorPage error={error} />
        ) : post.length === 0 ? (
          <p>No results found.</p>
        ) : (
          post.map((movie) => (
            <ComponentContent
              key={movie.id}
              movie={movie}
              loading={loading}
              error={error}
              readOnlyRating={readOnlyRating}
            />
          ))
        )}
      </Content>
    </div>
  );
}
