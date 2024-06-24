'use client';
import React, { useState, useEffect } from 'react';
import {
  Typography, Button, makeStyles, Grid, TextField, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core';
import { axiosGet, axiosPost, axiosDelete, axiosPatch } from '../utils/axiosHelper';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    backgroundColor: '#f7f7f7',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  title: {
    color: '#333333',
  },
  button: {
    backgroundColor: '#ffcd38',
    color: '#333333',
    '&:hover': {
      backgroundColor: '#ffc107',
    },
    marginBottom: theme.spacing(2),
  },
  searchField: {
    marginBottom: theme.spacing(4),
  },
  card: {
    backgroundColor: '#ffffff',
    marginBottom: theme.spacing(2),
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  cardContent: {
    paddingBottom: theme.spacing(1),
    flexGrow: 1,
  },
  cardActions: {
    justifyContent: 'space-between',
    padding: theme.spacing(1),
  },
  dialogContent: {
    backgroundColor: '#ffffff',
  },
  dialogActions: {
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  ingredientContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  addIngredientButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: 200,
    objectFit: 'cover',
    marginBottom: theme.spacing(1),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [editRecipe, setEditRecipe] = useState<any>(null);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axiosGet('/api/recipe');
        setRecipes(response.data.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [loader]);

  const handleSearch = async () => {
    try {
      const response = await axiosGet(`/api/recipe?query=${searchQuery}`);
      setRecipes(response.data.data);
    } catch (error) {
      setLoader(false);
      if(error instanceof AxiosError) {
        enqueueSnackbar(error?.response?.data?.message || error?.response?.data?.error || 'something went wrong!', {variant: 'error'})
        return;
      }
      enqueueSnackbar('Error in adding Recipe!', {variant: 'error'});
    }
  };

  const handleRemoveFromCollection = async (recipeId: string) => {
    setLoader(true)
    try {
      const response = await axiosDelete(`/api/recipe/delete/${recipeId}`);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      if(error instanceof AxiosError) {
        enqueueSnackbar(error?.response?.data?.message || error?.response?.data?.error || 'something went wrong!', {variant: 'error'})
        return;
      }
      enqueueSnackbar("Error in Deleting Recipe", {variant: 'error'})
    }
  };

  const handleViewDetails = (recipe: any) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseDetails = () => {
    setSelectedRecipe(null);
  };

  const handleAddRecipe = () => {
    router.push('/add-recipe');
  };

  const handleViewPersonalList = () => {
    router.push('/personal-list');
  };

  const handleEditRecipe = (recipe: any) => {
    setEditRecipe({ ...recipe });
  };

  const handleSaveEdit = async () => {
    setLoader(true);
    try {
      await axiosPatch(`/api/recipe/${editRecipe._id}`, {}, editRecipe);
      setEditRecipe(null);
      setLoader(false);
      enqueueSnackbar('Recipe updated successfully!', { variant: 'success' });
    } catch (error) {
      setLoader(false);
      if (error instanceof AxiosError) {
        enqueueSnackbar(error?.response?.data?.message || error?.response?.data?.error || 'something went wrong!', { variant: 'error' });
        return;
      }
      enqueueSnackbar('Error in updating Recipe!', { variant: 'error' });
    }
  };

  const handleEditChange = (e: any) => {
    const { name, value } = e.target;
    setEditRecipe({ ...editRecipe, [name]: value });
  };

  const handleIngredientChange = (index: number, field: string, value: string) => {
    const newIngredients = [...editRecipe.ingredients];
    newIngredients[index][field] = value;
    setEditRecipe({ ...editRecipe, ingredients: newIngredients });
  };

  const handleAddIngredient = () => {
    setEditRecipe({ ...editRecipe, ingredients: [...editRecipe.ingredients, { name: '', quantity: '' }] });
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = editRecipe.ingredients.filter((_: any, i: number) => i !== index);
    setEditRecipe({ ...editRecipe, ingredients: newIngredients });
  };

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography variant="h4" className={classes.title}>
          Recipe Dashboard
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <TextField
        label="Search Recipes"
        variant="outlined"
        fullWidth
        className={classes.searchField}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <Button variant="contained" className={classes.button} onClick={handleSearch}>
        Search
      </Button>
      <Button variant="contained" className={classes.button} onClick={handleAddRecipe}>
        Add Recipe
      </Button>
      <Button variant="contained" className={classes.button} onClick={handleViewPersonalList}>
        View Personal List
      </Button>
      {recipes.length === 0 && (
        <div>
          <Typography variant="h6" gutterBottom>
            Your recipe list is empty.
          </Typography>
        </div>
      )}
      <Grid container spacing={3} justify="center">
        {recipes.map((recipe: any) => (
          <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                {recipe.image && (
                  <img src={recipe.image} alt={recipe.name} className={classes.image} />
                )}
                <Typography variant="h6">{recipe.name}</Typography>
                <Typography color="textSecondary">{recipe.category}</Typography>
                <Typography>
                  Ingredients:
                  {recipe.ingredients.map((ingredient: any, index: number) => (
                    <div key={index}>
                      {ingredient.name} - {ingredient.quantity}
                    </div>
                  ))}
                </Typography>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <Button
                  size="small"
                  className={classes.button}
                  onClick={() => handleViewDetails(recipe)}
                >
                  View Details
                </Button>
                <Button
                  size="small"
                  className={classes.button}
                  onClick={() => handleEditRecipe(recipe)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  className={classes.button}
                  onClick={() => handleRemoveFromCollection(recipe._id)}
                >
                  Remove from Collection
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedRecipe && (
        <Dialog open={Boolean(selectedRecipe)} onClose={handleCloseDetails} fullWidth maxWidth="sm">
          <DialogTitle>{selectedRecipe.name}</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Typography variant="subtitle1" color="textSecondary">
              {selectedRecipe.category}
            </Typography>
            <Typography variant="subtitle2">Ingredients:</Typography>
            <Typography>
              {selectedRecipe.ingredients.map((ingredient: any, index: number) => (
                <div key={index}>
                  {ingredient.name} - {ingredient.quantity}
                </div>
              ))}
            </Typography>
            <Typography variant="subtitle2">Instructions:</Typography>
            <Typography>{selectedRecipe.instructions}</Typography>
            {selectedRecipe.image && <img src={selectedRecipe.image} alt={selectedRecipe.name} style={{ width: '100%', marginTop: '10px' }} />}
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button variant="contained" className={classes.button} onClick={handleCloseDetails}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {editRecipe && (
        <Dialog open={Boolean(editRecipe)} onClose={() => setEditRecipe(null)} fullWidth maxWidth="sm">
          <DialogTitle>Edit Recipe</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              className={classes.textField}
              value={editRecipe.name}
              onChange={handleEditChange}
              size="medium"
            />
            <TextField
              label="Category"
              name="category"
              variant="outlined"
              className={classes.textField}
              value={editRecipe.category}
              onChange={handleEditChange}
              size="medium"
            />
            <Typography variant="subtitle2">Ingredients:</Typography>
            {editRecipe.ingredients.map((ingredient: any, index: number) => (
              <div className={classes.ingredientContainer} key={index}>
                <TextField
                  label="Ingredient Name"
                  variant="outlined"
                  className={classes.textField}
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  size="medium"
                />
                <TextField
                  label="Quantity"
                  variant="outlined"
                  className={classes.textField}
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  size="medium"
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="contained"
              onClick={handleAddIngredient}
              className={classes.addIngredientButton}
            >
              Add Ingredient
            </Button>
            <TextField
              label="Instructions"
              name="instructions"
              variant="outlined"
              multiline
              rows={4}
              className={classes.textField}
              value={editRecipe.instructions}
              onChange={handleEditChange}
              size="medium"
            />
            <TextField
              label="Image URL"
              name="image"
              variant="outlined"
              className={classes.textField}
              value={editRecipe.image}
              onChange={handleEditChange}
              size="medium"
            />
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button variant="contained" className={classes.button} onClick={handleSaveEdit}>
              Save
            </Button>
            <Button variant="contained" className={classes.button} onClick={() => setEditRecipe(null)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Dashboard;
