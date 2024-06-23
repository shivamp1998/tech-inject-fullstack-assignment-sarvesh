'use client'
import React, { useState, useEffect } from 'react';
import {
  Typography, Button, makeStyles, Grid, TextField, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core';
import { axiosGet, axiosPost, axiosDelete } from '../utils/axiosHelper';
import { useRouter } from 'next/navigation';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    backgroundColor: '#f7f7f7', // Light gray background color
    minHeight: '100vh',
  },
  title: {
    color: '#333333', // Dark gray color for title
    marginBottom: theme.spacing(2),
  },
  button: {
    backgroundColor: '#ffcd38', // Yellow button color
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
    backgroundColor: '#ffffff', // White background color for card
    marginBottom: theme.spacing(2),
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Subtle shadow
  },
  cardContent: {
    paddingBottom: theme.spacing(1),
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
}));

const Dashboard = () => {
  const classes = useStyles();
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [personalCollection, setPersonalCollection] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axiosGet('/api/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axiosGet(`/api/recipes/search?query=${searchQuery}`);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  const handleAddToCollection = async (recipeId) => {
    try {
      const response = await axiosPost(`/api/users/collection`, { recipeId });
      setPersonalCollection(response.data);
    } catch (error) {
      console.error('Error adding to collection:', error);
    }
  };

  const handleRemoveFromCollection = async (recipeId) => {
    try {
      const response = await axiosDelete(`/api/users/collection/${recipeId}`);
      setPersonalCollection(response.data);
    } catch (error) {
      console.error('Error removing from collection:', error);
    }
  };

  const handleViewDetails = (recipe) => {
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

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Recipe Dashboard
      </Typography>
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
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h6">{recipe.name}</Typography>
                <Typography color="textSecondary">{recipe.category}</Typography>
                <Typography>{recipe.ingredients.join(', ')}</Typography>
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
                  onClick={() => handleAddToCollection(recipe._id)}
                >
                  Add to Collection
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
            <Typography>{selectedRecipe.ingredients.join(', ')}</Typography>
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
    </div>
  );
};

export default Dashboard;
