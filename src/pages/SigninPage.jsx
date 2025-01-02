import React from "react";
import SigninForm from "../components/auth/signinform";
import logo from "../assets/TravelSyncLogo.png";

export default function SigninPage() {
  return (
    <div className="page items-center justify-center">
      <img src={logo} alt="logo" className="h-24 mb-10" />
      <SigninForm />
    </div>
  );
}
