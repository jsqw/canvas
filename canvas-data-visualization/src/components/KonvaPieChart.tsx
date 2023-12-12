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

  const formatDataForScreenReader = (data: Data): string => {
    // Convert the instance to a string using JSON.stringify
    const dataString: string = JSON.stringify(data, null, 2);
  
    // Remove unnecessary punctuation
    const formattedData: string = dataString
      .replace(/[{}"]/g, '') // Remove curly braces and double quotes
      .replace(/\[/g, '')    // Remove square brackets
      .replace(/]/g, '')
      .replace(/,\s+/g, ', ') // Remove unnecessary spaces after commas
      .replace(/\n\s+/g, ' '); // Remove unnecessary indentation
  
    return formattedData;
  };

  const formattedData: string = formatDataForScreenReader(data);

  return (
    <Stage style={{ border: "1px solid black" }} width={800} height={600} aria-label={"Pie chart"} aria-describedby={"Memory Usage by Application"} aria-details={JSON.stringify(formattedData, null, 2)} role="img">
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
