'use client'
import React, { useState } from 'react';
import { Typography, Button, makeStyles, TextField } from '@material-ui/core';
import { axiosPost } from '../utils/axiosHelper';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    backgroundColor: '#f7f7f7',
    minHeight: '100vh',
  },
  title: {
    color: '#333333',
    marginBottom: theme.spacing(2),
  },
  button: {
    backgroundColor: '#ffcd38', 
    color: '#333333',
    '&:hover': {
      backgroundColor: '#ffc107',
    },
    marginBottom: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  textField: {
    width: '100%',
    marginBottom: theme.spacing(2),
    '& input': {
      padding: '10px 14px', 
      fontSize: '1rem', 
    },
  },
  link: {
    marginTop: theme.spacing(2),
  },
}));

const AddRecipePage = () => {
  const classes = useStyles();
  const [recipe, setRecipe] = useState({
    name: '',
    category: '',
    ingredients: '',
    instructions: '',
    image: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPost('/api/recipes', {}, recipe);
      alert('Recipe added successfully!');
      // Optionally, redirect to the dashboard or clear the form
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Add Recipe
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          className={classes.textField}
          value={recipe.name}
          onChange={handleChange}
          size="medium"
        />
        <TextField
          label="Category"
          name="category"
          variant="outlined"
          className={classes.textField}
          value={recipe.category}
          onChange={handleChange}
          size="medium"
        />
        <TextField
          label="Ingredients"
          name="ingredients"
          variant="outlined"
          multiline
          rows={4}
          className={classes.textField}
          value={recipe.ingredients}
          onChange={handleChange}
          size="medium"
        />
        <TextField
          label="Instructions"
          name="instructions"
          variant="outlined"
          multiline
          rows={4}
          className={classes.textField}
          value={recipe.instructions}
          onChange={handleChange}
          size="medium"
        />
        <TextField
          label="Image URL"
          name="image"
          variant="outlined"
          className={classes.textField}
          value={recipe.image}
          onChange={handleChange}
          size="medium"
        />
        <Button type="submit" variant="contained" className={classes.button}>
          Add Recipe
        </Button>
      </form>
      <Link href="/dashboard" className={classes.link}>
            Go back to Dashboard
       </Link>
    </div>
  );
};

export default AddRecipePage;
