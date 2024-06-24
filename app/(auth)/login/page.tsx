'use client'
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, Typography, makeStyles } from '@material-ui/core';
import { axiosPost } from '../../utils/axiosHelper';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation' 

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7f7f7',
  },
  formWrapper: {
    backgroundColor: '#ffffff', 
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: 400,
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  error: {
    color: '#d32f2f',
    marginBottom: theme.spacing(2),
    fontSize: '0.875rem',
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: '#ffcd38', 
    color: '#333333',
    '&:hover': {
      backgroundColor: '#ffc107',
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    color: '#333333',
  },
}));

const Signup = () => {
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string().min(6, 'Password should be greater than 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values: any, actions: any) => {
    setLoading(true);
    console.log('submmitting form', values)
    try {
      setLoading(false);
      const response = await axiosPost(`/api/login`, {}, values);
      if(response.data?.success) {
        router.push('/dashboard');
      }
    }  catch (error: any) {
      setLoading(false)
      if (error instanceof AxiosError) {
        enqueueSnackbar(error?.response?.data?.message || 'An error occurred', { variant: 'error' });
      } else {
        enqueueSnackbar(error?.message, { variant: 'error' });
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.formWrapper}>
        <Typography variant="h5" className={classes.title}>
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={classes.form}>
              <Field
                as={TextField}
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                className={classes.field}
                error={touched.email && !!errors.email}
                helperText={<ErrorMessage name="email" component="div" className={classes.error} />}
              />
              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                className={classes.field}
                error={touched.password && !!errors.password}
                helperText={<ErrorMessage name="password" component="div" className={classes.error} />}
              />
              <Button
                variant="contained"
                type="submit"
                fullWidth
                className={classes.button}
              >
                Login
              </Button>
              <Button
                variant="contained"
                fullWidth
                className={classes.button}
                onClick={() => router.push('/signup')}
              >
                {loading ? 'Loading...' : "Signup"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
