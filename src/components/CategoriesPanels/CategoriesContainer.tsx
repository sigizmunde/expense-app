import { ReactNode } from 'react';
import { Container, styled } from '@mui/material';

const CategoriesContainerBox = styled(Container)(({ theme }) => ({
  '&.MuiContainer-root': {
    maxWidth: 'unset',
  },
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.custom.bgr,
  padding: theme.spacing(3),
  paddingBottom: 0,
  overflow: 'scroll',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

export function CategoriesContainer({
  children = undefined,
}: {
  children?: ReactNode;
}) {
  return <CategoriesContainerBox>{children}</CategoriesContainerBox>;
}
