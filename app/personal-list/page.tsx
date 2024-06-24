'use client';
import React, { useState, useEffect } from 'react';
import {
  Typography, makeStyles, Grid, Card, CardContent, CardActions, Button, 
} from '@material-ui/core';
import { axiosGet, axiosDelete } from '../utils/axiosHelper';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
  link: {
    marginTop: theme.spacing(2),
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: 200,
    objectFit: 'cover',
    marginBottom: theme.spacing(1),
  },
}));

const PersonalListPage = () => {
  const classes = useStyles();
  const [personalCollection, setPersonalCollection] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPersonalCollection = async () => {
      try {
        const response = await axiosGet('/api/recipe/personallist');
        setPersonalCollection(response.data.data);
      } catch (error) {
        console.error('Error fetching personal collection:', error);
      }
    };

    fetchPersonalCollection();
  }, []);

  const handleRemoveFromCollection = async (recipeId: string) => {
    try {
      await axiosDelete(`/api/recipe/personallist/${recipeId}`);
      setPersonalCollection((prevCollection) =>
        prevCollection.filter((recipe: any) => recipe._id !== recipeId)
      );
    } catch (error) {
      console.error('Error removing from collection:', error);
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography variant="h4" className={classes.title}>
          Personal Recipe List
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      {personalCollection.length === 0 ? (
        <Typography variant="body1">Your personal recipe list is empty.</Typography>
      ) : (
        <Grid container spacing={3} justify="center">
          {personalCollection?.map((recipe: any) => (
            <Grid item xs={12} sm={6} md={4} key={recipe._id}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  {recipe.image && (
                    <img src={recipe.image} alt={recipe.name} className={classes.image} />
                  )}
                  <Typography variant="h6">{recipe.name}</Typography>
                  <Typography color="textSecondary">{recipe.category}</Typography>
                  <Typography variant="subtitle2">Ingredients:</Typography>
                  {recipe.ingredients.map((ingredient: any, index: number) => (
                    <Typography key={index}>
                      {ingredient.name} - {ingredient.quantity}
                    </Typography>
                  ))}
                </CardContent>
                <CardActions className={classes.cardActions}>
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
      )}
      <Link href="/dashboard" className={classes.link}>
        Go back to Dashboard
      </Link>
    </div>
  );
};

export default PersonalListPage;
