import { Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import noop from '../../utils/noop';
import FeedbackForm, { Values } from './FeedbackForm';

interface Props {
  className?: string;
  handleSubmitValues: (payload: Values) => Promise<void>;
}

const initialValues: Values = {
  productFeedback: '',
  subject: '',
};

const validationSchema = Yup.object().shape({
  productFeedback: Yup.string().required('Required'),
  subject: Yup.string().required('Required'),
});

const handleFormikSubmit = (handleSubmitValues: Props['handleSubmitValues']) => async (values: Values, actions: FormikActions<Values>) => {
  actions.setSubmitting(true);

  await handleSubmitValues(values);

  actions.setSubmitting(false);
};

const renderForm = (className?: string) => (props: FormikProps<Values>) => {
  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values } = props;

  return (
    <FeedbackForm
      className={className}
      errors={errors}
      handleBlur={handleBlur}
      handleClose={noop}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      touched={touched}
      values={values}
    />
  );
};

const FeedbackFormik = ({ className, handleSubmitValues }: Props) => (
  <Formik initialValues={initialValues} onSubmit={handleFormikSubmit(handleSubmitValues)} render={renderForm(className)} validationSchema={validationSchema} />
);

export default FeedbackFormik;
