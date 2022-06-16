import React from "react";
import cx from "classnames";
import SpinnerProgressLoad from "./SpinnerProgressLoad";

interface ButtonSignInProps {
  lable: string;
  onClick: () => void;
  disable: boolean;
  isLoading: boolean;
}

export default function BtnSign(props: ButtonSignInProps) {
  const { lable, onClick, disable, isLoading } = props;
  const classItem = cx({
    "py-2 px-8 rounded-md duration-500 md:w-64 w-full": true,
    "bg-sky-500 hover:bg-sky-600": !disable,
    "bg-gray-400": disable,
  });

  return (
    <>
      <div className="md:flex md:justify-center">
        <button disabled={disable} onClick={onClick} className={classItem}>
          <div className="flex flex-row justify-center items-center">
            <div className="flex justify-center font-medium text-white">
              {lable}
            </div>
            <SpinnerProgressLoad isLoading={isLoading} />
          </div>
        </button>
      </div>
    </>
  );
}
