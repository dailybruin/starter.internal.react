import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import useMediaWidth from "src/shared/hooks/useMediaWidth";
import s from "./s.module.scss";
import WidgetUserAvatar from "../user-avatar";
import WidgetPageNavDrawer from "../page-nav-drawer";

const { Header } = Layout;

const datetimeOptions = {
  month: "long",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
};

const WidgetPageHeader: React.FC<{}> = () => {
  const [time, setTime] = useState<string>(
    new Date().toLocaleDateString("en-US", datetimeOptions),
  );

  useEffect(() => {
    const addedTimer = setInterval(() => {
      setTime(new Date().toLocaleDateString("en-US", datetimeOptions));
    }, 1000);

    return () => {
      clearInterval(addedTimer);
    };
  }, []);

  const mediaWidth = useMediaWidth();

  return (
    <Header className={s.header}>
      <div className={s.headerWrapper}>
        <WidgetPageNavDrawer />
        <h1 className={s.headerTitle}>Internal Tool</h1>
        <h3 className={s.headerTime}>{time}</h3>
        <WidgetUserAvatar isLoggedIn />
      </div>
    </Header>
  );
};

export default WidgetPageHeader;
