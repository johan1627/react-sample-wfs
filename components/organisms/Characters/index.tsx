import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import TextListTile from "./TextListTile";

export default function CharacterDetail() {
  const [character, setCharacter] = useState({
    name: "",
    species: "",
    gender: "",
    house: "",
    dateOfBirth: "",
    yearOfBirth: 0,
    wizard: false,
    ancestry: "",
    eyeColour: "",
    hairColour: "",
    wand: [],
    patronus: "",
    hogwartsStudent: false,
    hogwartsStaff: false,
    actor: "",
    alternate_actors: [],
    alive: "",
    image:
      "https://ui-avatars.com/api/?name=blank&color=3498db&background=B2EBF2&size=80",
  });

  const load = useCallback(async () => {
    const re = localStorage.getItem("wfs-character");
    const pa = JSON.parse(re!);

    setCharacter(pa);
  }, []);

  // initial Load
  useEffect(() => {
    load();
  }, [load]);

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
            {character["image"] == "" ? (
              <Image
                className="rounded-full "
                src={`https://ui-avatars.com/api/?name=${character["name"]}}&color=3498db&background=B2EBF2&size=300`}
                alt="avatar"
                width={180}
                height={180}
              ></Image>
            ) : (
              <Image
                objectFit="cover"
                className="rounded-full "
                src={character.image}
                alt="avatar"
                width={180}
                height={180}
              ></Image>
            )}

            <p className="mt-4 text-slate-600 font-semibold text-xl">
              {character.name}
            </p>

            <p className="mt-2 text-white text-xs bg-sky-300 font-semibold px-2 py-1 rounded-xl">
              {character.species}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 py-10 w-1/3 rounded-lg drop-shadow-sm ">
          <div className="grid grid-cols-2">
            <div>
              <TextListTile header={"gender"} label={character.gender} />
              <TextListTile header={"house"} label={character.house} />
              <TextListTile
                header={"dateOfBirth"}
                label={character.dateOfBirth}
              />
              <TextListTile
                header={"yearOfBirth"}
                label={character.yearOfBirth}
              />
              <TextListTile header={"ancestry"} label={character.ancestry} />
              <TextListTile header={"eyeColour"} label={character.eyeColour} />
            </div>
            <div>
              <TextListTile
                header={"hairColour"}
                label={character.hairColour}
              />
              <TextListTile header={"patronus"} label={character.patronus} />
              <TextListTile
                header={"hogwartsStudent"}
                label={character.hogwartsStudent}
              />
              <TextListTile
                header={"hogwartsStaff"}
                label={character.hogwartsStaff}
              />
              <TextListTile header={"actor"} label={character.actor} />
              <TextListTile header={"alive"} label={character.alive} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
