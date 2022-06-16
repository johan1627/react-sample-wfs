import React from "react";

interface PasswordHelperTextProps {
  lable: string;
}

export default function PasswordHelperText(props: PasswordHelperTextProps) {
  const { lable } = props;

  return (
    <>
      <p className="text-xxs text-start pt-1 text-slate-500">{lable}</p>
    </>
  );
}
