import React from "react";

interface ItemMenuProfileProps {
  lable: string;
  iconClassName: string;
  onClick: () => void;
}

export default function ItemMenuProfile(props: ItemMenuProfileProps) {
  const { lable, iconClassName, onClick } = props;
  return (
    <>
      <div>
        {/* <a
          onClick={onClick}
          className="py-2 text-left px-4 text-slate-600 hover:text-sky-700 flex items-center cursor-pointer"
        >
          <i className={iconClassName}></i>
          <p className="text-xs px-2">{lable}</p>
        </a> */}
      </div>
    </>
  );
}
