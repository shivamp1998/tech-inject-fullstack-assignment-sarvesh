'use client';
import React, { useState } from 'react';
import { Typography, Button, makeStyles, TextField, IconButton, Card, CardContent } from '@material-ui/core';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { Add, Remove } from '@material-ui/icons';
import { useSnackbar } from 'notistack';

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
  ingredientsContainer: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  ingredientRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  link: {
    marginTop: theme.spacing(2),
  },
  imagePreview: {
    width: '100%',
    maxHeight: 200,
    objectFit: 'cover',
    marginBottom: theme.spacing(2),
  },
}));

const AddRecipePage = () => {
  const classes = useStyles();
  const [upload, setUpload] = useState(false);

  const [recipe, setRecipe] = useState({
    name: '',
    category: '',
    ingredients: [{ name: '', quantity: '' }],
    instructions: '',
    image: '',
  });
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar(); 

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (index: number, e: any) => {
    const { name, value } = e.target;
    const ingredients:any = [...recipe.ingredients];
    ingredients[index][name] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: '', quantity: '' }]
    });
  };

  const removeIngredient = (index: number) => {
    const ingredients = [...recipe.ingredients];
    ingredients.splice(index, 1);
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/recipe/add', recipe);
      if (response.data.success) {
        enqueueSnackbar('Recipe added successfully!', {variant: 'success'});
        router.push('/dashboard');
      } else {
        enqueueSnackbar('Error in adding Recipe!', {variant: 'error'});
      }
    } catch (error) {
      console.log('error', error)
      if(error instanceof AxiosError) {
        enqueueSnackbar(error?.response?.data?.message, {variant: 'error'})
        return;
      }
      enqueueSnackbar('Error in adding Recipe!', {variant: 'error'});
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
        <div className={classes.ingredientsContainer}>
          <Typography variant="h6">Ingredients</Typography>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className={classes.ingredientRow}>
              <TextField
                label="Ingredient"
                name="name"
                variant="outlined"
                className={classes.textField}
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
                size="medium"
              />
              <TextField
                label="Quantity"
                name="quantity"
                variant="outlined"
                className={classes.textField}
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                size="medium"
              />
              <IconButton onClick={() => removeIngredient(index)}>
                <Remove />
              </IconButton>
            </div>
          ))}
          <Button variant="outlined" onClick={addIngredient} startIcon={<Add />}>
            Add Ingredient
          </Button>
        </div>
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
        {recipe.image && (
          <Card>
            <CardContent>
              <img src={recipe.image} alt="Recipe Image" className={classes.imagePreview} />
            </CardContent>
          </Card>
        )}
        <Button type="submit" variant="contained" className={classes.button} style={{marginTop: '10px'}}>
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
