import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Sidebar from '../layout/sidebar';
import { useParams } from "react-router-dom";

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
            maxWidth: 800,
            marginBottom: "20px",
        },
        image: {
            width: 400,
            height: 400,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
    }),
);



const DetailMovies = () => {
    let { id } = useParams();
    const [daftarMovies, setDaftarMovies] = useState(null)

    useEffect(() => {
        if (daftarMovies === null) {
            axios.get(`https://backendexample.sanbersy.com/api/games/${id}`)
                .then(res => {
                    setDaftarMovies(res.data);
                })
        }
    })

    const classes = useStyles();
    return (

        <div className={classes.root}>
            <Sidebar />
            {daftarMovies !== null && (
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="gambar" src={daftarMovies.image_url} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        {daftarMovies.name}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1">
                                        {daftarMovies.genre}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {daftarMovies.singlePlayer}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {daftarMovies.multiplayer}
                                        </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {daftarMovies.platform}
                                    </Typography>
                                    <Typography style={{ paddingTop: "40px" }} variant="body2" gutterBottom>
                                        {daftarMovies.release}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            )
            }
        </div>
    )
}

export default DetailMovies
