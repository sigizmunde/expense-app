import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../../hooks/reduxHooks';
import { uixSelectors } from '../../store/uix/uixSelectors';

export function Loader() {
  const isFetching = useAppSelector(uixSelectors.getIsFetching);
  return (
    <Backdrop
      sx={{
        bgcolor: '#0001',
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isFetching}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
