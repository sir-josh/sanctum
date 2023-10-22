const Spinner = ({ load = false }) => {
  return (
    <div className="lds-ellipsis">
      <div className={`${load && "load"}`}></div>
      <div className={`${load && "load"}`}></div>
      <div className={`${load && "load"}`}></div>
      <div className={`${load && "load"}`}></div>
    </div>
  );
};
export default Spinner;
