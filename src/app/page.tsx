"use client";
import { useState } from "react";
import Select from "react-select";
import { ViewDefinition, ViewResult } from "./utils/types";
import ViewContainer from "./components/ViewContainer";
import { toastError, toastSuccess } from "./components/toasts";
import { evaluateView } from "./utils/evaluateView";
import useViewDefinitions from "./db/hooks/useViewDefinitions";
import useFirstVisit from "./db/hooks/useFirstVisit";
import ViewSettingsModal from "./components/ViewSettingsModal";

interface State {
  fhirInput: string;
  inputIsFocused: boolean;
  selectedViewDef: ViewDefinition | undefined;
  usedViewDef: ViewDefinition | undefined;
  viewResult: ViewResult | undefined;
  showSettingsModal: boolean;
}

export default function Home() {
  const [state, setState] = useState<State>({
    fhirInput: "",
    inputIsFocused: false,
    selectedViewDef: undefined,
    usedViewDef: undefined,
    viewResult: undefined,
    showSettingsModal: false,
  });

  const {
    viewDefinitions,
    addViewDefinition,
    updateViewDefinition,
    loading,
    deleteViewDefinition,
  } = useViewDefinitions();

  useFirstVisit(); // sets the templates

  const handleInputChange = (evn: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, fhirInput: evn.target.value });
  };

  const handleChangeViewDef = (id: string) => {
    const viewDef = viewDefinitions.find((viewDef) => viewDef.id === id);
    if (!viewDef) return;
    setState({ ...state, selectedViewDef: viewDef });
  };

  const handleFileUpload = (evn: React.ChangeEvent<HTMLInputElement>) => {
    const files = evn.target.files;
    if (!files) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (evn) => {
      const result = evn.target?.result;
      if (!result) return;
      setState({ ...state, fhirInput: result.toString() });
    };
    reader.readAsText(file);
    toastSuccess("File uploaded.");
  };

  const handleDeleteViewDef = (id: string) => {
    deleteViewDefinition(id);
    setState({ ...state, selectedViewDef: undefined });
  };

  const handleClearViewResult = () => {
    setState({ ...state, viewResult: undefined, usedViewDef: undefined });
  };

  const handleUpdateViewDef = (newViewDef: ViewDefinition) => {
    updateViewDefinition(newViewDef);
  };

  const handleShowModal = () => {
    setState({ ...state, showSettingsModal: true });
  };

  const handleCloseModal = () => {
    setState({ ...state, showSettingsModal: false });
  };

  const handleCreateViewDef = (newViewDef: ViewDefinition) => {
    addViewDefinition(newViewDef);
    setState({ ...state, selectedViewDef: newViewDef });
  };

  const handleRun = () => {
    let jsonData;
    if (!state.selectedViewDef) {
      toastError("Please select a view definition.");
      return;
    }
    if (!state.fhirInput) {
      toastError("Please provide FHIR JSON-Data.");
      return;
    }
    try {
      jsonData = JSON.parse(state.fhirInput);
    } catch (error) {
      toastError("Invalid JSON-Data.");
      return;
    }
    const res = evaluateView(state.selectedViewDef, jsonData);
    if (!res) {
      return;
    }
    setState({
      ...state,
      viewResult: res,
      usedViewDef: { ...state.selectedViewDef },
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-full py-2 xl:px-32 gap-2">
      <div className="flex flex-col w-full gap-1">
        <div className="flex flex-row items-center">
          <span>Resource View Definition</span>
          <div className="flex-grow" />
          <button
            className="w-40 px-2 py-1 text-white bg-primary-color rounded-md transition hover:bg-secondary-color"
            onClick={handleShowModal}
          >
            Settings
          </button>
        </div>
        <div className="flex flex-row">
          <Select
            instanceId={"view-template-select"}
            className="flex-grow"
            onChange={(e) => handleChangeViewDef(e!.value)}
            value={
              state.selectedViewDef
                ? {
                    label: state.selectedViewDef.name,
                    value: state.selectedViewDef.id,
                  }
                : undefined
            }
            options={viewDefinitions.map((view) => {
              return {
                label: view.name,
                value: view.id,
              };
            })}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-end">
          <span>FHIR Input</span>
          <div className="flex-grow" />
          <div className="flex flex-row gap-4">
            <label
              className={`px-2 py-1 text-white bg-primary-color rounded-md cursor-pointer transition hover:bg-secondary-color`}
            >
              <input type="file" hidden onChange={handleFileUpload} />
              File Upload
            </label>
            <button
              className="px-2 py-1 text-white bg-confirm-button-color rounded-md cursor-pointer transition hover:bg-hover-confirm-button-color"
              onClick={handleRun}
            >
              Run
            </button>
          </div>
        </div>
        <textarea
          placeholder="Paste FHIR JSON-Data here..."
          className="rounded-md border h-56 overflow-scroll font-mono text-xs px-4 py-2"
          value={state.fhirInput}
          onChange={handleInputChange}
        />
      </div>
      <div>
        {state.viewResult && state.usedViewDef && (
          <ViewContainer
            handleShowModal={handleShowModal}
            handleClearViewResult={handleClearViewResult}
            viewDef={state.usedViewDef}
            viewResult={state.viewResult}
          />
        )}
      </div>
      {state.showSettingsModal && (
        <ViewSettingsModal
          handleChangeViewDef={handleChangeViewDef}
          handleDeleteViewDef={handleDeleteViewDef}
          handleCreateViewDef={handleCreateViewDef}
          handleCloseModal={handleCloseModal}
          showModal={state.showSettingsModal}
          viewDefs={viewDefinitions}
          viewDef={state.selectedViewDef}
          handleSave={handleUpdateViewDef}
        />
      )}
    </div>
  );
}
