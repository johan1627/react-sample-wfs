import React from "react";
import cx from "classnames";

interface SpinnerProgressLoadProps {
  isLoading: boolean;
}

export default function index(props: SpinnerProgressLoadProps) {
  const { isLoading } = props;

  const classSpin = cx({
    "h-5 w-5 text-slate-100": true,
    "animate-spin-reverse": isLoading,
  });

  const classDiv = cx({
    "hidden ": !isLoading,
  });

  return (
    <>
      <div className="px-1">
        <div className={classDiv}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={classSpin}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
