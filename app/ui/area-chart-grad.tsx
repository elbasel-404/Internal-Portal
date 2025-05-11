'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './chart';

import { ChartData } from '@types';

interface AreaChartElemProps {
  chartData: ChartData[];
  chartConfig: ChartConfig;
}

export function AreaChartGrad({ chartData, chartConfig }: AreaChartElemProps) {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={true} />
        <XAxis
          dataKey='month'
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          dataKey='attendance'
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id='fillDesktop' x1='0' y1='0' x2='0' y2='1'>
            <stop
              offset='5%'
              stopColor='var(--color-attendance)'
              stopOpacity={0.8}
            />
            <stop
              offset='95%'
              stopColor='var(--color-attendance)'
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey='attendance'
          type='natural'
          fill='url(#fillDesktop)'
          fillOpacity={0.4}
          stroke='var(--color-attendance)'
          stackId='a'
        />
      </AreaChart>
    </ChartContainer>
  );
}
