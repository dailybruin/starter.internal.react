/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useState, useMemo } from "react";
import { Avatar, Popover, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import style from "./s.module.scss";

interface WidgetUserAvatarProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
  onAvatarClick?: (e: any) => void;
}

// logged in

const WidgetUserAvatar: React.FC<WidgetUserAvatarProps> = (props) => {
  const { isLoggedIn, onLogout, onAvatarClick } = props;
  const [popupActive, setPopupActive] = useState<boolean>(false);

  const handleAvatarClick = (e: any) => {
    if (onAvatarClick) {
      onAvatarClick(e);
    }
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const popupTitle = (
    <div className={style.popupTitleWrapper}>
      <div className={style.popupAvatarWrapper} onClick={handleAvatarClick}>
        <Avatar icon={<UserOutlined />} size={32} />
      </div>
      <div>
        <div className={style.popupTitleName}>Rex Wang</div>
        <div className={style.popupTitleEmail}>rwang@media.ucla.edu</div>
      </div>
    </div>
  );

  const popoverContent = (
    <Button
      type="link"
      className={style.logoutButton}
      onClick={handleLogoutClick}
    >
      Sign Out
    </Button>
  );

  return (
    <div>
      <Popover
        title={popupTitle}
        placement="bottomLeft"
        content={popoverContent}
        trigger="click"
      >
        <Avatar
          className={style.userAvatarCircle}
          size={32}
          icon={<UserOutlined />}
        />
      </Popover>
    </div>
  );
};

export default WidgetUserAvatar;
