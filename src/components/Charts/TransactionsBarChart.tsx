import { styled, Box } from '@mui/material';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { theme } from '../../styles/theme';
import { IAreaDiagramDataRecord } from '../../types/data';

const testData = [
  {
    id: 1,
    name: 'sun',
    value: 300,
  },
  {
    id: 2,
    name: 'mon',
    value: 134,
  },
  {
    id: 3,
    name: 'tue',
    value: 134,
  },
  {
    id: 4,
    name: 'wed',
    value: 134,
  },
  {
    id: 5,
    name: 'thu',
    value: 134,
  },
  {
    id: 6,
    name: 'fri',
    value: 134,
  },
  {
    id: 7,
    name: 'sat',
    value: 134,
  },
];

const HistogramBox = styled(Box)(() => ({
  position: 'absolute',
  width: '100%',
  height: '75%',
  left: 0,
  bottom: 0,
}));

const TooltipBox = styled(Box)(({ theme: styleTheme }) => ({
  padding: styleTheme.spacing(1),
  minWidth: styleTheme.spacing(5),
  backgroundColor: `${styleTheme.palette.custom.bgr}B3`,
  borderRadius: styleTheme.spacing(0),
  '& p': {
    margin: '0 auto',
    '&:first-of-type': {
      fontWeight: 600,
    },
    '&:focus, &:focus-within': { outline: 'none' },
  },
}));

function CustomTooltip({ payload }: TooltipProps<ValueType, NameType>) {
  return (
    <TooltipBox
      className="custom-tooltip"
      style={{
        color: theme.palette.custom.white,
        backgroundColor: theme.palette.custom.violet,
      }}
    >
      {payload && payload[0] && <p>{payload[0].value}</p>}
    </TooltipBox>
  );
}

function CustomizedYAxisTick({
  x = 0,
  y = 0,
  payload = undefined,
}: {
  x?: number;
  y?: number;
  payload?: { value: string };
}) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="currentColor"
        opacity={0.7}
        transform="translate(-30, -5) rotate(-90)"
        fontFamily="Montserrat, Sans-Serif"
        fontWeight={400}
        fontSize={12}
      >
        {payload && payload.value}
      </text>
    </g>
  );
}

function CustomizedXAxisTick({
  x = 0,
  y = 0,
  payload = undefined,
}: {
  x?: number;
  y?: number;
  payload?: { value: string };
}) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="currentColor"
        opacity={0.7}
        transform="translate(5, -8)"
        fontFamily="Montserrat, Sans-Serif"
        fontWeight={400}
        fontSize={12}
      >
        {payload && payload.value}
      </text>
    </g>
  );
}

const getPath = (
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  const r =
    // eslint-disable-next-line no-nested-ternary
    radius > width / 2 || radius > height / 2
      ? width > height
        ? height / 2
        : width / 2
      : radius;
  return `M${x} ${y + height}
          V${y + r}
          Q${x} ${y}, ${x + r} ${y}
          H${x + width - r}
          Q${x + width} ${y}, ${x + width} ${y + r}
          V${y + height}
          Z`;
};

function CustomBarShape({
  fill = '#000',
  x = 0,
  y = 0,
  width = 0,
  height = 0,
}: {
  fill?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}): JSX.Element {
  return <path d={getPath(x, y, width, height, 8)} stroke="none" fill={fill} />;
}

export function TransactionsBarChart({
  data = testData,
  grid = false,
  axis = false,
}: {
  data?: IAreaDiagramDataRecord[];
  grid?: boolean;
  axis?: boolean;
}) {
  return (
    <HistogramBox>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="BarGradient" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor={theme.palette.custom.violet}
                stopOpacity="1"
              />
              <stop
                offset="100%"
                stopColor={theme.palette.custom.violet}
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
          {grid && <CartesianGrid strokeDasharray="3 3" />}
          {axis && (
            <XAxis
              dataKey="name"
              axisLine={false}
              tickSize={0}
              // padding={{ right: 30 }}
              tick={<CustomizedXAxisTick />}
            />
          )}
          {axis && (
            <YAxis
              axisLine={false}
              tickSize={0}
              padding={{ bottom: 16 }}
              width={45}
              tick={<CustomizedYAxisTick />}
              allowDecimals={false}
            />
          )}
          <Tooltip content={<CustomTooltip />} />
          <Bar
            animationDuration={500}
            dataKey="value"
            fill="url(#BarGradient)"
            shape={<CustomBarShape />}
          />
        </BarChart>
      </ResponsiveContainer>
    </HistogramBox>
  );
}
