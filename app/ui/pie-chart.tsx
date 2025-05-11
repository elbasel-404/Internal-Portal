'use client';

import { Label, Pie, PieChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './chart';

import { ChartData } from '@types';

interface PieChartElemProps {
  size?: keyof typeof sizeConfig;
  thickness?: number;
  chartData: ChartData[];
  chartConfig: ChartConfig;
  label?: string;
  labelClassName?: string;
  showLabelFirst?: boolean;
  percentage: number;
  percentageSize?: string;
  percentageColor: string;
  nameKey: string;
  dataKey: string;
  pieChartHeight?: string;
}

const sizeConfig = {
  1: { radius: 20 },
  2: { radius: 30 },
  3: { radius: 40 },
  4: { radius: 50 },
  5: { radius: 60 },
  6: { radius: 70 },
  7: { radius: 80 },
  8: { radius: 90 },
  9: { radius: 100 },
  10: { radius: 110 },
};

export function PieChartElem({
  size = 2,
  thickness = 5,
  chartData,
  chartConfig,
  label,
  labelClassName,
  showLabelFirst = false,
  percentage,
  percentageSize,
  percentageColor,
  nameKey,
  dataKey,
  pieChartHeight,
}: PieChartElemProps) {
  const { radius } = sizeConfig[size];
  const innerRadius = radius - thickness;
  const outerRadius = radius;

  return (
    <ChartContainer
      config={chartConfig}
      className={`aspect-square min-h-[${pieChartHeight}px] h-32 overflow-hidden`}
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey={dataKey}
          nameKey={nameKey}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor='middle'
                    dominantBaseline='middle'
                  >
                    {label && viewBox.cy !== undefined && (
                      <tspan
                        x={viewBox.cx}
                        y={showLabelFirst ? viewBox.cy : viewBox.cy + 20}
                        className={`${labelClassName} text-base`}
                      >
                        {label}
                      </tspan>
                    )}
                    {viewBox.cy !== undefined && (
                      <tspan
                        x={viewBox.cx}
                        y={showLabelFirst ? viewBox.cy + 20 : viewBox.cy}
                        className={` ${percentageColor} ${percentageSize}`}
                      >
                        {percentage.toLocaleString()}%
                      </tspan>
                    )}
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
