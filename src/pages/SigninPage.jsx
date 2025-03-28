import React from "react";
import SigninForm from "../components/auth/SigninForm";
import logo from "../assets/TravelSyncLogo.png";

export default function SigninPage() {
  return (
    <div className="page items-center justify-center">
      <img src={logo} alt="logo" className="h-16 mb-10" />
      <SigninForm />
    </div>
  );
}
