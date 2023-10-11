"use client";
import { useState } from "react";
import Select from "react-select";
import { viewTemplates } from "./utils/viewTemplates";
import { ViewDefinition, ViewResult } from "./utils/types";
import ViewContainer from "./components/ViewContainer";
import { toastError } from "./components/toasts";
import { evaluateView } from "./utils/evaluateView";

interface State {
  fhirInput: string;
  inputIsFocused: boolean;
  selectedViewDef: ViewDefinition;
  usedViewDef: ViewDefinition | undefined;
  viewResult: ViewResult | undefined;
}

export default function Home() {
  const [state, setState] = useState<State>({
    fhirInput: "",
    inputIsFocused: false,
    selectedViewDef: viewTemplates[0],
    usedViewDef: undefined,
    viewResult: undefined,
  });

  const handleInputChange = (evn: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, fhirInput: evn.target.value });
  };

  const handleChangeViewDef = (id: string) => {
    const viewDef = viewTemplates.find((view) => view.id === id);
    if (!viewDef) return;
    setState({ ...state, selectedViewDef: viewDef });
  };

  const handleClearViewResult = () => {
    setState({ ...state, viewResult: undefined });
  };

  const handleRun = () => {
    let jsonData;
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
      toastError("Error evaluating view.");
      return;
    }
    setState({
      ...state,
      viewResult: res,
      usedViewDef: { ...state.selectedViewDef },
    });
  };

  return (
    <div className="flex flex-col h-full py-2 xl:px-32 gap-2">
      <div className="flex flex-col">
        <span>Resource View Definition</span>
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
            options={viewTemplates.map((view) => {
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
          <div className="flex flex-row gap-2">
            <label
              className={`px-2 py-1 text-white bg-primary-color rounded-md cursor-pointer transition hover:bg-secondary-color`}
            >
              <input type="file" hidden />
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
            viewDef={state.usedViewDef}
            viewResult={state.viewResult}
          />
        )}
      </div>
    </div>
  );
}
