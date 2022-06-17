import React, { useEffect, useState } from "react";
import { fetchCharacters } from "../../../services/config/api_character";
import { CharacterTypes } from "../../../services/data-types";
import TableTextHeader from "../../atoms/TableTextHeader";
import TableTextRow from "../../atoms/TableTextRow";
import TextIcon from "../../atoms/TextIcon";
import LayoutHome from "../../molecules/LayoutHome";

export default function HomePage() {
  const [characters, setCharacters] = useState([]);
  const [paging, setPaging] = useState<{ number: number }[]>([]);
  const [currentPages, setCurrentPages] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const get = async (curPages: number) => {
    // init
    let i = 10;
    let totalPage;
    let numberPaging = [];

    let startIndex = 0;
    let endIndex = 0;

    const res = await fetchCharacters();

    if (res?.statusCode == 200) {
      const length = res.data.length;
      totalPage = Math.ceil(length / i);

      // set new Object for paging
      for (let start = 1; start <= totalPage; start++) {
        const newPag = {
          number: start,
        };
        numberPaging.push(newPag);
        const newPaging = numberPaging.slice(0, 10);

        // console.log(newPaging);
        setPaging(newPaging);
      }

      // set new Array
      endIndex = curPages * i;
      startIndex = endIndex - i;

      const newArr = res.data.slice(startIndex, endIndex);

      // set to UI for Data Character
      setCharacters(newArr);

      // set to UI for Paging
      setTotalPage(totalPage);
    }
  };

  const onToBeginningPages = () => {
    setCurrentPages(1);
    get(1);
  };

  const onToEndPages = () => {
    setCurrentPages(totalPage);
    get(totalPage);
  };

  const onBackPage = () => {
    if (currentPages == 1) return;

    setCurrentPages(currentPages - 1);
    get(currentPages - 1);
  };

  const onNextPage = () => {
    if (currentPages == totalPage) return;

    setCurrentPages(currentPages + 1);
    get(currentPages + 1);
  };

  // initial Load
  useEffect(() => {
    get(currentPages);
  }, [currentPages]);

  return (
    <>
      <LayoutHome>
        <>
          <div className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg">
            {/* table */}
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

            <div className="flex flex-row gap-2 items-center">
              <TextIcon
                onClick={() => {
                  onToBeginningPages();
                }}
              >
                <i className="fa-solid fa-angles-left hover:underline"></i>
              </TextIcon>

              <TextIcon
                onClick={() => {
                  onBackPage();
                }}
              >
                <i className="fa-solid fa-angle-left hover:underline"></i>
              </TextIcon>

              {paging.map((item: any) => (
                <div key={item.number}>
                  <button
                    onClick={() => {
                      // console.log(item.number);
                      setCurrentPages(item.number);
                    }}
                  >
                    <p className="px-2 py-1 text-slate-600 text-sm cursor-pointer hover:underline">
                      {item.number}
                    </p>
                  </button>
                </div>
              ))}

              <TextIcon
                onClick={() => {
                  onNextPage();
                }}
              >
                <i className="fa-solid fa-angle-right hover:underline"></i>
              </TextIcon>

              <TextIcon
                onClick={() => {
                  onToEndPages();
                }}
              >
                <i className="fa-solid fa-angles-right hover:underline"></i>
              </TextIcon>
            </div>
          </div>
        </>
      </LayoutHome>
    </>
  );
}
