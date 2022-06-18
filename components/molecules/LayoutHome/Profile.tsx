import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ItemMenuProfile from "./ItemMenuProfile";

export default function Profile() {
  const [email, setEmail] = useState("s");
  const router = useRouter();

  const getProfile = () => {
    const fromLocal = localStorage.getItem("tmp_credential");
    const profile = JSON.parse(fromLocal!);

    setEmail(profile.email);
  };

  const onSignOut = () => {
    //
    Cookies.remove("tmp-token");
    // localStorage.removeItem("tmp_credential");
    localStorage.removeItem("wfs-character");
    router.push("/");
  };

  const onAlert = () => {
    Swal.fire({
      title: "Sign Out?",
      text: "Ya, saya akan keluar aplikasi",
      showCancelButton: true,
      confirmButtonText: "Ya, Sign Out",
      confirmButtonColor: "#EF5350",
      cancelButtonText: "Nanti dulu",
    }).then((result) => {
      if (result.isConfirmed) {
        onSignOut();
      }
    });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <a
        onClick={() => {
          onAlert();
        }}
        className="mr-4 flex items-center relative cursor-pointer"
      >
        <p className="text-xs text-slate-600 px-2">hello, {email}</p>
        <Image
          className="rounded-full"
          objectFit="cover"
          src="https://ui-avatars.com/api/?name=profile&color=3498db&background=B2EBF2&size=80"
          alt="avatar"
          width={28}
          height={28}
        ></Image>
        {/* <div className=" bg-white w-56 drop-shadow-md rounded-md top-10 right-3 absolute">
          <div className="flex flex-col">
            <ItemMenuProfile
              onClick={() => {}}
              lable="profile"
              iconClassName="fa-solid fa-circle-user"
            />
            <ItemMenuProfile
              onClick={() => {}}
              lable="settings"
              iconClassName="fa-solid fa-wrench"
            />
            <hr></hr>
            <ItemMenuProfile
              onClick={() => {}}
              lable="sign out"
              iconClassName="fa-solid fa-right-from-bracket"
            />
          </div>
        </div> */}
      </a>
    </>
  );
}
