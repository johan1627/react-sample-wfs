import React, { useState } from "react";
import LayoutSignIn from "../../molecules/LayoutSign/LayoutSignIn";
import InputFieldEmail from "../../atoms/InputFieldEmail";
import InputFieldPassword from "../../atoms/InputFieldPassword";
import BtnSign from "./BtnSign";
import { useRouter } from "next/router";
import Link from "next/link";
import PasswordStrengthText from "../../atoms/InputFieldPassword/PasswordStrengthText";
import Cookies from "js-cookie";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnDisabled, SetBtnDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [matchcredential, setMatchcredential] = useState("");

  const onSubmit = () => {
    // start loading
    SetBtnDisabled(true);
    setIsLoading(true);

    // get to local storage
    const getFromLocal = localStorage.getItem("tmp_credential");
    const parse = JSON.parse(getFromLocal!);
    const emailFromLocal = parse.email;
    const passFromLocal = parse.pass;

    // go home page
    if (email != emailFromLocal) {
      setMatchcredential("Email/password failed");
    } else if (password != passFromLocal) {
      setMatchcredential("Email/password failed");
    } else {
      const smpToken = "BQmpPkQ1pLt9SOlkJVOL1QWWrPpc0IZ8k3CXXZ03";
      Cookies.set("tmp-token", smpToken, { expires: 1 });
      router.push("/");
    }

    // end loading
    setIsLoading(false);
  };

  return (
    <>
      <LayoutSignIn>
        <div className="mt-0 xl:mt-20">
          <div className="px-8 md:px-4 lg:px-24 py-8">
            {/* Title */}
            <h2 className="text-lg font-semibold mb-4">Sign In </h2>

            {/* Email */}
            <div className="mb-4">
              <InputFieldEmail
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  if (password == "") {
                    SetBtnDisabled(true);
                  } else {
                    SetBtnDisabled(false);
                  }
                }}
              />
            </div>

            {/* Password */}
            <InputFieldPassword
              lable="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                //
                if (email == "") {
                  SetBtnDisabled(true);
                } else {
                  SetBtnDisabled(false);
                }
              }}
            />
            <PasswordStrengthText strength={matchcredential} />

            {/* Button */}
            <div className="mt-8">
              <BtnSign
                lable="Sign In"
                onClick={() => {
                  onSubmit();
                }}
                disable={btnDisabled}
                isLoading={isLoading}
              />
            </div>

            <Link href="/sign-up/">
              <p className="text-xs text-slate-500 text-center my-6 underline cursor-pointer">
                don`t have account? sign up
              </p>
            </Link>
          </div>
        </div>
      </LayoutSignIn>
    </>
  );
}
