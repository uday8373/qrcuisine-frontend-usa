import CompleteMain from "@/containers/complete-page/Complete-Main";
import React from "react";

const page = () => {
  return (
    <main className="flex items-center justify-center w-full font-Rethink">
      <div className="w-full h-full flex-col max-w-screen-xl">
        <CompleteMain />
      </div>
    </main>
  );
};

export default page;
