import { useState } from "react";
import data from "./data.json";
import PureCanvas from "./components/PureCanvas";
import P5Canvas from "./components/P5Canvas";
import "./App.css";

function App() {
  const [canvasType, setCanvasType] = useState("pure");

  return (
    <div className="app-container">
      <div className="button-container">
        <button onClick={() => setCanvasType("pure")}>Show Pure Canvas</button>
        <button onClick={() => setCanvasType("p5")}>Show P5 Canvas</button>
      </div>

      {canvasType === "pure" ? (
        <PureCanvas data={data} />
      ) : (
        <P5Canvas data={data} />
      )}
    </div>
  );
}

export default App;
