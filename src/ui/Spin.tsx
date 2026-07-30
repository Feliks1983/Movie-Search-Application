import React from "react";
import { Spin } from "antd";

const contentStyle: React.CSSProperties = {
  width: 388,
  height: 279,
  padding: 50,
  background: "#ffffff",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const LoadSpin: React.FC = () => (
  <Spin description="Loading" size="large">
    {content}
  </Spin>
);

export default LoadSpin;
