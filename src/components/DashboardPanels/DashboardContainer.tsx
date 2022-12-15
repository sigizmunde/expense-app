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
}));

export function DashboardContainer({
  children = undefined,
}: GridProps & { children?: ReactNode }) {
  return <DashboardContainerBox>{children}</DashboardContainerBox>;
}
