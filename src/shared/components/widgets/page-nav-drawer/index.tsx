import React, { useEffect, useState, useMemo } from "react";
import {
  Drawer, Button,
} from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import useMediaWidth from "src/shared/hooks/useMediaWidth";
import WidgetPageMenu from "../page-menu";

const WidgetPageNavDrawer: React.FC<{}> = () => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const mediaWidth = useMediaWidth();

  useEffect(() => {
    onClose();
  }, [window.location.href]);

  const onClose = () => {
    setShowDrawer(false);
  };

  const handleClick = () => {
    setShowDrawer((prevVal) => !prevVal);
  };

  if (mediaWidth === "md" || mediaWidth === "lg") {
    return <></>;
  }

  return (
    <div>
      <Button
        type="text"
        icon={
          <MenuUnfoldOutlined style={{ color: "#fff" }} />
        }
        onClick={handleClick}
      />
      <Drawer
        title="Internal Tool"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={showDrawer && (mediaWidth === "sm" || mediaWidth === "xs")}
        key="left"
        bodyStyle={{
          padding: 0,
        }}
      >
        <WidgetPageMenu />
      </Drawer>
    </div>
  );
};

export default WidgetPageNavDrawer;
