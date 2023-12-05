import React, { useEffect, useState } from "react";
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
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    setWeatherData(processWeatherData());
  }, [data]);

  const processWeatherData = () => {
    const months = Object.keys(data.Otaniemi["2020"]);
    const rainfallData = months.map(
      (month) => data.Otaniemi["2020"][month].rainfall
    );
    const temperatureData = months.map(
      (month) => data.Otaniemi["2020"][month].temperature
    );
    const maxRainfall = Math.max(...rainfallData);
    const minTemperature = Math.min(...temperatureData);
    const maxTemperature = Math.max(...temperatureData);
    return {
      months,
      rainfallData,
      temperatureData,
      maxRainfall,
      minTemperature,
      maxTemperature,
    };
  };

  const drawCombinedChart = (
    p5,
    {
      months,
      rainfallData,
      temperatureData,
      maxRainfall,
      minTemperature,
      maxTemperature,
    }
  ) => {
    const barWidth = 30;
    const gap =
      (p5.width - 100 - barWidth * months.length) / (months.length - 1);

    // Bar chart logic
    let barX = 50;
    p5.fill(76, 199, 192);
    for (let i = 0; i < rainfallData.length; i++) {
      const barHeight = (rainfallData[i] / maxRainfall) * 200;
      p5.rect(barX, p5.height - barHeight - 50, barWidth, barHeight);
      barX += barWidth + gap;
    }

    // Line chart logic
    p5.stroke("orange");
    p5.strokeWeight(2);
    p5.noFill();
    p5.beginShape();
    const xGap = (p5.width - 100) / (temperatureData.length - 1);
    let lineX = 50;
    for (let i = 0; i < temperatureData.length; i++) {
      const y =
        ((temperatureData[i] - minTemperature) /
          (maxTemperature - minTemperature)) *
        200;
      p5.vertex(lineX, p5.height - y - 50);
      lineX += xGap;
    }
    p5.endShape();
    p5.stroke("white");

    // Labels for the months
    let labelX = 50 + barWidth / 2;
    for (let i = 0; i < months.length; i++) {
      p5.fill(0); // Black color for text
      p5.textAlign(p5.CENTER);
      p5.text(months[i], labelX, p5.height - 30);
      labelX += barWidth + gap;
    }
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(800, 500).parent(canvasParentRef);
  };

  const draw = (p5) => {
    if (!weatherData) return;

    p5.background(200);
    p5.clear();
    p5.textSize(12);

    drawCombinedChart(p5, {
      months: weatherData.months,
      rainfallData: weatherData.rainfallData,
      temperatureData: weatherData.temperatureData,
      maxRainfall: weatherData.maxRainfall,
      minTemperature: weatherData.minTemperature,
      maxTemperature: weatherData.maxTemperature,
    });

    p5.noLoop();
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default P5Canvas;
