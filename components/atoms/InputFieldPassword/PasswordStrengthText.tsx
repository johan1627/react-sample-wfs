import React from "react";
import cx from "classnames";

interface PasswordStrengthTextProps {
  strength: string;
}

export default function PasswordStrengthText(props: PasswordStrengthTextProps) {
  const { strength } = props;

  const classItem = cx({
    "text-xs text-end pt-1": true,
    "text-red-500":
      strength == "Very weak" ||
      strength == "Weak" ||
      strength == "Not Match" ||
      strength == "Email/password failed" ||
      strength == "Email not registered"
        ? true
        : false,
    "text-emerald-500": strength == "Medium" ? true : false,
    "text-blue-500": strength == "Strong" || strength == "Match" ? true : false,
  });

  return (
    <>
      <p className={classItem}>{strength}</p>
    </>
  );
}
