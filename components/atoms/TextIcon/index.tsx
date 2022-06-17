import React from "react";

interface TextIconProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function index(props: TextIconProps) {
  const { children, onClick } = props;
  return (
    <>
      <button className="px-1 cursor-pointer text-slate-500" onClick={onClick}>
        {children}
      </button>
    </>
  );
}
