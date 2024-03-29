import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import { UserFormData } from '../../types/commons';
import { YesNo } from '../../types/enums';
import UserForm from './UserForm';
import UserFormik from './UserFormik';
import { editUserSchema, newUserSchema } from './utils';

const handleCancel = action('handleCancel');
const handleSubmit = action('handleSubmit');
const handleBlur = action('handleBlur');
const handleChange = action('handleChange');

const handleSubmitValues = action('handleSubmitValues');
const withPasswordField = boolean('withPasswordField', false);

storiesOf(`${CATEGORIES.ADMIN}UserForm`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const email = text('email', '');
    const emailError = text('emailError', '');
    const emailTouched = boolean('emailTouched', false);
    const firstName = text('firstName', '');
    const firstNameError = text('firstNameError', '');
    const firstNameTouched = boolean('firstNameTouched', false);
    const isSubmitting = boolean('isSubmitting', false);
    const isValid = boolean('isValid', false);
    const lastName = text('lastName', '');
    const lastNameError = text('lastNameError', '');
    const lastNameTouched = boolean('lastNameTouched', false);
    const middleName = text('middleName', '');
    const middleNameError = text('middleNameError', '');
    const middleNameTouched = boolean('middleNameTouched', false);
    const phone = text('phone', '');
    const phoneError = text('phoneError', '');
    const phoneTouched = boolean('phoneTouched', false);
    const sendEmail = boolean('sendEmail', false);
    const tmpPassword = text('tmpPassword', '');
    const tmpPasswordError = text('tmpPasswordError', '');
    const tmpPasswordTouched = boolean('tmpPasswordTouched', false);

    const values: UserFormData = {
      email,
      firstName,
      id: '',
      isAdmin: YesNo.No,
      lastName,
      middleName,
      phone,
      sendEmail,
      tmpPassword,
      username: '',
    };

    const errors = {
      email: emailError,
      firstName: firstNameError,
      lastName: lastNameError,
      middleName: middleNameError,
      phone: phoneError,
      tmpPassword: tmpPasswordError,
    };

    const touched = {
      email: emailTouched,
      firstName: firstNameTouched,
      lastName: lastNameTouched,
      middleName: middleNameTouched,
      phone: phoneTouched,
      tmpPassword: tmpPasswordTouched,
    };

    return (
      <UserForm
        errors={errors}
        handleBlur={handleBlur}
        handleCancel={handleCancel}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isValid={isValid}
        touched={touched}
        values={values}
        withPasswordField={withPasswordField}
      />
    );
  })
  .add('withFormik', () => {
    return (
      <UserFormik handleSubmitValues={handleSubmitValues} handleCancel={handleCancel} validationSchema={withPasswordField ? newUserSchema : editUserSchema} />
    );
  });
