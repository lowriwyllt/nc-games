import "./PixelLoader.css";

const PixelLoader = ({ loadingMessage }) => {
  return (
    <div className="pixelLoader">
      <p>{loadingMessage}</p>
      <div id="loader"></div>
    </div>
  );
};

export default PixelLoader;
