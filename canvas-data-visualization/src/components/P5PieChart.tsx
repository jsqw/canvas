import React, { useRef, useEffect } from "react";
import p5 from "p5";

interface Data {
  [key: string]: number;
}

const P5PieChart: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(800, 600);
        drawPieChart(p, data);
        drawLegend(p, data);
        drawTitle(p, "Memory Usage by Applications");
      };
    };

    new p5(sketch, sketchRef.current);
  }, []);

  const drawPieChart = (p: p5, data: Data) => {
    let lastAngle = 0;
    const total = Object.values(data).reduce((acc, value) => acc + value, 0);

    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const slice = (data[key] / total) * p.TWO_PI;
      p.fill(getRandomColor());
      p.arc(400, 300, 400, 400, lastAngle, lastAngle + slice);
      lastAngle += slice;
    }
  };

  const drawLegend = (p: p5, data: Data) => {
    let startY = 40;
    const legendX = 650;
    Object.keys(data).forEach((key, index) => {
      p.fill(getRandomColor());
      p.rect(legendX, startY, 20, 20);

      p.fill(0);
      p.textSize(16);
      p.textAlign(p.LEFT, p.CENTER);
      p.text(key, legendX + 30, startY + 10);

      startY += 30;
    });
  };

  const drawTitle = (p: p5, title: string) => {
    p.fill(0);
    p.textSize(24);
    p.textAlign(p.CENTER, p.TOP);
    p.text(title, 400, 10);
  };

  const getRandomColor = () => {
    return [
      p5.prototype.random(255),
      p5.prototype.random(255),
      p5.prototype.random(255),
    ];
  };

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

  return <div ref={sketchRef} aria-label={"Pie chart"} aria-describedby={"Memory Usage by Application"} aria-details={JSON.stringify(formattedData, null, 2)} role="img"></div>;
};

export default P5PieChart;
