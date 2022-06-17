/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { fetchCharacters } from "../../../services/config/api_character";
import { CharacterTypes } from "../../../services/data-types";
import TableTextHeader from "../../atoms/TableTextHeader";
import TableTextRow from "../../atoms/TableTextRow";
import TextIcon from "../../atoms/TextIcon";
import LayoutHome from "../../molecules/LayoutHome";

export default function HomePage() {
  // characters
  const [characters, setCharacters] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);

  // pagination
  const [pagingData, setPagingData] = useState<{ number: number }[]>([]);
  const [startPagingIndex, setStartPagingIndex] = useState(0);
  const [endPagingIndex, setEndPagingIndex] = useState(10);
  const [totalPage, setTotalPage] = useState(1);

  const gett = useCallback(async () => {
    // init
    let i = 10;
    let totalPage;
    let numberPaging = [];

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

        const newPaging = numberPaging.slice(startPagingIndex, endPagingIndex);

        // set ke UI
        setPagingData(newPaging);
      }

      // set new Array
      const newArr = res.data.slice(startIndex, endIndex);

      // set to UI for Data Character
      setCharacters(newArr);

      // set to UI for Paging
      setTotalPage(totalPage);
    }
  }, [startPagingIndex, endPagingIndex, startIndex, endIndex]);

  const onThisPage = (e: number) => {
    const end = e * 10;
    const start = end - 10;

    setStartIndex(start);
    setEndIndex(end);
  };

  const onToBeginningPages = () => {
    // pagination
    setStartPagingIndex(0);
    setEndPagingIndex(10);

    // characters
    setStartIndex(0);
    setEndIndex(10);
  };

  const onToEndPages = () => {
    // pagination
    const pStart = totalPage - (totalPage % 10);
    const pEnd = totalPage;

    setStartPagingIndex(pStart);
    setEndPagingIndex(pEnd);

    // characters
    const end = totalPage * 10;
    const start = end - 10;

    setStartIndex(start);
    setEndIndex(end);
  };

  const onBackPage = () => {
    if (startPagingIndex == 0) return;

    // pagination
    setStartPagingIndex(startPagingIndex - 10);
    setEndPagingIndex(endPagingIndex - 10);

    // characters
    const start = (startPagingIndex - 10) * 10;
    const end = start + 10;
    setStartIndex(start);
    setEndIndex(end);
  };

  const onNextPage = () => {
    if (endPagingIndex > totalPage - (totalPage % 10)) return;

    // pagination
    setStartPagingIndex(startPagingIndex + 10);
    setEndPagingIndex(endPagingIndex + 10);

    // characters
    const start = endPagingIndex * 10;
    const end = start + 10;
    setStartIndex(start);
    setEndIndex(end);
  };

  // initial Load
  useEffect(() => {
    gett();
  }, [gett]);

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
                        {item.image == "" ? (
                          <Image
                            className="rounded-full h-10 w-10"
                            src={`https://ui-avatars.com/api/?name=${item.name}}&color=3498db&background=B2EBF2&size=80`}
                            alt="avatar"
                            width={40}
                            height={40}
                          ></Image>
                        ) : (
                          <Image
                            className="rounded-full h-10 w-10"
                            src={item.image}
                            alt="avatar"
                            width={40}
                            height={40}
                          ></Image>
                        )}
                      </td>
                      <td>
                        <TableTextRow lable={item.name} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-row gap-2 items-center justify-center my-2">
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

              {pagingData.map((item: any) => (
                <div key={item.number}>
                  <button
                    onClick={() => {
                      onThisPage(item.number);
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
