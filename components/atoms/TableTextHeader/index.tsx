import React from "react";

interface TableTextHeaderProps {
  lable: string;
}

export default function index(props: TableTextHeaderProps) {
  const { lable } = props;
  return (
    <>
      <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap ">
        {lable}
      </div>
    </>
  );
}
