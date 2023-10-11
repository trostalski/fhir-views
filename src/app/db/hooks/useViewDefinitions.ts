import { ViewDefinition } from "@/app/utils/types";
import React, { useEffect, useState } from "react";
import { db } from "../db";

interface State {
  viewDefinitions: ViewDefinition[];
  loading?: boolean;
}

const useViewDefinitions = () => {
  const [state, setState] = useState<State>({
    viewDefinitions: [],
    loading: false,
  });

  useEffect(() => {
    setState({ ...state, loading: true });
    db.viewDefinitions.toArray().then((viewDefinitions) => {
      setState({ viewDefinitions });
    });
    setState({ ...state, loading: false });
  }, []);

  const deleteViewDefinition = (id: string) => {
    console.log("deleteViewDefinition", id);
    db.viewDefinitions.delete(id).then(() => {
      db.viewDefinitions.toArray().then((viewDefinitions) => {
        setState({ viewDefinitions });
      });
    });
  };

  const addViewDefinition = async (viewDefinition: ViewDefinition) => {
    await db.viewDefinitions.add(viewDefinition);
    const newViewDefinition = await db.viewDefinitions.toArray();
    setState({ viewDefinitions: newViewDefinition });
  };

  const addViewDefinitions = (viewDefinitions: ViewDefinition[]) => {
    db.viewDefinitions.bulkAdd(viewDefinitions).then(() => {
      db.viewDefinitions.toArray().then((viewDefinitions) => {
        setState({ viewDefinitions });
      });
    });
  };

  const updateViewDefinition = (viewDefinition: ViewDefinition) => {
    db.viewDefinitions.put(viewDefinition).then(() => {
      db.viewDefinitions.toArray().then((viewDefinitions) => {
        setState({ viewDefinitions });
      });
    });
  };

  const getViewDefinition = (id: string) => {
    return db.viewDefinitions.get(id);
  };

  return {
    viewDefinitions: state.viewDefinitions,
    loading: state.loading,
    deleteViewDefinition,
    addViewDefinition,
    addViewDefinitions,
    updateViewDefinition,
    getViewDefinition,
  };
};

export default useViewDefinitions;
