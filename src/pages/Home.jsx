import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Sidebar from '../layout/sidebar';
import Rating from '@material-ui/lab/Rating';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            flexDirection: 'column',
            '& > * + *': {
                marginTop: theme.spacing(1),
            },
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 500,
            marginBottom: "40px",
        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
    }),
);



const DaftarMovies = () => {
    const [daftarMovies, setDaftarMovies] = useState(null)

    useEffect(() => {
        if (daftarMovies === null) {
            axios.get(`https://backendexample.sanbersy.com/api/movies`)
                .then(res => {
                    setDaftarMovies(res.data.map(el => { return { id: el.id, title: el.title, description: el.description, year: el.year, duration: el.duration, genre: el.genre, rating: el.rating, review: el.review, image_url: el.image_url }}))
                })
        }
    }, [daftarMovies])
    
    const classes = useStyles();
    return (
        
        <div className={classes.root}>
            <Sidebar />
            {daftarMovies !== null && daftarMovies.map( el => {
                return (
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
              <Link to={`/detailmovie/${el.id}`}>
            <ButtonBase className={classes.image}>               
                <img className={classes.img} alt="gambar" src={el.image_url} />
            </ButtonBase>
             </Link>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {el.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <Rating name="half-rating-read" defaultValue={el.rating} max={10} readOnly />
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  genre: {el.genre}
                </Typography>
                <Grid item xs></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
                )
            })}
    </div>
    )
}

export default DaftarMovies
