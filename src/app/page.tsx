import { Layout } from "antd";
import ComponentTabs from "../ui/Tabs";

export default function Page() {
  return (
    <div className="container">
      <div className="page">
        <Layout>
          <ComponentTabs />
        </Layout>
      </div>
    </div>
  );
}
