import React, { useRef, useEffect } from "react";

const PurePieCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const data = {
    "Web Browser": 2.5,
    "Email Client": 1.2,
    "Text Editor": 0.8,
    "Database Server": 2.0,
    "Media Player": 1.0,
    "File Manager": 0.5,
    "Terminal Emulator": 0.7,
    "Graphics Editor": 1.3,
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const colors = Object.keys(data).reduce((acc, key) => {
    acc[key] = getRandomColor();
    return acc;
  }, {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      drawPieChart(ctx, data, colors);
      drawLegend(ctx, data, colors);
      drawTitle(ctx, "Memory Usage by Applications");
    }
  }, []);

  const drawPieChart = (ctx, data, colors) => {
    const total = Object.values(data).reduce((acc, value) => acc + value, 0);
    let startAngle = 0;

    const centerX = canvasRef.current.width / 2 - 100;
    const centerY = canvasRef.current.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;

    Object.entries(data).forEach(([key, value]) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colors[key];
      ctx.fill();
      startAngle += sliceAngle;
    });
  };

  const drawLegend = (ctx, data, colors) => {
    let startY = 40;
    const legendX = canvasRef.current.width - 200;
    Object.keys(data).forEach((key) => {
      ctx.beginPath();
      ctx.rect(legendX, startY, 20, 20);
      ctx.fillStyle = colors[key];
      ctx.fill();
      ctx.closePath();

      ctx.fillStyle = "black";
      ctx.font = "16px Arial";
      ctx.fillText(key, legendX + 30, startY + 15);

      startY += 30;
    });
  };

  const drawTitle = (ctx, title) => {
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText(
      title,
      canvasRef.current.width / 2 - ctx.measureText(title).width / 2,
      30
    );
  };

  return (
    <canvas
      ref={canvasRef}
      width="800"
      height="600"
      style={{ border: "1px solid black" }}
    />
  );
};

export default PurePieCanvas;
