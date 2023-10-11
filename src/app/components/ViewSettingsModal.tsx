import ModalWrapper from "@/app/components/ModalWrapper";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { ViewDefinition } from "../utils/types";
import { emptyViewDef } from "../utils/viewTemplates";
import { resourceTypeList } from "../utils/constants";
import { getUniqueId } from "../utils/utils";
import { toastSuccess } from "./toasts";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ViewSettingsModalProps {
  showModal: boolean;
  viewDef: ViewDefinition | undefined;
  viewDefs: ViewDefinition[];
  handleChangeViewDef: (id: string) => void;
  handleSave: (newViewDef: ViewDefinition) => void;
  handleCloseModal: () => void;
  handleCreateViewDef: (newViewDef: ViewDefinition) => void;
  handleDeleteViewDef: (id: string) => void;
}

const ViewSettingsModal = (props: ViewSettingsModalProps) => {
  const {
    viewDefs,
    handleCloseModal,
    showModal,
    viewDef: initViewDef,
    handleSave,
    handleDeleteViewDef,
    handleCreateViewDef,
  } = props;

  const [viewDef, setViewDef] = useState<ViewDefinition | undefined>(
    initViewDef
  );

  useEffect(() => {
    if (initViewDef) {
      setViewDef({ ...initViewDef });
    } else if (viewDefs.length > 0) {
      setViewDef(viewDefs[0]);
    } else {
      setViewDef({ ...emptyViewDef });
    }
  }, [initViewDef, viewDefs]);

  if (!viewDef) return <div />;

  // styles
  const inputStyle = "border border-gray-300 rounded-md px-2 py-1";

  const addSelect = () => {
    const newViewDef = { ...viewDef };
    newViewDef.select.push({ path: "", alias: "" });
    setViewDef(newViewDef);
  };

  const addWhere = () => {
    const newViewDef = { ...viewDef };
    if (!newViewDef.where) newViewDef.where = [];
    newViewDef.where.push({ path: "" });
    setViewDef(newViewDef);
  };

  const deleteSelect = (index: number) => {
    const newViewDef = { ...viewDef };
    newViewDef.select.splice(index, 1);
    setViewDef(newViewDef);
  };

  const deleteWhere = (index: number) => {
    const newViewDef = { ...viewDef };
    if (newViewDef.where) newViewDef.where.splice(index, 1);
    setViewDef(newViewDef);
  };

  const updateSelect = (index: number, path: string, alias: string) => {
    const newViewDef = { ...viewDef };
    newViewDef.select[index].path = path;
    newViewDef.select[index].alias = alias;
    setViewDef(newViewDef);
  };

  const updateWhere = (index: number, path: string) => {
    const newViewDef = { ...viewDef };
    if (newViewDef.where) newViewDef.where[index].path = path;
    setViewDef(newViewDef);
  };

  return (
    <ModalWrapper
      handleCloseModal={handleCloseModal}
      showModal={showModal}
      modalHeight="h-[90vh]"
    >
      <div className="flex flex-col h-full px-4 py-2 overflow-scroll gap-2">
        <div className="flex flex-row justify-between items-center">
          <span className="text-2xl font-bold">View Definition Settings</span>
          <div className="flex flex-row gap-1">
            <select
              className="border border-gray-300 rounded-md px-2 py-1"
              placeholder="Select View Definition"
              value={viewDef.name}
              onChange={(e) =>
                setViewDef(
                  viewDefs.find((vd) => vd.name === e.target.value) ||
                    emptyViewDef
                )
              }
            >
              {viewDefs.map((vd) => (
                <option key={vd.id} value={vd.name}>
                  {vd.name}
                </option>
              ))}
            </select>
            <button
              className="
              flex flex-row items-center gap-2
              px-2 py-1 bg-complementary-primary-color rounded-md text-white transition hover:bg-complementary-secondary-color
            "
              onClick={() => {
                const newViewDef = {
                  ...emptyViewDef,
                  id: getUniqueId(),
                  name: "New View Definition",
                };
                handleCreateViewDef(newViewDef);
                toastSuccess("New View Definition created!");
              }}
            >
              Create New <MdAdd size={20} />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-full gap-1">
            <div className="flex flex-row">
              <span className="text-xl w-full rounded-md text-primary-color font-bold">
                General
              </span>
            </div>
            <div className="flex flex-row w-full gap-4">
              <div className="flex flex-col w-1/2">
                <label className="text-xs text-gray-400">Resource Type</label>
                <select
                  className={inputStyle}
                  value={viewDef.resource}
                  onChange={(e) =>
                    setViewDef({ ...viewDef, resource: e.target.value })
                  }
                >
                  {resourceTypeList.map((resourceType) => (
                    <option key={resourceType} value={resourceType}>
                      {resourceType}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-1/2">
                <label className="text-xs text-gray-400">Name</label>
                <input
                  type="text"
                  className={inputStyle}
                  value={viewDef.name}
                  onChange={(e) =>
                    setViewDef({ ...viewDef, name: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-1">
            <div className="flex flex-row">
              <span className="text-xl text-primary-color font-bold">
                Select Statements
              </span>
              <div className="flex-grow" />
              <button
                className="bg-primary-color px-2 py-1 rounded-md text-white transition hover:bg-secondary-color"
                onClick={addSelect}
              >
                Add Select Statement
              </button>
            </div>
            <div className="grid grid-cols-12 content-between gap-x-4 gap-y-2">
              <div className="flex items-center col-span-6">
                <span className="text-xs text-gray-400">Path</span>
              </div>
              <div className="flex items-center col-span-5">
                <span className="text-xs text-gray-400">Alias</span>
              </div>
              <div className="flex items-center justify-center col-span-1">
                <span className="text-xs text-gray-400 col-span-1">Remove</span>
              </div>
              {viewDef.select.map((select, index) => (
                <Fragment key={index}>
                  <input
                    type="text"
                    className={inputStyle + " col-span-6"}
                    value={select.path}
                    onChange={(e) =>
                      updateSelect(index, e.target.value, select.alias || "")
                    }
                  />
                  <input
                    type="text"
                    className={inputStyle + " col-span-5"}
                    value={select.alias}
                    onChange={(e) =>
                      updateSelect(index, select.path, e.target.value)
                    }
                  />
                  <div className="flex items-center justify-center col-span-1">
                    <button
                      className="text-gray-400 transition hover:text-cancel-button-color"
                      onClick={() => deleteSelect(index)}
                    >
                      <AiOutlineClose size={24} />
                    </button>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full gap-1">
            <div className="flex flex-row gap-2">
              <span className="text-xl text-primary-color font-bold">
                Where Statements
              </span>
              <div className="flex-grow" />
              <button
                className="bg-primary-color px-2 py-1 rounded-md text-white transition hover:bg-secondary-color"
                onClick={addWhere}
              >
                Add Where Statement
              </button>
            </div>
            <div className="grid grid-cols-12 content-between gap-x-4 gap-y-2">
              <div className="flex items-center col-span-11">
                <span className="text-xs text-gray-400">Path</span>
              </div>
              <div className="flex items-center justify-center col-span-1">
                <span className="text-xs text-gray-400 col-span-1">Remove</span>
              </div>
              {viewDef.where &&
                viewDef.where.map((where, index) => (
                  <Fragment key={index}>
                    <input
                      type="text"
                      className={inputStyle + " col-span-11"}
                      value={where.path}
                      onChange={(e) => updateWhere(index, e.target.value)}
                    />
                    <div className="flex items-center justify-center col-span-1">
                      <button
                        className="text-gray-400 transition hover:text-cancel-button-color"
                        onClick={() => deleteWhere(index)}
                      >
                        <AiOutlineClose size={24} />
                      </button>
                    </div>
                  </Fragment>
                ))}
            </div>
          </div>
        </div>
        <div className="flex-grow" />
        <div className="flex flex-row gap-4 mt-4">
          <button
            className="px-2 py-1 border-2 text-cancel-button-color border-cancel-button-color rounded-md transition hover:bg-cancel-button-color hover:text-white"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete this View Definition?"
                )
              ) {
                handleDeleteViewDef(viewDef.id);
                toastSuccess("View Definition deleted!");
              }
            }}
          >
            <RiDeleteBin6Line size={20} />
          </button>
          <div className="flex-grow" />
          <button
            className="px-2 py-1 bg-cancel-button-color rounded-md text-white transition hover:bg-hover-cancel-button-color"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            className="px-2 py-1 bg-confirm-button-color rounded-md text-white transition hover:bg-hover-confirm-button-color"
            onClick={() => {
              handleSave(viewDef);
              toastSuccess("View Definition saved!");
              handleCloseModal();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ViewSettingsModal;
