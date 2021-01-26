import React from "react";
import { Layout } from "antd";
import WidgetPageHeader from "../widgets/page-header";
import WidgetPageSidebar from "../widgets/page-sidebar";
import s from "./s.module.scss";

const { Content } = Layout;

interface PageLayoutProps {
  children?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <WidgetPageHeader />
      <Layout>
        <WidgetPageSidebar />
        <Layout className={s.contentLayout}>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              marginTop: 16,

            }}
            className={s.content}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
