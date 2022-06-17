import Image from "next/image";
import Link from "next/link";
import React from "react";
import TextListTile from "./TextListTile";

export default function index() {
  return (
    <>
      <div className="flex items-center">
        <i className="fa-solid fa-angle-left"></i>
        <Link href="/">
          <a className="text-xs px-2 py-2 hover:underline">back</a>
        </Link>
      </div>

      <div className="flex flex-row gap-4 justify-center mt-8">
        <div className="bg-white p-4 py-10 w-1/4 rounded-lg drop-shadow-sm h-full">
          <div className="flex flex-col items-center">
            <Image
              className="rounded-full "
              src="https://ui-avatars.com/api/?name=Blank&color=3498db&background=B2EBF2&size=300"
              alt="avatar"
              width={180}
              height={180}
            ></Image>

            <p className="mt-4 text-slate-600 font-semibold text-xl">
              Harry Potter
            </p>

            <p className="mt-2 text-white text-xs bg-sky-300 font-semibold px-2 py-1 rounded-xl">
              Human
            </p>
          </div>
        </div>

        <div className="bg-white p-4 py-10 w-1/3 rounded-lg drop-shadow-sm ">
          <div className="grid grid-cols-2">
            <div>
              <TextListTile header={"gender"} label={"male"} />
              <TextListTile header={"house"} label={"Gryffindor"} />
              <TextListTile header={"dateOfBirth"} label={"31-07-1980"} />
              <TextListTile header={"yearOfBirth"} label={"1980"} />
              <TextListTile header={"ancestry"} label={"half-blood"} />
              <TextListTile header={"eyeColour"} label={"green"} />
            </div>
            <div>
              <TextListTile header={"hairColour"} label={"black"} />
              <TextListTile header={"patronus"} label={"stag"} />
              <TextListTile header={"hogwartsStudent"} label={"true"} />
              <TextListTile header={"hogwartsStaff"} label={"true"} />
              <TextListTile header={"actor"} label={"Daniel Radcliffe"} />
              <TextListTile header={"alive"} label={"true"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
