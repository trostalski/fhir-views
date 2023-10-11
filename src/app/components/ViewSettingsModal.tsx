"use client";
import ModalWrapper from "@/app/components/ModalWrapper";
import React, { Fragment, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { ViewDefinition } from "../utils/types";
import { viewTemplates } from "../utils/viewTemplates";

interface ViewSettingsModalProps {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
  viewDef: ViewDefinition;
  setViewDefs: React.Dispatch<React.SetStateAction<ViewDefinition[]>>;
  handleSave: (newViewDef: ViewDefinition) => void;
}

const ViewSettingsModal = (props: ViewSettingsModalProps) => {
  const { setShowModal, showModal, viewDef: initViewDef, handleSave } = props;
  const [viewDef, setViewDef] = useState<ViewDefinition>(initViewDef);

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
    newViewDef.where?.splice(index, 1);
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
    newViewDef.where![index].path = path;
    setViewDef(newViewDef);
  };

  return (
    <ModalWrapper
      setShowModal={setShowModal}
      showModal={showModal}
      modalHeight="h-[72vh]"
    >
      <div className="flex flex-col h-full px-4 py-2 overflow-scroll gap-2">
        <div className="flex flex-row justify-between">
          <span className="text-2xl font-bold">View Settings</span>
          <select
            className="border border-gray-300 rounded-md px-2 py-1"
            placeholder="Template"
            onChange={(e) =>
              setViewDef(
                viewTemplates.find(
                  (template) => template.name === e.target.value
                )!
              )
            }
          >
            {viewTemplates.map((template) => (
              <option key={template.id} value={template.name}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row w-full gap-4">
          <div className="flex flex-col">
            <label className="text-xs text-gray-400">Resource Type</label>
            <input
              type="text"
              className={inputStyle}
              value={viewDef.resource}
              onChange={(e) =>
                setViewDef({ ...viewDef, resource: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-400">Name</label>
            <input
              type="text"
              className={inputStyle}
              value={viewDef.name}
              onChange={(e) => setViewDef({ ...viewDef, name: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <span className="text-xl">Select</span>
            <button
              className="text-dark-primary-color transition hover:scale-110"
              onClick={addSelect}
            >
              <MdAdd size={28} />
            </button>
          </div>
          <div className="grid grid-cols-12 content-between gap-x-4 gap-y-2">
            <div className="flex items-center col-span-5">
              <span className="text-xs text-gray-400">Path</span>
            </div>
            <div className="flex items-center col-span-5">
              <span className="text-xs text-gray-400">Alias</span>
            </div>
            <div className="flex items-center justify-center col-span-1">
              <span className="text-xs text-gray-400 col-span-1">Display</span>
            </div>
            <div className="flex items-center justify-center col-span-1">
              <span className="text-xs text-gray-400 col-span-1">Delete</span>
            </div>
            {viewDef.select.map((select, index) => (
              <Fragment key={index}>
                <input
                  type="text"
                  className={inputStyle + " col-span-5"}
                  value={select.path}
                  onChange={(e) =>
                    updateSelect(
                      viewDef.select.indexOf(select),
                      e.target.value,
                      select.alias || ""
                    )
                  }
                />
                <input
                  type="text"
                  className={inputStyle + " col-span-5"}
                  value={select.alias}
                  onChange={(e) =>
                    updateSelect(
                      viewDef.select.indexOf(select),
                      select.path,
                      e.target.value
                    )
                  }
                />
                <div className="flex items-center justify-center col-span-1">
                  <input
                    type="checkbox"
                    className="text-gray-400 col-span-1 h-6 w-6"
                    checked={true}
                    onChange={() => {}}
                  />
                </div>
                <div className="flex items-center justify-center col-span-1">
                  <button
                    className="text-gray-400 transition hover:text-accent-color"
                    onClick={() => deleteSelect(viewDef.select.indexOf(select))}
                  >
                    <AiOutlineClose size={24} />
                  </button>
                </div>
              </Fragment>
            ))}
          </div>
          <div>
            <div className="flex flex-row gap-2">
              <span className="text-xl">Where</span>
              <button
                className="text-dark-primary-color transition hover:scale-110"
                onClick={addWhere}
              >
                <MdAdd size={28} />
              </button>
            </div>
            <div className="grid grid-cols-12 content-between gap-x-4 gap-y-2">
              <div className="flex items-center col-span-10">
                <span className="text-xs text-gray-400">Path</span>
              </div>
              <div className="flex items-center justify-center col-span-2">
                <span className="text-xs text-gray-400 col-span-1">Delete</span>
              </div>
              {viewDef.where &&
                viewDef.where.map((where, index) => (
                  <Fragment key={index}>
                    <input
                      type="text"
                      className={inputStyle + " col-span-10"}
                      value={where.path}
                      onChange={(e) =>
                        updateWhere(
                          viewDef.where!.indexOf(where),
                          e.target.value
                        )
                      }
                    />
                    <div className="flex items-center justify-center col-span-2">
                      <button
                        className="text-gray-400 transition hover:text-accent-color"
                        onClick={() =>
                          deleteWhere(viewDef.where!.indexOf(where))
                        }
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
        <div className="flex flex-row gap-4 justify-end mt-4">
          <button
            className="text-accent-color transition hover:text-accent-color-hover"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="text-primary-color transition hover:text-button-hover-color"
            onClick={() => {
              handleSave(viewDef);
              setShowModal(false);
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
