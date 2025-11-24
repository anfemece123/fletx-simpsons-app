import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signUp } from '../../store/slices/authSlice';

const signUpSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Minimum 6 characters'),
});

type FormValues = {
  email: string;
  password: string;
};

type FormErrors = Partial<FormValues>;

export const useSignUp = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading);

  const [values, setValues] = useState<FormValues>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = useCallback(
    <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
      setValues(prev => ({ ...prev, [field]: value }));
      setErrors(prev => ({ ...prev, [field]: undefined }));
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    try {
      setErrors({});

      const payload: FormValues = {
        email: values.email.trim(),
        password: values.password,
      };

      await signUpSchema.validate(payload, { abortEarly: false });

      await dispatch(signUp(payload)).unwrap();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const formErrors: FormErrors = {};
        err.inner.forEach(e => {
          const path = e.path as keyof FormValues | undefined;
          if (path && !formErrors[path]) {
            formErrors[path] = e.message;
          }
        });
        setErrors(formErrors);
        return;
      }

      Alert.alert(
        'Error',
        (err as Error)?.message ?? 'Unable to create account.',
      );
    }
  }, [dispatch, values.email, values.password]);

  return {
    values,
    errors,
    loading,
    handleChange,
    handleSubmit,
  };
};
