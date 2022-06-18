import React from "react";
import Image from "next/image";
import Profile from "./Profile";

interface LayoutHomeProps {
  children: React.ReactNode;
}

export default function index(props: LayoutHomeProps) {
  const { children } = props;

  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <nav className="fixed w-full top-0 z-20">
          <div className="h-14 bg-white drop-shadow-sm p-4 flex justify-between">
            <Image
              src="/img/logo-wifus.png"
              alt="logo wifus"
              width={100}
              height={26}
            ></Image>

            <Profile />
          </div>
        </nav>
        <div className="bg-white h-14"></div>
        <div className="bg-slate-100 h-screen px-4 py-2">{children}</div>
      </div>
    </>
  );
}
