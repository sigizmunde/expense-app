import { FC, ReactNode } from 'react';
import { Container, styled } from '@mui/material';
import { GridProps } from '@mui/system';

const CategoriesContainerBox = styled(Container)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.custom.bgr,
  padding: theme.spacing(3),
  paddingBottom: 0,
  overflow: 'scroll',
}));

export const CategoriesContainer: FC<GridProps & { children?: ReactNode }> = ({
  children,
}) => {
  return <CategoriesContainerBox>{children}</CategoriesContainerBox>;
};
