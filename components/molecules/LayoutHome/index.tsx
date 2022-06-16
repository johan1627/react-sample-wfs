import React from "react";
import Image from "next/image";

interface LayoutHomeProps {
  children: React.ReactNode;
}

export default function index(props: LayoutHomeProps) {
  const { children } = props;

  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <nav className="fixed w-full top-0">
          <div className="h-14 bg-white drop-shadow-sm p-4">
            <Image
              src="/img/logo-wifus.png"
              alt="logo wifus"
              width={100}
              height={26}
            ></Image>
          </div>
        </nav>
        <div className="bg-white h-14"></div>
        <div className="bg-slate-100 h-full">{children}</div>
      </div>
    </>
  );
}
