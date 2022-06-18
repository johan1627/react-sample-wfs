/* eslint-disable @next/next/no-img-element */
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { fetchCharacters } from "../../../services/config/api_character";
import { CharacterTypes } from "../../../services/data-types";
import TableTextHeader from "../../atoms/TableTextHeader";
import TableTextRow from "../../atoms/TableTextRow";
import TextIcon from "../../atoms/TextIcon";
import LayoutHome from "../../molecules/LayoutHome";

export default function HomePage() {
  // cookies
  const coo = Cookies.get("numberOfCharacterList");
  let endd;
  if (coo == undefined) {
    endd = 10;
  } else {
    endd = coo;
  }

  // number of data, each page
  const [numOfCharacterListo, setNumOfCharacterList] = useState(10);

  // characters
  const [characters, setCharacters] = useState<any[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(endd);
  const [charactersAll, setCharactersAll] = useState<any[]>([]);

  // pagination
  const [pagingData, setPagingData] = useState<{ number: number }[]>([]);
  const [startPagingIndex, setStartPagingIndex] = useState(0);
  const [endPagingIndex, setEndPagingIndex] = useState(10);
  const [totalPage, setTotalPage] = useState(1);

  // arrow
  const [disableArrowRight, setDisableArrowRight] = useState(false);
  const [disableArrowLeft, setDisableArrowLeft] = useState(false);

  // sorting
  const [isSorting, setIsSorting] = useState("ASC");

  const enTotalPages = async (numverOfList: number) => {
    const res = await fetchCharacters();

    let i = numverOfList;
    let totalPages;
    if (res?.statusCode == 200) {
      const length = res.data.length;
      totalPages = Math.ceil(length / i);

      // hidden arrow
      if (totalPages < 10) {
        setDisableArrowRight(true);
        setDisableArrowLeft(true);
      } else {
        setDisableArrowRight(false);
        setDisableArrowLeft(false);
      }
    }

    return totalPages;
  };

  const gett = useCallback(async () => {
    // setIsLoading(true);
    // init
    let i = numOfCharacterListo;
    const n = Cookies.get("numberOfCharacterList");

    if (n == undefined) {
      i = numOfCharacterListo;
    } else {
      i = parseInt(n);
      setNumOfCharacterList(i);
    }

    let totalPage;
    let numberPaging = [];

    const res = await fetchCharacters();

    if (res?.statusCode == 200) {
      const length = res.data.length;
      totalPage = Math.ceil(length / i);

      // hidden arrow
      if (endPagingIndex == 10) {
        setDisableArrowLeft(true);
      } else {
        setDisableArrowLeft(false);
      }

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

      // sorting
      const sortResult = onSorting(res.data, isSorting);

      // set new Array
      const newArr = sortResult.slice(startIndex, endIndex);

      // set to UI for Data Character
      setCharacters(newArr);
      setCharactersAll(res.data);

      // set to UI for Paging
      setTotalPage(totalPage);

      // setIsLoading(false);
    }
  }, [
    isSorting,
    startPagingIndex,
    endPagingIndex,
    startIndex,
    endIndex,
    numOfCharacterListo,
  ]);

  const onThisPage = (e: number) => {
    const co = Cookies.get("numberOfCharacterList");
    const end = e * parseInt(co!);
    const start = end - parseInt(co!);

    setStartIndex(start);
    setEndIndex(end);
  };

  const onToBeginningPages = () => {
    // pagination
    setStartPagingIndex(0);
    setEndPagingIndex(10);

    // characters
    const co = Cookies.get("numberOfCharacterList");

    setStartIndex(0);
    setEndIndex(parseInt(co!));
  };

  const onToEndPages = () => {
    // pagination
    const pStart = totalPage - (totalPage % 10);
    const pEnd = totalPage;

    setStartPagingIndex(pStart);
    setEndPagingIndex(pEnd);

    // characters
    const co = Cookies.get("numberOfCharacterList");

    const end = totalPage * parseInt(co!);
    const start = end - parseInt(co!);

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

  const onCharacterDetail = (e: CharacterTypes) => {
    localStorage.setItem("wfs-character", JSON.stringify(e));
  };

  const onChangedDataList = (e: any) => {
    const v = e.target.value;
    setNumOfCharacterList(v);
    // save to cookies as profiler-user
    Cookies.set("numberOfCharacterList", v, { expires: 30 });

    setStartIndex(0);
    setEndIndex(v);

    enTotalPages(v);
  };

  const onSearch = (e: string) => {
    const search = charactersAll.find(
      (item) => item.name.toLowerCase() === e.toLowerCase()
    );

    if (e == "") {
      setCharacters(charactersAll.slice(0, numOfCharacterListo));
    }

    if (search) {
      setCharacters([search]);
    }
  };

  const onSorting = (data: any, is: string) => {
    function compare(a: any, b: any) {
      if (is == "ASC") {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      } else if (is == "DESC") {
        if (b.name < a.name) {
          return -1;
        }
        if (b.name > a.name) {
          return 1;
        }
        return 0;
      }
    }
    const sort = data.sort(compare);

    return sort;
  };

  const onToggleSort = () => {
    if (isSorting == "ASC") {
      setIsSorting("DESC");
    } else {
      setIsSorting("ASC");
    }
  };

  // initial Load
  useEffect(() => {
    gett();
  }, [gett]);

  return (
    <>
      <LayoutHome>
        <>
          <div className="py-2">
            <input
              onChange={(e) => {
                const v = e.target.value;
                onSearch(v);
              }}
              className="px-2 text-slate-700 text-sm bg-white w-1/3 h-10 drop-shadow-sm rounded-md placeholder:text-xs placeholder:px-2"
              placeholder="search name..."
            ></input>
          </div>
          {/* Grid */}
          <div className=" bg-white rounded-lg shadow-md hover:shadow-lg h-3/4 overflow-auto">
            {/* table */}
            <div className="">
              <table className="divide-y divide-gray-200 w-full">
                <thead className="bg-blue-100 sticky top-0 z-10">
                  <tr>
                    <th>
                      <div className="flex items-center">
                        <TableTextHeader lable="Name" />
                        <a
                          onClick={() => {
                            onToggleSort();
                          }}
                        >
                          {isSorting == "ASC" ? (
                            <i className="fa-solid fa-arrow-up text-xs text-slate-500 cursor-pointer"></i>
                          ) : (
                            <i className="fa-solid fa-arrow-down text-xs text-slate-500 cursor-pointer"></i>
                          )}
                        </a>
                      </div>
                    </th>

                    <th>
                      <TableTextHeader lable="Species" />
                    </th>
                    <th>
                      <TableTextHeader lable="Gender" />
                    </th>

                    <th>
                      <TableTextHeader lable="House" />
                    </th>

                    <th>
                      <TableTextHeader lable="DateOfBirth" />
                    </th>

                    <th>
                      <TableTextHeader lable="Ancestry" />
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {characters.map((item: CharacterTypes) => (
                    <tr key={item.name + item.alternate_names[0]}>
                      <td>
                        <div className="flex items-center justify-start py-2 ml-4">
                          {item.image == "" ? (
                            <div>
                              <Image
                                className="rounded-full h-10 w-10 block"
                                src={`https://ui-avatars.com/api/?name=${item.name}}&color=3498db&background=B2EBF2&size=80`}
                                alt="avatar"
                                width={40}
                                height={40}
                              ></Image>
                            </div>
                          ) : (
                            <div>
                              <Image
                                className="rounded-full h-10 w-10 block"
                                src={item.image}
                                objectFit="cover"
                                alt="avatar"
                                width={40}
                                height={40}
                              ></Image>
                            </div>
                          )}

                          <Link href="/character/">
                            <button
                              onClick={() => {
                                onCharacterDetail(item);
                              }}
                              className="cursor-pointer hover:underline font-medium text-sky-700 px-6 py-4 text-xs"
                            >
                              {item.name}
                            </button>
                          </Link>
                        </div>
                      </td>

                      <td>
                        <TableTextRow lable={item.species} />
                      </td>
                      <td>
                        <TableTextRow lable={item.gender} />
                      </td>
                      <td>
                        <TableTextRow lable={item.house} />
                      </td>
                      <td>
                        <TableTextRow lable={item.dateOfBirth} />
                      </td>
                      <td>
                        <TableTextRow lable={item.ancestry} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-row gap-2 items-center justify-end my-2 mx-4">
            {disableArrowLeft ? (
              <></>
            ) : (
              <>
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
              </>
            )}

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

            {disableArrowRight ? (
              <></>
            ) : (
              <>
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
              </>
            )}

            <select
              className="text-xs px-2 rounded-md drop-shadow"
              value={numOfCharacterListo}
              onChange={(e) => {
                onChangedDataList(e);
              }}
            >
              <option>5</option>
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>75</option>
              <option>100</option>
            </select>
          </div>
        </>
      </LayoutHome>
    </>
  );
}
