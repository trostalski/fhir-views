import { useState, CSSProperties } from "react";
import BounceLoader from "react-spinners/BounceLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Spinner = () => {
  return (
    <div className="sweet-loading">
      <BounceLoader color={"#ff6347"} size={60} aria-label="Loading Spinner" />
    </div>
  );
};

export default Spinner;
