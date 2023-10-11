"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { RiAncientGateFill } from "react-icons/ri";

const TopBar = () => {
  const router = useRouter();
  return (
    <header
      id="hns-header"
      className="flex flex-row fixed left-0 top-0 w-full h-10 bg-primary-color items-center text-white font-light px-4 z-10"
    >
      <button
        className="transition hover:underline"
        onClick={() => router.push("/")}
      >
        <h1>Fhir Views</h1>
      </button>
      <span className="flex-grow"></span>
      <div className="flex flex-row gap-4">
        <a
          href="https://github.com/trostalski/fhir-views"
          target="_blank"
          className="transition hover:text-complementary-primary-color"
        >
          <AiFillGithub size={32} />
        </a>
        <a
          href="https://healthnerd.solutions"
          target="_blank"
          className="transition hover:text-complementary-primary-color"
        >
          <RiAncientGateFill size={32} />
        </a>
      </div>
    </header>
  );
};

export default TopBar;
