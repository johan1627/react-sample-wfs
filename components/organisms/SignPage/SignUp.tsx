import React, { useState } from "react";
import InputFieldEmail from "../../atoms/InputFieldEmail";
import InputFieldPassword from "../../atoms/InputFieldPassword";
import BtnSign from "./BtnSign";
import { useRouter } from "next/router";
import Link from "next/link";
import PasswordStrengthText from "../../atoms/InputFieldPassword/PasswordStrengthText";
import PasswordHelperText from "../../atoms/InputFieldPassword/PasswordHelperText";
import LayoutSignIn from "../../molecules/LayoutSign/LayoutSignIn";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [btnDisabled, SetBtnDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [emailValid, setEmailValid] = useState("");

  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");
  const [matchPassword, setMatchPassword] = useState("");

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

    // go sign in page
    router.push("/sign-in/");

    // end loading
    setIsLoading(false);
  };

  const onChangePassword = (e: any) => {
    // reset Value RePassword
    setRePassword("");

    // set Value Password
    setPassword(e.target.value);

    // Check Strength Password
    const score = strengthPassword(password);
    const passText = strengthPasswordText(score);
    if (passText != "Strong") {
      setPasswordHelper("combine upper/lower character, number, symbol");
    } else {
      setPasswordHelper("");
    }
    setPasswordStrength(passText);

    // Trigger Button
    if (email == "") {
      SetBtnDisabled(true);
    } else {
      if (password != e.target.value) {
        SetBtnDisabled(true);
      } else if (passwordStrength != "Strong") {
        SetBtnDisabled(true);
      } else {
        SetBtnDisabled(false);
      }
    }
  };

  const onChangeRePassword = (e: any) => {
    // set Value RePassword
    setRePassword(e.target.value);

    if (password != e.target.value) {
      setMatchPassword("Not Match");
    } else {
      setMatchPassword("Match");
    }

    // Trigger Button
    if (email == "") {
      SetBtnDisabled(true);
    } else {
      if (password != e.target.value) {
        SetBtnDisabled(true);
      } else if (passwordStrength != "Strong") {
        SetBtnDisabled(true);
      } else {
        SetBtnDisabled(false);
      }
    }
  };

  const strengthPassword = (password: string) => {
    let strength = 0;
    if (password.match(/[a-z]+/)) {
      strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (password.match(/[0-9]+/)) {
      strength += 1;
    }
    if (password.match(/[$@#&!]+/)) {
      strength += 1;
    }

    return strength;
  };

  const strengthPasswordText = (score: number) => {
    let value = "";

    if (score == 0) {
      value = "Very weak";
    } else if (score == 1) {
      value = "Very weak";
    } else if (score == 2) {
      value = "Weak";
    } else if (score == 3) {
      value = "Medium";
    } else {
      value = "Strong";
    }

    return value;
  };

  return (
    <>
      <LayoutSignIn>
        <div className="mt-0 xl:mt-20">
          <div className="px-8 md:px-4 lg:px-24 py-8">
            {/* Title */}
            <h2 className="text-lg font-semibold mb-4">Sign Up</h2>

            {/* Email */}
            <div className="mb-4">
              <InputFieldEmail
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  var pattern = new RegExp(
                    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
                  );
                  if (!pattern.test(email)) {
                    setEmailValid("Email not valid");
                  } else {
                    setEmailValid("");
                  }

                  if (password == "") {
                    SetBtnDisabled(true);
                  } else {
                    SetBtnDisabled(false);
                  }
                }}
              />
              <p className="text-xs text-end pt-1 text-red-500">{emailValid}</p>
            </div>

            {/* Password */}
            <div className="mb-4">
              <InputFieldPassword
                lable="Password"
                value={password}
                onChange={(e) => {
                  onChangePassword(e);
                }}
              />
              {/* Password indicator */}
              <div className="grid grid-cols-2">
                <PasswordHelperText lable={passwordHelper} />
                <PasswordStrengthText strength={passwordStrength} />
              </div>
            </div>

            {/* Reconfirm Password */}
            <InputFieldPassword
              lable="Reconfirm Password"
              value={repassword}
              onChange={(e) => {
                onChangeRePassword(e);
              }}
            />
            {/* RePassword indicator */}
            <div className="grid grid-cols-1">
              <PasswordStrengthText strength={matchPassword} />
            </div>

            {/* Button */}
            <div className="mt-8">
              <BtnSign
                lable="Sign Up"
                onClick={() => {
                  onSubmit();
                }}
                disable={btnDisabled}
                isLoading={isLoading}
              />
            </div>

            <Link href="/sign-in/">
              <p className="text-xs text-slate-500 text-center my-6 underline cursor-pointer">
                back to sign in
              </p>
            </Link>
          </div>
        </div>
      </LayoutSignIn>
    </>
  );
}
