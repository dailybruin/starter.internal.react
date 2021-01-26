import React from "react";
import s from "./s.module.scss";

interface FieldLabelProps {
   text: string,
   icon?: React.ReactNode,
}

const FieldLabel: React.FC<FieldLabelProps> = ({ text, icon }) => (
  <div className={s.fieldLabel}>
    {icon || <></>}
    <span className={s.fieldLabelText}>
      {text}
    </span>
  </div>
);

export default FieldLabel;
