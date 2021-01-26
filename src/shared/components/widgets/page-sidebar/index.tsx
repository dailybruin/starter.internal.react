import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import config from "src/config";
import { Link } from "react-router-dom";
import useMediaWidth from "src/shared/hooks/useMediaWidth";
import WidgetPageMenu from "../page-menu";
import s from "./s.module.scss";

const { SubMenu } = Menu;
const { Sider } = Layout;

const WidgetPageSidebar: React.FC<{}> = () => {
  const { sidebar } = config;
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const mediaWidth = useMediaWidth();

  useEffect(() => {
    const { pathname } = window.location;
    const foundSelectedKeys = findSelectedKeys(pathname, sidebar);
    setSelectedKeys(foundSelectedKeys);
  }, [window.location.href]);

  const findSelectedKeys = (path: string, sidebarItems: any[]) => {
    let foundKeys: any[] = [];
    sidebarItems.forEach((item) => {
      const { type } = item;
      if (type === "menu") {
        foundKeys = [...foundKeys, ...findSelectedKeys(path, item.children)];
      }
      if (type === "page" && item.path === path) {
        foundKeys.push(item.title);
      }
    });
    return foundKeys;
  };

  const generateMenuItems = (sidebarItems: any[]) => {
    const menuItems: any[] = sidebarItems.map((item) => {
      const { type } = item;
      if (type === "menu") {
        const nestedMenuItems: any[] = generateMenuItems(item.children);
        return (
          <SubMenu key={item.title} title={item.title}>
            {nestedMenuItems}
          </SubMenu>
        );
      }
      if (type === "page") {
        return (
          <Menu.Item icon={item.icon} key={item.title} title={item.title}>
            <Link
              to={{
                pathname: item.path,
              }}
            >
              {item.title}
            </Link>
          </Menu.Item>
        );
      }
      return <></>;
    });
    return menuItems;
  };

  if (mediaWidth === "sm" || mediaWidth === "xs") {
    return <></>;
  }

  return (
    <Sider
      className={s.sider}
      width={200}
      collapsible
      trigger={null}
      collapsed={mediaWidth === "sm" || mediaWidth === "xs" || mediaWidth === "md"}
    >
      <WidgetPageMenu />
    </Sider>
  );
};

export default WidgetPageSidebar;
