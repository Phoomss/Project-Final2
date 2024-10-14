import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface GenderChartData {
  male: number;
  female: number;
}

interface GenderChartProps {
  data: GenderChartData;
}

const GenderChart: React.FC<GenderChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart>();

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Male", "Female"],
            datasets: [
              {
                label: "Gender Distribution",
                data: [data.male, data.female],
                backgroundColor: [
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 99, 132, 1)", // Red
                ],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                },
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div>
      <canvas ref={chartRef} width={180} height={160} />
    </div>
  );
};

export default GenderChart;
