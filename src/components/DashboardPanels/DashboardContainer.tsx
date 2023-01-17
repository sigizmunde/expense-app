import { ReactNode } from 'react';
import { Container, styled, GridProps } from '@mui/material';

export const DashboardContainerBox = styled(Container)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.custom.bgr,
  gap: theme.spacing(3),
  padding: theme.spacing(3),
  '& .MuiContainer-root': {
    paddingLeft: 0,
    paddingRight: 0,
  },
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(5),
    flexDirection: 'column-reverse',
    height: 'auto',
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(5),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(6),
    },
  },
}));

export function DashboardContainer({
  children = undefined,
}: GridProps & { children?: ReactNode }) {
  return <DashboardContainerBox>{children}</DashboardContainerBox>;
}
