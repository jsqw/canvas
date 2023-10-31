/* eslint-disable no-inner-declarations */
import React, { useRef, useEffect, useState } from "react";
import data from "./data.json";
import "./App.css";

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
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

        function drawBarChart() {
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
        }

        function drawLineChart() {
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
        }

        function drawAxis() {
          ctx.beginPath();
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 1;

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
        }

        function drawChart() {
          drawAxis();
          drawBarChart();
          drawLineChart();
        }

        drawChart();
      }
    }
  }, [data]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width="800"
        height="500"
        style={{ border: "1px solid black" }}
      />
    </>
  );
}

export default App;
