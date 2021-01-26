import React from "react";
import { Spin } from "antd";
import s from "./s.module.scss";

const FallbackSpinner: React.FC<{}> = () => (
  <div className={s.fallbackSpinnerWrapper}><Spin size="large" /></div>
);

export default FallbackSpinner;
