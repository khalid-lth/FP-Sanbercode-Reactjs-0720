import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import Sidebar from '../layout/sidebar'
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme: Theme) => 
    createStyles({
    root: {
        width: '80%',
        marginLeft: "280px",
    },
    container: {
        maxHeight: 440,
    },
    card:{
        width: "30%",
        margin:"auto",
        marginBottom:"30px"
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
}),
);

const CreateMovies = () => {
    const [daftarMovies, setDaftarMovies] = useState(null)
    const [input, setInput] = useState({ 
        title: "", 
        description: "", 
        year: "", 
        duration: "", 
        genre: "", 
        rating: "", 
        review:"", 
        image_url: "" })
    const [ID_MOVIES, setID_MOVIES] = useState(0)
    const [statusForm, setStatusForm] = useState("Create")

    useEffect(() => {
        if (daftarMovies === null) {
            axios.get(`https://backendexample.sanbersy.com/api/movies`)
                .then(res => {
                    setDaftarMovies(res.data.map(el => { return { 
                        id: el.id, 
                        title: el.title, 
                        description: el.description, 
                        year: el.year, 
                        duration: el.duration, 
                        genre: el.genre, 
                        rating: el.rating, 
                        review: el.review, 
                        image_url: el.image_url 
                    }
                }))
            })
        }
    }, [daftarMovies])

    const handleChange = (event) => {
        let typeOfInput = event.target.name
        switch (typeOfInput) {
            case 'title': {
                setInput({ ...input, title: event.target.value })
                break;
            }
            case 'description': {
                setInput({ ...input, description: event.target.value })
                break;
            }
            case 'year': {
                setInput({ ...input, year: event.target.value })
                break;
            }
            case 'duration': {
                setInput({ ...input, duration: event.target.value })
                break;
            }
            case 'genre': {
                setInput({ ...input, genre: event.target.value })
                break;
            }
            case 'rating': {
                setInput({ ...input, rating: event.target.value })
                break;
            }
            case 'review': {
                setInput({ ...input, review: event.target.value })
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

        let title = input.title
        let description = input.description
        let year = input.year
        let duration = input.duration
        let genre = input.genre
        let rating = input.rating
        let review = input.review
        let image_url = input.image_url
        console.log(input)

        if (title.replace(/\s/g, '') !== "" &&
            description.replace(/\s/g, '') !== "" &&
            year.toString().replace(/\s/g, '') !== "" &&
            duration.toString().replace(/\s/g, '') !== "" &&
            genre.replace(/\s/g, '') !== "" &&
            rating.toString().replace(/\s/g, '') !== "" &&
            review.replace(/\s/g, '') !== "" &&
            image_url.replace(/\s/g, '') !== ""){
            if (statusForm === 'Create') {
                axios.post(`https://backendexample.sanbersy.com/api/movies`, { 
                    title: input.title, 
                    description: input.description,
                    year: parseInt(input.year),
                    duration: parseInt(input.duration),
                    genre: input.genre,
                    rating: parseInt(input.rating), 
                    review: input.review, 
                    image_url: input.image_url 
                    })
                    .then(res => {
                        setDaftarMovies([...daftarMovies, { id: res.data.id, ...input}])
                    })
            } else if (statusForm === 'edit') {
                axios.put(`https://backendexample.sanbersy.com/api/movies/${ID_MOVIES}`, { title: input.title, description: input.description, year: input.year, duration: input.duration, genre: input.genre, rating: input.rating, review: input.review, image_url: input.image_url })
                    .then(res => {
                        console.log(res)
                        let dataFilm = daftarMovies.find(el => el.id === ID_MOVIES)
                        dataFilm.title = input.title
                        dataFilm.description = input.description
                        dataFilm.year = input.year
                        dataFilm.duration = input.duration
                        dataFilm.genre = input.genre
                        dataFilm.rating = input.rating
                        dataFilm.review = input.review
                        dataFilm.image_url = input.image_url
                        setDaftarMovies([...daftarMovies])
                    })
            }

            setStatusForm('Create')
            setID_MOVIES(0)
            setInput({ 
                title: "", 
                description: "",
                year: "",
                duration: "",
                genre: "", 
                rating: "", 
                review: "", 
                image_url: "" 
            })
        }
    }

    const classes = useStyles();

    return (
        <>
        <Sidebar />

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Card className={classes.card}>
    <CardContent>
        <h1>Form Untuk Mengisi Daftar Film</h1>
            <div className={classes.tex}>
            <TextField id="title" label="Title" name = "title"value={input.title} onChange={handleChange}/><br/>
            <TextField
            id="description"
            label="Description"
            multiline
            rows={9}
            variant="outlined"
            name = "description"
            value={input.description} onChange={handleChange}
        /><br/>
        <TextField
            id="year"
            label="Year"
            type="number"
            name = "year"
            value={input.year} onChange={handleChange}
        /><br/>
            <TextField
            id="duration"
            label="Duration"
            type="number"
            name = "duration"
            value={input.duration} onChange={handleChange}
        /><br/>
            <TextField id="genre" label="Genre" name = "genre" value={input.genre} onChange={handleChange}/><br/>
            <TextField
            id="rating"
            label="rating"
            type="number"
            name = "rating"
            value={input.rating} onChange={handleChange}
        /><br/>
            <TextField
            id="review"
            label="Review"
            multiline
            rows={9}
            variant="outlined"
            name = "review"
            value={input.review} onChange={handleChange}
        /><br/>
            <TextField name = "image_url" id="image_url" label="image_url" type="url" value={input.image_url} onChange={handleChange}/>
        </div>
        
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type = "submit"
                endIcon={<SendIcon></SendIcon>}
            >
                Send
            </Button>
    </CardContent>
    </Card>
     </form>
        </>
    );
}

export default CreateMovies