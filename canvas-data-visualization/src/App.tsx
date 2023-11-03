import "./App.css";
import KonvaCanvas from "./components/KonvaCanvas";
import P5Canvas from "./components/P5Canvas";
import PureCanvas from "./components/PureCanvas";
import data from "./data.json";

function App() {

  return (
    <div className="app-container">
        <h1>Canvas Comparison</h1>
        <h2>Standard HTML5 canvas</h2>
        <PureCanvas data={data} />
        <h2>Konva canvas</h2>
        <KonvaCanvas data={data} />
        <h2>P5 canvas</h2>
        <P5Canvas data={data} />
    </div>
  );
}

export default App;
