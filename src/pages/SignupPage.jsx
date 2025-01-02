import React from "react";
import SignupForm from "../components/auth/SignupForm";
import logo from "../assets/TravelSyncLogo.png";

export default function SignupPage() {
  return (
    <div className="page items-center justify-center">
      <img src={logo} alt="logo" className="h-24 mb-10" />
      <SignupForm />
    </div>
  );
}
