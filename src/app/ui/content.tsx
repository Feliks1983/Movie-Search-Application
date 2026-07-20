"use client";
import { Layout } from "antd";
import ComponentContent from "./componentContent";
import "./css/content.css";

const { Content } = Layout;

export default function ContainerContent({
  post = [],
  videos = [],
}) {
  return (
    <div className="content-style">
      <Content>
        {post.length === 0 ? (
          <p>No results found.</p>
        ) : (
          post.map((movie) => {
            const video = videos.find((v) => v.movieId === movie.id);
            return (
              <ComponentContent
                key={movie.id}
                movie={movie}
                video={video?.video || null}
              />
            );
          })
        )}
      </Content>
    </div>
  );
}
