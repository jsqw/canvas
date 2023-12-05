import "./App.css";
import FabricCanvas from "./components/FabricCanvas";
import FabricPieChart from "./components/FabricPieChart";
import KonvaCanvas from "./components/KonvaCanvas";
import KonvaPieChart from "./components/KonvaPieChart";
import P5Canvas from "./components/P5Canvas";
import P5PieChart from "./components/P5PieChart";
import PureCanvas from "./components/PureCanvas";
import PurePieCanvas from "./components/PurePieCanvas";
import data from "./data.json";

function App() {
  return (
    <div className="app-container">
      <h1>Bar & line chart comparison</h1>
      <div>
        <h2>Standard HTML5 canvas</h2>
        <PureCanvas data={data} />
      </div>
      <div>
        <h2>Konva.js</h2>
        <KonvaCanvas data={data} />
      </div>

      <div>
        <h2>Fabric.js</h2>
        <FabricCanvas data={data} />
      </div>
      <div>
        <h2>P5.js</h2>
        <P5Canvas data={data} />
      </div>

      <h1>Pie chart comparison</h1>
      <div>
        <h2>Standard HTML5 canvas</h2>
        <PurePieCanvas />
      </div>
      <div>
        <h2>Konva.js</h2>
        <KonvaPieChart />
      </div>

      {/*<div> idk i couldn't get fabric to work :)
        <h2>Fabric.js</h2>
        <FabricPieChart />
  </div>*/}
      <div>
        <h2>P5.js</h2>
        <P5PieChart />
      </div>
    </div>
  );
}

export default App;
