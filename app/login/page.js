import LoginMain from "@/containers/login-page/Login-Main";
import React from "react";

const page = () => {
  return (
    <main className="flex items-center justify-center w-full font-Rethink">
      <div className="w-full h-full flex-col max-w-screen-xl">
        <LoginMain />
      </div>
    </main>
  );
};

export default page;
