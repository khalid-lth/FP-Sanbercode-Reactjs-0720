import React from "react"
import { makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles({
    footer: {
        color: "white",
        backgroundColor: "grey",
        marginTop: '70px',
        fontSize: 15,
        paddingTop: 5
        
    },
    container: {
        height: 40,
        
    },
});



const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <div className={classes.container}>
        <footer>
            <h5>copyright &copy; 2020 by Sanbercode</h5>
        </footer>
        </div>
        </div>
    )
}

export default Footer