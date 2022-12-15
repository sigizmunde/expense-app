import { useMemo } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { authSelectors } from '../../store/auth/authSelectors';
import { dataSelectors } from '../../store/data/dataSelectors';
import { addCategory, updateCategory } from '../../store/data/dataThunk';
import { ICategory, INewCategory } from '../../types/data';
import { ButtonSecondary } from '../Buttons/ButtonSecondary';
import { MenuItem } from '@mui/material';
import { DashInput } from '../Inputs/DashInput';
import { FileUploadInput } from '../Inputs/FileUploadInput';
import { getLightColors } from '../../utils/colorLibrary';
import { ColorSwatch } from '../ColorBadges/ColorSwatch';
import { DashSelectInput } from '../Inputs/DashSelectInput';

const CatFormBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '100%',
  height: 'fit-content',
  flex: '1 0 auto',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'end',
  justifyContent: 'stretch',
  rowGap: theme.spacing(1),
  columnGap: theme.spacing(3),
  '& > *:not(:first-of-type)': {
    marginTop: 0,
  },
}));

const colorRegexp = new RegExp('^#(?:[0-9a-fA-F]{3,4}){1,2}$');

const validationSchema = Yup.object({
  label: Yup.string().required('Label is required'),
  image: Yup.object()
    .nullable()
    .shape({
      attachment: Yup.mixed().test(
        'fileSize',
        'The file is too large',
        (value) => {
          if (!value?.length) return true; // attachment is optional
          return value[0].size <= 500000;
        }
      ),
    }),
  color: Yup.string().transform((value) => {
    const parsedColor =
      colorRegexp.test(value) || value === null ? value : null;
    return parsedColor;
  }),
});

export const CategoryForm = ({
  categoryId,
  afterSubmit,
}: {
  categoryId?: number;
  afterSubmit?: { (): void };
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(authSelectors.getUser);
  const userId = user?.id || 0;
  const categories = useAppSelector(dataSelectors.getCategories);

  const currentRecord = categories.find((e) => e.id === categoryId) || null;

  const colors = useMemo(() => {
    const palette = getLightColors();
    if (
      categoryId &&
      categories &&
      !palette.find((e) => {
        e.id === -1;
      })
    ) {
      palette.unshift({
        id: -1,
        color: currentRecord?.color || '',
      });
    }
    return palette;
  }, []);

  const handleCreateCategory = (values: INewCategory) => {
    values.label = values.label.trim();
    dispatch(addCategory(values));
  };

  const handleUpdateCategory = (values: ICategory) => {
    values.label = values.label.trim();
    dispatch(updateCategory(values));
  };

  const emptyRecord = {
    label: '',
    image: null,
    color: colors[0].color,
    userId,
    id: null,
  };

  const initialRecord = categoryId
    ? {
        ...(currentRecord || emptyRecord),
        image: null,
        color: currentRecord?.color || colors[0].color,
      }
    : emptyRecord;

  const formik = useFormik({
    initialValues: initialRecord,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.id) {
        handleUpdateCategory({
          id: values.id,
          label: values.label as string,
          color: values.color,
          userId,
        });
      }
      if (!values.id) {
        handleCreateCategory({
          label: values.label as string,
          color: values.color,
          userId,
        });
      }
      formik.resetForm();
      if (afterSubmit) afterSubmit();
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <CatFormBox>
          <DashInput
            gridcol="span 2"
            id="label"
            name="label"
            label="Category Name"
            type="text"
            value={formik.values.label.trimStart()}
            onChange={formik.handleChange}
            error={formik.touched.label && Boolean(formik.errors.label)}
            helperText={formik.touched.label && formik.errors.label}
            autoComplete="off"
          />
          <FileUploadInput
            id="image"
            name="image"
            label="Add an Image"
            type="file"
            disabled
            onChange={formik.handleChange}
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={formik.touched.image && formik.errors.image}
          />
          <DashSelectInput
            id="color"
            name="color"
            label="Color"
            type="string"
            value={formik.values.color}
            onChange={formik.handleChange}
            sx={{
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                color: formik.values.color,
              },
            }}
          >
            {colors &&
              colors.map((e) => (
                <MenuItem key={e.id} value={e.color}>
                  <ColorSwatch color={e.color} />
                </MenuItem>
              ))}
          </DashSelectInput>
          <ButtonSecondary type="submit" style={{ width: 'auto' }}>
            {formik.values.id ? 'Update' : 'Add'}
          </ButtonSecondary>
        </CatFormBox>
      </form>
    </>
  );
};
