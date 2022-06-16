import { randomBytes, randomInt, randomUUID } from "crypto";
import React, { useEffect, useState } from "react";
import { fetchCharacters } from "../../../services/config/api_character";
import { CharacterTypes } from "../../../services/data-types";
import TableTextHeader from "../../atoms/TableTextHeader";
import TableTextRow from "../../atoms/TableTextRow";
import LayoutHome from "../../molecules/LayoutHome";

export default function HomePage() {
  const [characters, setCharacters] = useState([]);

  const get = async () => {
    const res = await fetchCharacters();

    if (res?.statusCode == 200) {
      setCharacters(res.data);
    }
  };

  useEffect(() => {
    get();
  });

  return (
    <>
      <LayoutHome>
        <>
          <div className="overflow-auto">
            <table className="divide-y divide-gray-200 w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th>
                    <TableTextHeader lable="Nama" />
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {characters.map((item: CharacterTypes) => (
                  <tr key={item.name + item.alternate_names[0]}>
                    <td>
                      <TableTextRow lable={item.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      </LayoutHome>
    </>
  );
}
