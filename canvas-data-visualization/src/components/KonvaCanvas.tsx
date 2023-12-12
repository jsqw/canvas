import React, { useRef, useEffect } from 'react';
import Konva from 'konva';

interface KonvaCanvasProps {
  data: {
    Otaniemi: {
      [year: string]: {
        [month: string]: { rainfall: number; temperature: number };
      };
    };
  };
}

const KonvaCanvas: React.FC<KonvaCanvasProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const stage = new Konva.Stage({
      container: containerRef.current,
      width: 800,
      height: 500,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    const months = Object.keys(data.Otaniemi['2020']);
    const rainfallData = months.map((month) => data.Otaniemi['2020'][month].rainfall);
    const temperatureData = months.map((month) => data.Otaniemi['2020'][month].temperature);

    const maxRainfall = Math.max(...rainfallData);
    const minTemperature = Math.min(...temperatureData);
    const maxTemperature = Math.max(...temperatureData);

    const barWidth = 30;
    const gap = (stage.width() - 100 - barWidth * months.length) / (months.length - 1);
    let x = 50;

    for (let i = 0; i < rainfallData.length; i++) {
      const barHeight = (rainfallData[i] / maxRainfall) * 200;

      const rect = new Konva.Rect({
        x: x,
        y: stage.height() - barHeight - 50,
        width: barWidth,
        height: barHeight,
        fill: 'rgb(76, 199, 192)',
      });
      layer.add(rect);

      const text = new Konva.Text({
        x: x + barWidth / 2,
        y: stage.height() - 30,
        text: months[i],
        fontSize: 12,
        fontFamily: 'Arial',
        fill: 'black',
        align: 'center',
      });
      layer.add(text);

      x += barWidth + gap;
    }

    const line = new Konva.Line({
      points: temperatureData.flatMap((temperature, i) => [
        50 + ((stage.width() - 100) / (temperatureData.length - 1)) * i,
        stage.height() - ((temperature - minTemperature) / (maxTemperature - minTemperature)) * 200 - 50,
      ]),
      stroke: 'rgb(255, 111, 97)',
      strokeWidth: 2,
    });
    layer.add(line);

    layer.draw();
  }, [data]);

  const formatDataForScreenReader = (data: KonvaCanvasProps["data"]): string => {
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

  return <div ref={containerRef} style={{ border: '1px solid black' }} aria-label={"Bar chart"} aria-describedby={"Evolution of temperature in Otaniemi"} aria-details={JSON.stringify(formattedData, null, 2)} role="img"/>;
};

export default KonvaCanvas;
