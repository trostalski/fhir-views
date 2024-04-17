import BounceLoader from "react-spinners/BounceLoader";

const Spinner = () => {
  return (
    <div className="sweet-loading">
      <BounceLoader color={"#ff6347"} size={60} aria-label="Loading Spinner" />
    </div>
  );
};

export default Spinner;
