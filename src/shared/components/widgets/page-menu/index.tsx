import React, { useEffect, useState, useMemo } from "react";
import { Layout, Menu } from "antd";
import config from "src/config";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const WidgetPageMenu: React.FC<{}> = () => {
  const { sidebar } = config;
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

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
              key={item.path}
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

  return (
    <Menu
      mode="inline"
      selectedKeys={selectedKeys}
    >
      {generateMenuItems(sidebar)}
    </Menu>
  );
};

export default WidgetPageMenu;
