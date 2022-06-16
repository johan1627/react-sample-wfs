import cx from "classnames";
import Image from "next/image";
import React, { useState } from "react";

interface InputFieldPasswordProps {
  lable: string;
  value: string;
  onChange: (e: any) => void;
}

export default function InputFieldPassword(props: InputFieldPasswordProps) {
  const { lable, value, onChange } = props;
  const [passwordType, setPasswordType] = useState("password");
  const [iconEye, setIconEye] = useState("/icon/ic_eye_hidden_24.png");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setIconEye("/icon/ic_eye_24.png");
      return;
    }
    setPasswordType("password");
    setIconEye("/icon/ic_eye_hidden_24.png");
  };

  return (
    <>
      <div className="relative">
        <div className="flex flex-col">
          <label className="text-sm text-slate-400 mb-1">{lable}</label>
          <input
            className="rounded-md border-2 text-md font-medium text-slate-700 px-4 py-2 focus:outline-sky-500 placeholder:font-normal placeholder:text-sm placeholder:text-slate-300 duration-500"
            type={passwordType}
            name="password"
            placeholder="Enter your password"
            value={value}
            onChange={onChange}
          />
        </div>

        <div
          className="absolute right-4 top-9 cursor-pointer"
          onClick={togglePassword}
        >
          <Image src={iconEye} width={20} height={20} alt="icon eye"></Image>
        </div>
      </div>
    </>
  );
}
