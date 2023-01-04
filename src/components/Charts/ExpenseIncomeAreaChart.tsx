import { styled, Box } from '@mui/material';
import {
  Area,
  AreaChart,
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
    expense: 300,
    income: 200,
  },
  {
    id: 2,
    name: 'mon',
    expense: 134,
    income: 452.55,
  },
  {
    id: 3,
    name: 'tue',
    expense: 134,
    income: 452.55,
  },
  {
    id: 4,
    name: 'wed',
    expense: 134,
    income: 452.55,
  },
  {
    id: 5,
    name: 'thu',
    expense: 134,
    income: 452.55,
  },
  {
    id: 6,
    name: 'fri',
    expense: 134,
    income: 452.55,
  },
  {
    id: 7,
    name: 'sat',
    expense: 134,
    income: 452.55,
  },
];

const DiagramBox = styled(Box)(() => ({
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
  },
}));

function CustomTooltip({ payload }: TooltipProps<ValueType, NameType>) {
  return (
    <TooltipBox className="custom-tooltip">
      {payload && payload[0] && <p>{payload[0].payload?.name}</p>}
      {payload && payload[0] && <p>{`$${payload[0].value as string}`}</p>}
    </TooltipBox>
  );
}

export function ExpenseIncomeAreaChart({
  data = testData,
  grid = false,
  axis = false,
  income = false,
  expense = false,
}: {
  data?: IAreaDiagramDataRecord[];
  grid?: boolean;
  axis?: boolean;
  income?: boolean;
  expense?: boolean;
}) {
  const shouldDrawExpense = !!data.find((e) =>
    Object.prototype.hasOwnProperty.call(e, 'expense')
  );

  const shouldDrawIncome = !!data.find((e) =>
    Object.prototype.hasOwnProperty.call(e, 'income')
  );

  return (
    <DiagramBox>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor={theme.palette.custom.greener}
                stopOpacity="1"
              />
              <stop
                offset="100%"
                stopColor={theme.palette.custom.greener}
                stopOpacity="0"
              />
            </linearGradient>
            <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor={theme.palette.custom.orange}
                stopOpacity="1"
              />
              <stop
                offset="100%"
                stopColor={theme.palette.custom.orange}
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
          {grid && <CartesianGrid strokeDasharray="3 3" />}
          {axis && <XAxis dataKey="name" />}
          {axis && <YAxis />}
          <Tooltip content={<CustomTooltip />} />
          {shouldDrawExpense && expense && (
            <Area
              animationDuration={500}
              connectNulls
              type="monotone"
              dataKey="expense"
              stroke={theme.palette.custom.orange}
              fill="url(#Gradient2)"
            />
          )}
          {shouldDrawIncome && income && (
            <Area
              animationDuration={500}
              connectNulls
              type="monotone"
              dataKey="income"
              stroke={theme.palette.custom.greener}
              fill="url(#Gradient1)"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </DiagramBox>
  );
}
