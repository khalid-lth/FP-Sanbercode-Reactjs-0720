import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Sidebar from '../layout/sidebar';
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
            marginBottom: "20px",
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
            axios.get(`https://backendexample.sanbersy.com/api/games`)
                .then(res => {
                    setDaftarMovies(res.data.map(el => { return { id: el.id, name: el.name, genre: el.genre, singlePlayer: el.singlePlayer, multiplayer: el.multiplayer, platform: el.platform, release: el.release, image_url: el.image_url } }))
                })
        }
    }, [daftarMovies])

    const classes = useStyles();
    return (

        <div className={classes.root}>
            <Sidebar />
            {daftarMovies !== null && daftarMovies.map(el => {
                return (
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Link to={`/detailgame/${el.id}`}>
                                    <ButtonBase className={classes.image}>
                                        <img className={classes.img} alt="gambar" src={el.image_url} />
                                    </ButtonBase>
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1">
                                            <strong>{el.name}</strong>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                             {el.platform}
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
