import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../../hooks/reduxHooks';
import { authSelectors } from '../../store/auth/authSelectors';
import { dataSelectors } from '../../store/data/dataSelectors';

export function Loader() {
  const authFetching = useAppSelector(authSelectors.getIsFetching);
  const dataFetching = useAppSelector(dataSelectors.getIsFetching);
  const open = authFetching || dataFetching;
  return (
    <Backdrop
      sx={{
        bgcolor: '#0001',
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
