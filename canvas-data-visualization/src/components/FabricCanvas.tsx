import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

interface FabricCanvasProps {
  data: {
    Otaniemi: {
      [year: string]: {
        [month: string]: { rainfall: number; temperature: number };
      };
    };
  };
}

const FabricCanvas: React.FC<FabricCanvasProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 500,
      });
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

      // Draw bar chart
      let x = 50;
      const barWidth = 30;
      const gap =
        (canvas.getWidth() - 100 - barWidth * months.length) / (months.length - 1);
      for (let i = 0; i < rainfallData.length; i++) {
        const barHeight = (rainfallData[i] / maxRainfall) * 200;
        const rect = new fabric.Rect({
          left: x,
          top: canvas.getHeight() - barHeight - 50,
          width: barWidth,
          height: barHeight,
          fill: "#76c7c0",
        });
        canvas.add(rect);
        const text = new fabric.Text(months[i], {
          left: x + barWidth / 2,
          top: canvas.getHeight() - 30,
          fontSize: 12,
        });
        canvas.add(text);
        x += barWidth + gap;
      }

      // Draw line chart
      const linePoints = [];
      const xGap = (canvas.getWidth() - 100) / (temperatureData.length - 1);
      x = 50;
      for (let i = 0; i < temperatureData.length; i++) {
        const y =
          ((temperatureData[i] - minTemperature) /
            (maxTemperature - minTemperature)) *
          200;
        linePoints.push({ x: x, y: canvas.getHeight() - y - 50 });
        x += xGap;
      }
      const line = new fabric.Polyline(linePoints, {
        fill: "",
        stroke: "#ff6f61",
        strokeWidth: 2,
      });
      canvas.add(line);
    }
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={500}
      style={{ border: "1px solid black", maxWidth: "100%", maxHeight: "100%" }}
    />
  );
};

export default FabricCanvas;
