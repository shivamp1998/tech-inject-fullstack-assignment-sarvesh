  'use client';
  import React from 'react';
  import { Formik, Form, Field, ErrorMessage } from 'formik';
  import { TextField, Button, Typography, makeStyles } from '@material-ui/core';
  import { axiosPost } from '../../utils/axiosHelper';
  import * as Yup from 'yup';
  import { useSnackbar } from 'notistack';
  import { AxiosError } from 'axios';

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3e5ab', // Warm, cozy background color
    },
    formWrapper: {
      backgroundColor: '#fff7e6', // Light, warm background color for form
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
      color: '#d32f2f', // Error message color
      marginBottom: theme.spacing(2),
      fontSize: '0.875rem',
    },
    button: {
      marginTop: theme.spacing(2),
      backgroundColor: '#ff7043', // Cozy, warm button color
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#ff5722',
      },
    },
    title: {
      marginBottom: theme.spacing(2),
      color: '#6d4c41', // Warm color for title
    },
  }));

  interface Signup {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const Signup: React.FC<{}> = () => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const initialValues: Signup = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    const signupSchema = Yup.object().shape({
      name: Yup.string().required('Name is Required'),
      email: Yup.string().email('Invalid email').required('Email is Required'),
      password: Yup.string().min(6, 'Password should be greater than 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    });

    const handleSubmit = async (values: Signup, actions: any) => {
      try {
        const response = await axiosPost(`/api/signup`, {}, values);
        console.log(response.data.data);
      }  catch (error: any) {
        if (error instanceof AxiosError) {
          enqueueSnackbar(error?.response?.data?.error || 'An error occurred', { variant: 'error' });
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
            Signup
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className={classes.form}>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  className={classes.field}
                  error={touched.name && !!errors.name}
                  helperText={<ErrorMessage name="name" component="div" className={classes.error} />}
                />
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
                <Field
                  as={TextField}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  className={classes.field}
                  error={touched.confirmPassword && !!errors.confirmPassword}
                  helperText={<ErrorMessage name="confirmPassword" component="div" className={classes.error} />}
                />
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  className={classes.button}
                >
                  Signup
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  };

  export default Signup;
