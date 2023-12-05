import React from "react";
import { Stage, Layer, Group, Text, Arc, Rect } from "react-konva";

interface Data {
  [key: string]: number;
}

const KonvaPieChart: React.FC = () => {
  const data: Data = {
    "Web Browser": 2.5,
    "Email Client": 1.2,
    "Text Editor": 0.8,
    "Database Server": 2.0,
    "Media Player": 1.0,
    "File Manager": 0.5,
    "Terminal Emulator": 0.7,
    "Graphics Editor": 1.3,
  };

  const colors = Object.keys(data).map(() => getRandomColor());
  const total = Object.values(data).reduce((acc, value) => acc + value, 0);

  let startAngle = 0;
  const pieChartComponents = Object.keys(data).map((key, index) => {
    const value = data[key];
    const angle = (value / total) * 360;
    const arc = (
      <Arc
        key={key}
        x={300}
        y={250}
        innerRadius={100}
        outerRadius={200}
        angle={angle}
        fill={colors[index]}
        rotation={startAngle}
      />
    );

    startAngle += angle;
    return arc;
  });

  const legendComponents = Object.keys(data).map((key, index) => (
    <Group key={key} y={index * 25 + 20}>
      <Rect width={20} height={20} fill={colors[index]} />
      <Text x={25} y={5} text={key} fontSize={15} />
    </Group>
  ));

  return (
    <Stage style={{ border: "1px solid black" }} width={800} height={600}>
      <Layer>
        {pieChartComponents}
        <Group x={550} y={50}>
          {legendComponents}
        </Group>
        <Text
          x={250}
          y={20}
          text="Memory Usage by Applications"
          fontSize={20}
        />
      </Layer>
    </Stage>
  );
};

const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

export default KonvaPieChart;
