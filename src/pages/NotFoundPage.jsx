import React from "react";
import NotFoundLottie from "../assets/lottie/NotFoundLottie";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="page justify-center items-center gap-10">
      <div className="h-[300px]">
        <NotFoundLottie />
      </div>
      <h1 className="text-xl font-bold">Page not found</h1>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        Click to return
      </Button>
    </div>
  );
}
