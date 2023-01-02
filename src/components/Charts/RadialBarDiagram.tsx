import { MouseEvent, useState } from 'react';
import { styled, Box } from '@mui/material';
import { ResponsiveContainer, RadialBarChart, RadialBar, Cell } from 'recharts';
import { LegendInfoCard } from './LegendInfoCard';
import { moneyNumToString } from '../../utils/moneyNumToString';
import { ICircleDiagramDataRecord } from '../../types/data';

const testData = [
  {
    id: 10,
    name: '18-24',
    value: 31.47,
    fill: '#8884d8',
  },
  {
    id: 20,
    name: '25-29',
    value: 26.69,
    fill: '#83a6ed',
  },
  {
    id: 30,
    name: '30-34',
    value: 15.69,
    fill: '#8dd1e1',
  },
  {
    id: 40,
    name: '35-39',
    value: 8.22,
    fill: '#82ca9d',
  },
  {
    id: 50,
    name: '40-49',
    value: 8.63,
    fill: '#a4de6c',
  },
  {
    id: 6,
    name: '50+',
    value: 2.63,
    fill: '#d0ed57',
  },
  {
    id: 7,
    name: 'unknown',
    value: 6.67,
    fill: '#ffc658',
  },
  // {
  //   id: 50,
  //   name: '40-49',
  //   value: 8.63,
  //   fill: '#a4de6c',
  // },
  // {
  //   id: 6,
  //   name: '50+',
  //   value: 2.63,
  //   fill: '#d0ed57',
  // },
  // {
  //   id: 7,
  //   name: 'unknown',
  //   value: 6.67,
  //   fill: '#ffc658',
  // },
  // {
  //   id: 50,
  //   name: '40-49',
  //   value: 8.63,
  //   fill: '#a4de6c',
  // },
  // {
  //   id: 6,
  //   name: '50+',
  //   value: 2.63,
  //   fill: '#d0ed57',
  // },
  // {
  //   id: 7,
  //   name: 'unknown',
  //   value: 6.67,
  //   fill: '#ffc658',
  // },
  // {
  //   id: 50,
  //   name: '40-49',
  //   value: 8.63,
  //   fill: '#a4de6c',
  // },
  // {
  //   id: 6,
  //   name: '50+',
  //   value: 2.63,
  //   fill: '#d0ed57',
  // },
  // {
  //   id: 7,
  //   name: 'unknown',
  //   value: 6.67,
  //   fill: '#ffc658',
  // },
];

const LegendContainer = styled(Box)(() => ({
  width: '100%',
  transition: 'opacity 250ms',
  position: 'relative',
  transform: 'translate(0, -25%)',
}));

export function RadialBarDiagram({
  data = testData,
}: {
  data?: ICircleDiagramDataRecord[];
}) {
  // data = testData;
  const [show, setShow] = useState(false);
  const [tip, setTip] = useState({ color: '', name: '', value: '' });

  const handleMouseEnter = (e: MouseEvent<SVGElement>) => {
    e.currentTarget.style.filter = 'drop-shadow(0 0 2px #D11A2A3D)';

    // attributes of data translated to Cell component
    const id = e.currentTarget.getAttribute('id');
    const currentRec = data.find((record) => record.id?.toString() === id);
    if (currentRec)
      setTip({
        color: currentRec.fill,
        name: currentRec.name,
        value: moneyNumToString({ amount: currentRec.value }),
      });
    setShow(true);
  };

  const handleMouseLeave = (e: MouseEvent<SVGElement>) => {
    e.currentTarget.style.filter = 'none';
    setShow(false);
  };

  const mappedData = data.map((rec) => ({
    ...rec,
    value: Math.abs(rec.value),
  }));

  // radius shrinks on bigger data set
  const innRadius = 5 + 1 / (0.011 * data.length);

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="45%"
          innerRadius={`${innRadius}%`}
          outerRadius="95%"
          margin={{ top: 2, bottom: 2, left: 2, right: 2 }}
          barCategoryGap="50%"
          data={mappedData}
          startAngle={300}
          endAngle={0}
        >
          <RadialBar dataKey="value">
            {data.map((entry) => {
              return (
                <Cell
                  key={entry.id}
                  stroke={entry.fill}
                  strokeWidth={5}
                  strokeLinejoin="round"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ transition: 'fill 250ms ease' }}
                />
              );
            })}
          </RadialBar>
        </RadialBarChart>
      </ResponsiveContainer>
      <LegendContainer style={{ opacity: Number(show) }}>
        <LegendInfoCard {...tip} />
      </LegendContainer>
    </>
  );
}
