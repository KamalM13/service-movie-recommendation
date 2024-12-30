import "./Loading.css"
export default function Loading ({withTitle = true}) {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      {withTitle && <p className=""> Loading...</p>}
    </div>
  );
};

