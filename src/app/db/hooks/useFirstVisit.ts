import React from "react";
import useViewDefinitions from "./useViewDefinitions";
import { viewTemplates } from "@/app/utils/viewTemplates";
import { toastInfo } from "@/app/components/toasts";

const useFirstVisit = () => {
  const { addViewDefinitions } = useViewDefinitions();

  React.useEffect(() => {
    const knownUser = localStorage.getItem("knownUser");
    if (!knownUser) {
      addViewDefinitions(viewTemplates);
      localStorage.setItem("knownUser", "true");
      toastInfo("Welcome to FHIR Views, addded the template Views!");
    }
  }, [addViewDefinitions]);

  return {};
};

export default useFirstVisit;
