import { useState } from "react";
import data from "./data.json";
import PureCanvas from "./components/PureCanvas";
import P5Canvas from "./components/P5Canvas";
import "./App.css";
import KonvaCanvas from "./components/KonvaCanvas";
import FabricCanvas from "./components/FabricCanvas"; // Import the FabricCanvas component

function App() {
  const [canvasType, setCanvasType] = useState("pure");

  return (
    <div className="app-container">
      <div className="button-container">
        <button onClick={() => setCanvasType("pure")}>Show Pure Canvas</button>
        <button onClick={() => setCanvasType("p5")}>Show P5 Canvas</button>
        <button onClick={() => setCanvasType("konva")}>Show Konva Canvas</button>
      </div>

      {/* Render the canvas based on the selected canvas type */}
      {canvasType === "pure" ? (
        <PureCanvas data={data} />
      ) : canvasType === "p5" ? (
        <P5Canvas data={data} />
      ) : (
        <KonvaCanvas data={data} />
      )}
    </div>
  );
}

export default App;
