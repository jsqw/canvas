import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

const FabricPieChart: React.FC = () => {
  const canvasRef = useRef(null);
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
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const colors = Object.keys(data).map(() => getRandomColor());

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
    });

    drawPieChart(canvas, data, colors);
    drawLegend(canvas, data, colors);
    drawTitle(canvas, "Memory Usage by Applications");
  }, []);

  const drawPieChart = (canvas, data, colors) => {
    let startAngle = 0;
    const total = Object.values(data).reduce((acc, value) => acc + value, 0);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 200;

    Object.entries(data).forEach(([key, value], index) => {
      const angle = (value / total) * 360;
      const endAngle = startAngle + angle;

      const pathString = createPieSegmentPath(
        0,
        0, // Use 0,0 for the path's own coordinates
        radius,
        fabric.util.degreesToRadians(startAngle),
        fabric.util.degreesToRadians(endAngle)
      );
      const pieSegment = new fabric.Path(pathString, {
        left: centerX, // Position the segment's center
        top: centerY, // at the canvas center
        fill: colors[index],
        originX: "center",
        originY: "center",
      });

      canvas.add(pieSegment);
      startAngle = endAngle;
    });
  };

  const drawLegend = (canvas, data, colors) => {
    let startY = 40;
    const legendX = 650;
    Object.keys(data).forEach((key, index) => {
      const colorRect = new fabric.Rect({
        left: legendX,
        top: startY,
        width: 20,
        height: 20,
        fill: colors[index],
      });

      const text = new fabric.Text(key, {
        left: legendX + 30,
        top: startY,
        fontSize: 15,
      });

      canvas.add(colorRect, text);
      startY += 30;
    });
  };

  const drawTitle = (canvas, title) => {
    const text = new fabric.Text(title, {
      left: canvas.width / 2,
      top: 10,
      fontSize: 20,
      originX: "center",
    });

    canvas.add(text);
  };

  const createPieSegmentPath = (x, y, radius, startAngle, endAngle) => {
    // Adjusted to use radians and simplified
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";

    return [
      "M",
      x,
      y,
      "L",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "L",
      x,
      y,
    ].join(" ");
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  return <canvas ref={canvasRef} />;
};

export default FabricPieChart;
