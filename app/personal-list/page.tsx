'use client'
import React, { useState, useEffect } from 'react';
import {
  Typography, makeStyles, Grid, Card, CardContent, CardActions, Button, 
} from '@material-ui/core';
import { axiosGet, axiosDelete } from '../utils/axiosHelper';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
  card: {
    backgroundColor: '#ffffff', 
    marginBottom: theme.spacing(2),
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
  },
  cardContent: {
    paddingBottom: theme.spacing(1),
  },
  cardActions: {
    justifyContent: 'space-between',
    padding: theme.spacing(1),
  },
  button: {
    backgroundColor: '#ffcd38', 
    color: '#333333',
    '&:hover': {
      backgroundColor: '#ffc107',
    },
  },
  link: {
    marginTop: theme.spacing(2),
  },
}));

const PersonalListPage = () => {
  const classes = useStyles();
  const [personalCollection, setPersonalCollection] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPersonalCollection = async () => {
      try {
        const response = await axiosGet('/api/users/collection');
        setPersonalCollection(response.data);
      } catch (error) {
        console.error('Error fetching personal collection:', error);
      }
    };

    fetchPersonalCollection();
  }, []);

  const handleRemoveFromCollection = async (recipeId: string) => {
    try {
      await axiosDelete(`/api/users/collection/${recipeId}`);
      setPersonalCollection((prevCollection) =>
        prevCollection.filter((recipe: any) => recipe._id !== recipeId)
      );
    } catch (error) {
      console.error('Error removing from collection:', error);
    }
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Personal Recipe List
      </Typography>
      {personalCollection.length === 0 ? (
        <Typography variant="body1">Your personal recipe list is empty.</Typography>
      ) : (
        <>
          <Grid container spacing={3} justify="center">
            {personalCollection.map((recipe: any) => (
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
                      onClick={() => handleRemoveFromCollection(recipe._id)}
                    >
                      Remove from Collection
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <Link href="/dashboard" className={classes.link}>
            Go back to Dashboard
       </Link>
    </div>
  );
};

export default PersonalListPage;
