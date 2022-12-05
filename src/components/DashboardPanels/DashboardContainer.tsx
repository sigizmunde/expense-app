import { FC, ReactNode } from 'react';
import { Container, styled } from '@mui/material';
import { GridProps } from '@mui/system';

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

export const DashboardContainer: FC<GridProps & { children?: ReactNode }> = ({
  children,
}) => {
  return <DashboardContainerBox>{children}</DashboardContainerBox>;
};
