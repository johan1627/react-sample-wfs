import React from "react";

interface InputFieldEmailProps {
  value: string;
  onChange: (e: any) => void;
}
export default function index(props: InputFieldEmailProps) {
  const { value, onChange } = props;
  return (
    <>
      <div className="flex flex-col">
        <label className="text-sm text-slate-400 mb-1">Email Address</label>
        <input
          className="rounded-md border-2 text-md font-medium text-slate-700 px-4 py-2 focus:outline-sky-500 placeholder:font-normal placeholder:text-sm placeholder:text-slate-300 duration-500"
          type="email"
          id="email"
          name="email"
          placeholder="email@domain.com"
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}
