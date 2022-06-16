import React from "react";
import Image from "next/image";

interface LayoutSignInProps {
  children: React.ReactNode;
}

export default function LayoutSignIn(props: LayoutSignInProps) {
  const { children } = props;
  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-2">
        {/* Section left */}
        <section className="hidden bg-sky-50 h-screen md:block">
          <div className="mt-20 flex flex-col items-center">
            <div className="p-4">
              <Image
                src="/img/logo-signin.png"
                alt="logo wifus"
                width={300}
                height={294}
              ></Image>
            </div>
            <div className="flex flex-col items-center gap-4">
              <p className="text-center md:text-start px-4">
                <span className="font-semibold text-3xl text-slate-800">
                  Ekosistem
                </span>{" "}
                <span className="font-semibold text-3xl text-slate-800 underline decoration-sky-500">
                  informasi kesehatan
                </span>
                <br />
                <span className="font-semibold text-3xl text-slate-800">
                  untuk klinik
                </span>
              </p>

              <p className="lg:px-20 md:px-10 text-slate-400">
                Penyedia ekosistem informasi kesehatan berbasis cloud yang
                terintegrasi dengan keamanan tinggi, standar medis dan user
                friendly. Bebas pusing, untung maksimal!.
              </p>
            </div>
          </div>
        </section>

        {/* Section right */}
        <section className="bg-white h-screen">
          <div className="h-14 bg-white shadow-sm p-4">
            <Image
              src="/img/logo-wifus.png"
              alt="logo wifus"
              width={100}
              height={26}
            ></Image>
          </div>

          {children}
        </section>
      </main>
    </>
  );
}
