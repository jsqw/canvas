import React, { useRef, useEffect } from "react";

interface Data {
  Otaniemi: {
    [year: string]: {
      [month: string]: { rainfall: number; temperature: number };
    };
  };
}

interface PureCanvasProps {
  data: Data;
}

const PureCanvas: React.FC<PureCanvasProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      drawChart(ctx, canvas, data);
    }
  }, [data]);

  const drawChart = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    data: Data
  ) => {
    drawAxis(ctx, canvas, data);
    drawBarChart(ctx, canvas, data);
    drawLineChart(ctx, canvas, data);
  };

  const drawAxis = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    data: Data
  ) => {
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;

    const months = Object.keys(data.Otaniemi["2020"]);
    const rainfallData = months.map(
      (month) => data.Otaniemi["2020"][month].rainfall
    );
    const maxRainfall = Math.max(...rainfallData);

    // Y-axis
    ctx.moveTo(50, 50);
    ctx.lineTo(50, canvas.height - 50);
    // X-axis
    ctx.lineTo(canvas.width - 50, canvas.height - 50);

    ctx.stroke();
    ctx.closePath();

    // Drawing Y-axis labels
    for (let i = 0; i <= maxRainfall; i += 10) {
      const y = canvas.height - (i / maxRainfall) * 200 - 50;
      ctx.fillText(i.toString(), 30, y);
    }

    // Drawing X-axis labels
    const xGap = (canvas.width - 100) / (months.length - 1);
    let x = 50;
    for (const month of months) {
      ctx.fillText(month, x - 15, canvas.height - 30);
      x += xGap;
    }
  };

  const drawBarChart = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    data: Data
  ) => {
    const months = Object.keys(data.Otaniemi["2020"]);
    const rainfallData = months.map(
      (month) => data.Otaniemi["2020"][month].rainfall
    );
    const maxRainfall = Math.max(...rainfallData);

    const barWidth = 38;
    const gap = 15;
    let x = 68;

    ctx.fillStyle = "#76c7c0";
    for (let i = 0; i < rainfallData.length; i++) {
      const barHeight = (rainfallData[i] / maxRainfall) * 200;
      // Centering the bar relative to the month label
      const centeredX = x - barWidth / 2 + 7 * i;
      ctx.fillRect(
        centeredX,
        canvas.height - barHeight - 50,
        barWidth,
        barHeight
      );
      x += barWidth + gap;
    }
  };

  const drawLineChart = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    data: Data
  ) => {
    const months = Object.keys(data.Otaniemi["2020"]);
    const temperatureData = months.map(
      (month) => data.Otaniemi["2020"][month].temperature
    );
    const maxTemperature = Math.max(...temperatureData);
    const minTemperature = Math.min(...temperatureData);

    ctx.beginPath();
    ctx.strokeStyle = "#ff6f61";
    ctx.lineWidth = 2;

    const xGap = (canvas.width - 100) / (temperatureData.length - 1);
    let x = 50;
    for (let i = 0; i < temperatureData.length; i++) {
      const y =
        ((temperatureData[i] - minTemperature) /
          (maxTemperature - minTemperature)) *
        200;
      if (i === 0) {
        ctx.moveTo(x, canvas.height - y - 50);
      } else {
        ctx.lineTo(x, canvas.height - y - 50);
      }
      x += xGap;
    }
    ctx.stroke();
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

  return (
    <canvas
      ref={canvasRef}
      width="800"
      height="500"
      style={{ border: "1px solid black" }}
      aria-label="Bar chart"
      aria-describedby={"Evolution of temperature in Otaniemi"}
      aria-details={JSON.stringify(formattedData, null, 2)}
      role="img"
    />
  );
};

export default PureCanvas;
