import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Sidebar from '../layout/sidebar'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
    root: {
        width: '80%',
        marginLeft: "280px",
    },
    container: {
        maxHeight: 640,
    },
    card:{
        width: "100%",
    },
    tex:{
        '& > *': {
            margin: theme.spacing(1),
            width: '90%',
            
        },
    },
    button: {
        marginTop: "30px",
        marginBottom: "15px",
        float: "right"
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    
}),
);

const DaftarGames = () => {
    const [daftarGames, setDaftarGames] = useState(null)
    const [input, setInput] = useState({ name: "", genre: "", singlePlayer: "", multiplayer: "", platform: "", release: "",image_url: "", })
    const [ID_GAMES, setID_GAMES] = useState(0)
    const [statusForm, setStatusForm] = useState("Create")

    useEffect(() => {
        if (daftarGames === null) {
            axios.get(`https://backendexample.sanbersy.com/api/games`)
                .then(res => {
                    setDaftarGames(res.data.map(el => { return { id: el.id, name: el.name, genre: el.genre, singlePlayer: el.singlePlayer, multiplayer: el.multiplayer, platform: el.platform, release: el.release, image_url: el.image_url } }))
                })
        }
    }, [daftarGames])

    const handleChange = (event) => {
        let typeOfInput = event.target.name
        switch (typeOfInput) {
            case 'name': {
                setInput({ ...input, name: event.target.value })
                break;
            }
            case 'genre': {
                setInput({ ...input, genre: event.target.value })
                break;
            }
            case 'singlePlayer': {
                setInput({ ...input, singlePlayer: event.target.value })
                break;
            }
            case 'multiplayer': {
                setInput({ ...input, multiplayer: event.target.value })
                break;
            }
            case 'platform': {
                setInput({ ...input, platform: event.target.value })
                break;
            }
            case 'release': {
                setInput({ ...input, release: event.target.value })
                break;
            }
            case 'image_url': {
                setInput({ ...input, image_url: event.target.value })
                break;
            }
            default: { break; }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let name = input.name
        let genre = input.genre
        let singlePlayer = input.singlePlayer
        let multiplayer = input.multiplayer
        let platform = input.platform
        let release = input.release
        let image_url = input.image_url

        if (
            name.replace(/\s/g, '') !== "" &&
            genre.replace(/\s/g, '') !== "" &&
            singlePlayer.toString().replace(/\s/g, '') !== "" &&
            multiplayer.toString().replace(/\s/g, '') !== "" &&
            platform.replace(/\s/g, '') !== "" &&
            release.toString().replace(/\s/g, '') !== "" &&
            image_url.replace(/\s/g, '') !== ""
        ) {
            if (statusForm === 'Create') {
                axios.post(`https://backendexample.sanbersy.com/api/games`, { name: input.name, genre: input.genre, singlePlayer: input.singlePlayer, multiplayer: input.multiplayer, platform: input.platform, release: input.release, image_url: input.image_url })
                    .then(res => {
                        console.log(res)
                        setDaftarGames([
                            ...daftarGames,
                            {
                                id: res.data.id,
                                name: input.name,
                                genre: input.genre,
                                singlePlayer: input.singlePlayer,
                                multiplayer: input.multiplayer,
                                platform: input.platform,
                                release: input.release,
                                image_url: input.image_url,
                            }
                        ])
                    })
            } else if (statusForm === 'edit') {
                axios.put(`https://backendexample.sanbersy.com/api/games/${ID_GAMES}`, { name: input.name, genre: input.genre, singlePlayer: input.singlePlayer, multiplayer: input.multiplayer, platform: input.platform, release: input.release, image_url: input.image_url })
                    .then(res => {
                        console.log(res)
                        let dataGames = daftarGames.find(el => el.id === ID_GAMES)
                        dataGames.name = input.name
                        dataGames.genre = input.genre
                        dataGames.singlePlayer = input.singlePlayer
                        dataGames.multiplayer = input.multiplayer
                        dataGames.platform = input.platform
                        dataGames.release = input.release
                        dataGames.image_url = input.image_url
                        setDaftarGames([...daftarGames])
                    })
            }

            setStatusForm('Create')
            setID_GAMES(0)
            setInput({ name: "", genre: "", singlePlayer: "", multiplayer: "", platform: "", release: "", image_url: "" })
        }
    }

    const handleEdit = (event) => {
        setOpen(true);
        let idGames = parseInt(event)
        let dataFilm = daftarGames.find(el => el.id === idGames)
        setInput({
            name: dataFilm.name,
            genre: dataFilm.genre,
            singlePlayer: dataFilm.singlePlayer,
            multiplayer: dataFilm.multiplayer,
            platform: dataFilm.platform,
            release: dataFilm.release,
            image_url: dataFilm.image_url,
        })
        setID_GAMES(idGames)
        setStatusForm('edit')
    }

    const handleDelete = (event) => {
        let idGames = parseInt(event)
        let newDaftarGames = daftarGames.filter(el => el.id !== idGames)

        axios.delete(`https://backendexample.sanbersy.com/api/games/{idGames}`)
            .then(res => {
                console.log(res)
            })
        setDaftarGames([...newDaftarGames])
    }

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Sidebar />
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Action</TableCell>
                                <TableCell align="center">No</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Year</TableCell>
                                <TableCell align="center">Duration</TableCell>
                                <TableCell align="center">Genre</TableCell>
                                <TableCell align="center">Rating</TableCell>
                                <TableCell align="center">Review</TableCell>
                                <TableCell align="center">imageUrl</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {daftarGames !== null && daftarGames.map((el, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="center">
                                            <IconButton color="default" aria-label="delete" onClick={() => handleEdit(el.id)}
                                                value={el.id}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="secondary" aria-label="delete" onClick={() => handleDelete(el.id)}
                                                value={el.id}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="center">{el.name}</TableCell>
                                        <TableCell align="center">{el.genre}</TableCell>
                                        <TableCell align="center">{el.singlePlayer}</TableCell>
                                        <TableCell align="center">{el.multiplayer}</TableCell>
                                        <TableCell align="center">{el.platform}</TableCell>
                                        <TableCell align="center">{el.release}</TableCell>
                                        <TableCell align="center">{el.image_url}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Card className={classes.card} >
                    <CardContent>
                        <h1>Form Untuk Mengisi Daftar Game</h1>
                        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
                        <div className={classes.tex}>
                            <TextField id="name" label="Name" name="name" value={input.name} onChange={handleChange} /><br />
                            <TextField id="genre" label="Genre" name="genre" value={input.genre} onChange={handleChange} /><br />
                            <TextField
                                id="singlePlayer"
                                label="Single Player"
                                type="number"
                                name="singlePlayer"
                                value={input.singlePlayer} onChange={handleChange}
                            /><br />
                            <TextField
                                id="multiplayer"
                                label="Multiplayer"
                                type="number"
                                name="multiplayer"
                                value={input.multiplayer} onChange={handleChange}
                            /><br />
                            <TextField id="platform" label="Platform" name="platform" value={input.platform} onChange={handleChange} /><br />
                            <TextField id="release" label="Release" name="release" value={input.release} onChange={handleChange} /><br />
                            <TextField name="image_url" id="image_url" label="image_url" type="url" value={input.image_url} onChange={handleChange} />
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={handleSubmit}
                            endIcon={<SendIcon></SendIcon>}
                        >
                            Send
            </Button>
            </Table>
        </TableContainer>
                    </CardContent>
                </Card>
            </form>
                    </div>
                </Fade>
            </Modal>
        </>
    );
}

export default DaftarGames