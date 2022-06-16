import React from "react";

interface TableTextRowProps {
  lable: string | number;
}

export default function index(props: TableTextRowProps) {
  const { lable } = props;
  return (
    <>
      <div className="px-6 py-4 text-xs text-gray-500">{lable}</div>
    </>
  );
}
