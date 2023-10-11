"use client";
import React, { use, useEffect, useState } from "react";
import ViewTable from "./ViewTable";
import { AiOutlineClose, AiOutlineLineChart } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { BiExport } from "react-icons/bi";
import ViewSettingsModal from "./ViewSettingsModal";
import { ViewDefinition } from "../utils/types";
import Spinner from "./Spinner";
import { handleExportClick } from "../utils/utils";

export type ViewResult = any;

interface ViewContainerProps {
  viewDef: ViewDefinition;
  viewResult: ViewResult | undefined;
}

const ViewContainer = (props: ViewContainerProps) => {
  const { viewDef, viewResult } = props;
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col max-h-[90vh] pb-12">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row w-full gap-4">
          <span className="font-bold">{"Result"}</span>
          <div className="flex-grow" />
          <button className="transition hover:text-button-hover-color">
            <AiOutlineLineChart size={20} />
          </button>
          <button
            className="transition hover:text-button-hover-color"
            onClick={() => {}}
          >
            <IoSettingsOutline size={20} />
          </button>
          <button
            className="transition hover:text-accent-color"
            onClick={() => {}}
          >
            <AiOutlineClose size={20} />
          </button>
          <button onClick={() => handleExportClick(viewResult, viewDef.name)}>
            <BiExport size={20} />
          </button>
        </div>
      </div>
      <ViewTable viewResult={viewResult} viewDef={viewDef} />
      {/* <ViewSettingsModal
        setShowModal={setShowModal}
        showModal={showModal}
        viewDef={viewDef}
        setViewDefs={setViewDefs}
        handleSave={updateViewDef}
      /> */}
    </div>
  );
};

export default ViewContainer;
