import React from "react";
import s from "./s.module.scss";

interface ResponsiveFormRowProps {
    children: React.ReactNode
}

const ResponsiveFormRow: React.FC<ResponsiveFormRowProps> = ({ children }) => (
  <div className={s.responsiveFormRow}>
    {children}
  </div>
);

export default ResponsiveFormRow;
