import React from "react";
import { HomeOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";

// exported config object
export default {
  sidebar: [
    {
      type: "page",
      title: "Home",
      path: "/",
      component: React.lazy(() => import("./pages/home")),
      icon: <HomeOutlined />,
    },
    {
      type: "page",
      path: "/profile",
      title: "Profile",
      component: React.lazy(() => import("./pages/profile")),
      icon: <UserOutlined />,
    },
    {
      type: "page",
      path: "/setting",
      title: "Setting",
      component: React.lazy(() => import("./pages/setting")),
      icon: <SettingOutlined />,
    },
    {
      type: "404",
      path: "*",
      component: React.lazy(() => import("./pages/page-404")),
    },
  ],
};
