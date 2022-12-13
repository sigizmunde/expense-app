import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { authSelectors } from '../../store/auth/authSelectors';
import { dataSelectors } from '../../store/data/dataSelectors';
import { addTransaction, updateTransaction } from '../../store/data/dataThunk';
import { INewTransaction, ITransaction } from '../../types/data';
import { ButtonSecondary } from '../Buttons/ButtonSecondary';
import { MenuItem } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { DashInput } from '../Inputs/DashInput';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const TransFormBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '100%',
  height: 'fit-content',
  flex: '1 0 auto',
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  alignItems: 'baseline',
  justifyContent: 'stretch',
  rowGap: theme.spacing(1),
  columnGap: theme.spacing(3),
  '& > *:not(:first-of-type)': {
    marginTop: 0,
  },
}));

const StyledDatePicker = styled(MobileDatePicker)(({ theme }) => ({
  '& .MuiFormHelperText-root': {
    marginBottom: `calc(${theme.spacing(2)}* -1)`,
  },
}));

const validationSchema = Yup.object({
  label: Yup.string().required('Label is required'),
  categoryId: Yup.number().required('Choose a category'),
  date: Yup.date()
    .transform((value) => {
      return value ? dayjs(value).toDate() : value;
    })
    .required('Date is required')
    .max(new Date(), "It's future"),
  amount: Yup.number()
    .typeError('age must be a number')
    .required('Input a sum'),
});

export const TransactionForm = ({
  transactionId,
  afterSubmit,
}: {
  transactionId?: number;
  afterSubmit?: { (): void };
}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(dataSelectors.getCategories);
  const user = useAppSelector(authSelectors.getUser);
  const userId = user?.id || 0;

  const handleCreateTransaction = (values: INewTransaction) => {
    values.label = values.label.trim();
    dispatch(addTransaction(values));
  };

  const handleUpdateTransaction = (values: ITransaction) => {
    values.label = values.label.trim();
    dispatch(updateTransaction(values));
  };

  const emptyRecord = {
    date: dayjs(new Date()).format('YYYY-MM-DD'),
    categoryId: categories[0]?.id || -1,
    label: '',
    amount: 0,
  };

  const getTransactionById = () => {
    const transaction = useAppSelector(dataSelectors.getTransactions).find(
      (e) => e.id === transactionId
    );
    if (transaction) {
      const response = {
        ...transaction,
        date: dayjs(transaction.date).format('YYYY-MM-DD'),
        categoryId: transaction.categoryId || categories[0].id,
      };
      return response;
    }
    return null;
  };

  const initialRecord: {
    date: string;
    categoryId: number;
    label: string;
    amount: number;
    id?: number;
  } = transactionId ? getTransactionById() || emptyRecord : emptyRecord;

  const formik = useFormik({
    initialValues: initialRecord,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.date = dayjs(values.date).toISOString();
      const actionProps = {
        ...values,
        categoryId: values.categoryId,
        userId,
      };
      if (values.id) {
        handleUpdateTransaction({
          ...actionProps,
          id: values.id as number,
        });
      }
      if (!values.id) {
        handleCreateTransaction(actionProps);
      }
      formik.resetForm();
      if (afterSubmit) afterSubmit();
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TransFormBox>
          <DashInput
            gridcol="span 2"
            id="label"
            name="label"
            label="Transaction Name"
            type="text"
            value={formik.values.label}
            onChange={formik.handleChange}
            error={formik.touched.label && Boolean(formik.errors.label)}
            helperText={formik.touched.label && formik.errors.label}
            autoComplete="off"
          />
          <DashInput
            id="amount"
            name="amount"
            label="Sum of Transaction"
            type="number"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
            InputProps={{
              endAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StyledDatePicker
              label="Date"
              inputFormat="DD/MM/YYYY"
              value={formik.values.date}
              onChange={(value) => formik.setFieldValue('date', value)}
              renderInput={(params) => (
                <DashInput
                  {...params}
                  error={formik.touched.date && Boolean(formik.errors.date)}
                  helperText={formik.touched.date && formik.errors.date}
                  id="date"
                  name="date"
                />
              )}
            />
          </LocalizationProvider>
          {/* <DashInput
            id="date"
            name="date"
            label="Date"
            type="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          /> */}
          {categories.length > 0 && (
            <DashInput
              id="categoryId"
              select
              name="categoryId"
              label="Category"
              type="number"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
            >
              {categories &&
                categories.map((e) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.label}
                  </MenuItem>
                ))}
            </DashInput>
          )}
          <ButtonSecondary type="submit" style={{ width: 'auto' }}>
            {formik.values.id ? 'Update' : 'Add'}
          </ButtonSecondary>
        </TransFormBox>
      </form>
    </>
  );
};
