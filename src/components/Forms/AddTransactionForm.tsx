import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { authSelectors } from '../../store/auth/authSelectors';
import { dataSelectors } from '../../store/data/dataSelectors';
import { addTransaction } from '../../store/data/dataThunk';
import { INewTransaction } from '../../types/data';
import { ButtonSecondary } from '../Buttons/ButtonSecondary';
import { MenuItem } from '@mui/material';
import { DashInput } from '../Inputs/DashInput';

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

const validationSchema = Yup.object({
  label: Yup.string().required('Label is required'),
  categoryId: Yup.number().required('Choose a category'),
  date: Yup.date()
    .transform((value) => {
      return value ? dayjs(value).toDate() : value;
    })
    .required('Date is required')
    .max(new Date(), 'Future date not allowed'),
  amount: Yup.number()
    .typeError('age must be a number')
    .required('Input a sum'),
});

export const AddTransactionForm = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(dataSelectors.getCategories);
  const user = useAppSelector(authSelectors.getUser);
  const userId = user?.id || 0;

  const handleCreateTransaction = (values: INewTransaction) => {
    values.label = values.label.trim();
    dispatch(addTransaction(values));
  };

  const formik = useFormik({
    initialValues: {
      date: dayjs(new Date()).format('YYYY-MM-DD'),
      categoryId: categories[0]?.id || '',
      label: '',
      amount: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.date = dayjs(values.date).toISOString();

      handleCreateTransaction({
        ...values,
        categoryId: values.categoryId as number,
        userId,
      });
      formik.resetForm();
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
            label="Sum of transaction"
            type="number"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
          <DashInput
            id="date"
            name="date"
            label="Date"
            type="date"
            value={formik.values.date}
            onChange={formik.handleChange}
          />
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
          <ButtonSecondary type="submit" style={{ width: 'auto' }}>
            Add
          </ButtonSecondary>
        </TransFormBox>
      </form>
    </>
  );
};
