import React, { useContext } from "react"
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    }),
);

const Header =() =>{
    const classes = useStyles();
  const [user, setUser] = useContext(UserContext)
  const handleLogout = () =>{
    setUser(null)
    localStorage.removeItem("user")
  }

  return(    
    <header>
      <nav>
        <ul>
            {user === null && 
            <Button
                style={{marginLeft: "1030px"}}
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<VpnKeyIcon />}>
                <Link to="/login" style={{textDecoration:"none", color:"black"}}>Login</Link>
            </Button> }
            { user && 
            <Button
                onClick={handleLogout}
                style={{marginLeft: "1030px"}}
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<ExitToAppIcon />}>
                Logout
            </Button>}
        </ul>
      </nav>
    </header>
  )
}

export default Header