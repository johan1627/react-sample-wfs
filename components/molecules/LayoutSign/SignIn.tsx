import React from "react";
import LayoutSignIn from "./LayoutSignIn";
import InputFieldEmail from "../../atoms/InputFieldEmail";
import InputFieldPassword from "../../atoms/InputFieldPassword";

export default function SignIn() {
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
                value=""
                onChange={(e) => {
                  //   setEmail(e.target.value);
                  //
                  //   if (password == "") {
                  //     SetBtnDisabled(true);
                  //   } else {
                  //     SetBtnDisabled(false);
                  //   }
                }}
              />
            </div>

            {/* Password */}
            <InputFieldPassword
              value=""
              //   value={password}
              onChange={(e) => {
                //   setPassword(e.target.value);
                //   //
                //   if (email == "") {
                //     SetBtnDisabled(true);
                //   } else {
                //     SetBtnDisabled(false);
                //   }
              }}
            />

            {/* Button */}
            <div className="mt-8">
              <button>submit</button>
              {/* <ButtonSignIn
                lable="Masuk"
                onClick={() => {
                  onSubmit();
                }}
                disable={btnDisabled}
                isLoading={isLoading}
              /> */}
            </div>
          </div>
        </div>
      </LayoutSignIn>
    </>
  );
}
