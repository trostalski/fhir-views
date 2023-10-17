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
    <div className="flex flex-col h-[90vh] pb-12 overflow-y-auto">
      <div className="flex items-center justify-between mb-4 px-4 md:px-6">
        <span className="text-gray-600 font-medium">
          {`Found ${viewResult.length} Entries`}
        </span>
        <div className="flex space-x-4">
          <button
            className="transition hover:text-primary-color focus:outline-none focus:ring-2 focus:ring-primary-color"
            onClick={handleShowModal}
            title="Edit View"
          >
            <IoSettingsOutline size={24} className="align-middle" />
          </button>
          <button
            onClick={() => handleExportClick(viewResult, viewDef.name)}
            className="transition hover:text-primary-color focus:outline-none focus:ring-2 focus:ring-primary-color"
            title="Export CSV"
          >
            <BiExport size={24} className="align-middle" />
          </button>
          <button
            className="transition hover:text-cancel-button-color focus:outline-none focus:ring-2 focus:ring-cancel-button-color"
            onClick={handleClearViewResult}
            title="Clear ViewResult"
          >
            <AiOutlineClose size={24} className="align-middle" />
          </button>
        </div>
      </div>
      <ViewTable viewResult={viewResult} viewDef={viewDef} />
    </div>
  );
};

export default ViewContainer;
