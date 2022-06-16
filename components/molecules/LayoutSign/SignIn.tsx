import React, { useState } from "react";
import LayoutSignIn from "./LayoutSignIn";
import InputFieldEmail from "../../atoms/InputFieldEmail";
import InputFieldPassword from "../../atoms/InputFieldPassword";
import BtnSign from "./BtnSign";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnDisabled, SetBtnDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    // start loading
    SetBtnDisabled(true);
    setIsLoading(true);

    // save to local storage
    const tmp = {
      email: email,
      pass: password,
    };
    localStorage.setItem("tmp_credential", JSON.stringify(tmp));

    // go home page
    router.push("/");

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
              <p className="text-xs text-slate-500 text-center py-6 underline cursor-pointer">
                don`t have account? sign up
              </p>
            </Link>
          </div>
        </div>
      </LayoutSignIn>
    </>
  );
}