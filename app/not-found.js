"use client";
import { Button, Link } from "@nextui-org/react";
import { ChevronLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found flex items-center justify-center w-full h-svh">
      <section className="w-full h-full flex flex-col max-w-screen-xl relative px-6 justify-center items-center gap-6">
        <h1 className="text-center font-bold text-7xl">404</h1>
        <h3 className="flex w-full justify-center items-center flex-col mb-3 font-medium text-center text-default-600 text-medium">
          <label>Oops, something went wrong.</label>
          <label>{`Sorry, we couldn't find your page.`}</label>
        </h3>
        <Button
          as={Link}
          href="/"
          color="primary"
          startContent={<ChevronLeft />}
        >
          Back to home
        </Button>
      </section>
    </main>
  );
}
