'use client';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Typography, makeStyles } from '@material-ui/core';

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
    marginBottom: theme.spacing(3),
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

  const initialValues: Signup = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <div className={classes.container}>
      <div className={classes.formWrapper}>
        <Typography variant="h5" className={classes.title}>
          Signup
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            console.log(values, actions);
          }}
        >
          {({ handleSubmit }) => (
            <Form className={classes.form} onSubmit={handleSubmit}>
              <Field
                as={TextField}
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                className={classes.field}
              />
              <Field
                as={TextField}
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                className={classes.field}
              />
              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                className={classes.field}
              />
              <Field
                as={TextField}
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                className={classes.field}
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
