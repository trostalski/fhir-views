"use client";
import React, { use, useEffect, useState } from "react";
import ViewTable from "./ViewTable";
import { AiOutlineClose } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { BiExport } from "react-icons/bi";
import { ViewDefinition } from "../utils/types";
import { handleExportClick } from "../utils/utils";

export type ViewResult = any;

interface ViewContainerProps {
  viewDef: ViewDefinition;
  viewResult: ViewResult | undefined;
  handleClearViewResult: () => void;
  handleShowModal: () => void;
}

const ViewContainer = (props: ViewContainerProps) => {
  const { viewDef, viewResult, handleClearViewResult, handleShowModal } = props;

  return (
    <div className="flex flex-col h-[90vh] pb-12 overflow-scroll">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row w-full gap-4">
          <span className="font-bold">{"Result"}</span>
          <div className="flex-grow" />
          <button
            className="transition hover:text-primary-color"
            onClick={handleShowModal}
            title="Edit View"
          >
            <IoSettingsOutline size={20} />
          </button>
          <button
            onClick={() => handleExportClick(viewResult, viewDef.name)}
            className="transition hover:text-primary-color"
            title="Export CSV"
          >
            <BiExport size={20} />
          </button>
          <button
            className="transition hover:text-cancel-button-color"
            onClick={handleClearViewResult}
            title="Clear ViewResult"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
      </div>
      <ViewTable viewResult={viewResult} viewDef={viewDef} />
    </div>
  );
};

export default ViewContainer;
