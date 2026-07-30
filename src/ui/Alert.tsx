import React from "react";
import { Alert } from "antd";

export const MessageAlert: React.FC = () => (
  <Alert
    title="Success Tips"
    description="Detailed description and advice about successful copywriting."
    type="success"
    showIcon
  />
);

export const AlertError: React.FC = () => (
  <Alert
    title="Error"
    description="This is an error message about copywriting."
    type="error"
    showIcon
  />
);

export const OfflineAlert: React.FC = () => (
  <Alert
    title="No internet connection"
    description="No internet connection."
    type="warning"
    showIcon
    style={{ margin: "20px 0" }}
  />
);

const alerts = { MessageAlert, AlertError, OfflineAlert };
export default alerts;
