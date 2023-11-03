import React from "react";
import Sketch from "react-p5";

interface P5CanvasProps {
  data: {
    Otaniemi: {
      [year: string]: {
        [month: string]: { rainfall: number; temperature: number };
      };
    };
  };
}

const P5Canvas: React.FC<P5CanvasProps> = ({ data }) => {
  const processWeatherData = () => {
    const months = Object.keys(data.Otaniemi["2020"]);
    const rainfallData = months.map((month) => data.Otaniemi["2020"][month].rainfall);
    const temperatureData = months.map((month) => data.Otaniemi["2020"][month].temperature);
    const maxRainfall = Math.max(...rainfallData);
    const minTemperature = Math.min(...temperatureData);
    const maxTemperature = Math.max(...temperatureData);
    return { months, rainfallData, temperatureData, maxRainfall, minTemperature, maxTemperature };
  };

  const drawBarChart = (p5, { months, rainfallData, maxRainfall }) => {
    const barWidth = 30;
    const gap = (p5.width - 100 - barWidth * months.length) / (months.length - 1);
    let x = 50;
    p5.fill(76, 199, 192);
    for (let i = 0; i < rainfallData.length; i++) {
      const barHeight = (rainfallData[i] / maxRainfall) * 200;
      p5.rect(x, p5.height - barHeight - 50, barWidth, barHeight);
      p5.textAlign(p5.CENTER);
      p5.text(months[i], x + barWidth / 2, p5.height - 30);
      x += barWidth + gap;
    }
  };

  const drawLineChart = (p5, { months, temperatureData, minTemperature, maxTemperature }) => {
    p5.stroke(255, 111, 97);
    p5.strokeWeight(2);
    p5.noFill();
    p5.beginShape();
    const xGap = (p5.width - 100) / (temperatureData.length - 1);
    let x = 50;
    for (let i = 0; i < temperatureData.length; i++) {
      const y = ((temperatureData[i] - minTemperature) / (maxTemperature - minTemperature)) * 200;
      p5.vertex(x, p5.height - y - 50);
      x += xGap;
    }
    p5.endShape();
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(800, 500).parent(canvasParentRef);
  };

  const draw = (p5) => {
    const { months, rainfallData, temperatureData, maxRainfall, minTemperature, maxTemperature } = processWeatherData();

    p5.background(200);
    p5.clear();
    p5.textSize(12);

    drawBarChart(p5, { months, rainfallData, maxRainfall });
    drawLineChart(p5, { months, temperatureData, minTemperature, maxTemperature });

    p5.noLoop();
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default P5Canvas;
