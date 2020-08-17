import React from 'react';
import logo from '../public/image/logo.png';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import SportsEsportsOutlinedIcon from '@material-ui/icons/SportsEsportsOutlined';
import GamesIcon from '@material-ui/icons/Games';
import HighQualityOutlinedIcon from '@material-ui/icons/HighQualityOutlined';
import MovieFilterOutlinedIcon from '@material-ui/icons/MovieFilterOutlined';
import { Link } from "react-router-dom";
import ListAltIcon from '@material-ui/icons/ListAlt';
import StorageOutlinedIcon from '@material-ui/icons/StorageOutlined';
import HomeIcon from '@material-ui/icons/Home';
import Header from "../layout/header"
import VideogameAssetOutlinedIcon from '@material-ui/icons/VideogameAssetOutlined';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <img style={{ height: "58px", width: "180px" }} src={logo} alt="logo" />
            <Divider />
            <List>
                {['List Movie\'s', 'Form Movie\'s'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <Link to="/listMovie"><HighQualityOutlinedIcon style={{ color: "grey", fontSize: '30px' }} /></Link> : <Link to="/formMovie"><MovieFilterOutlinedIcon style={{ color: 'grey', fontSize: '30px' }} /></Link>} </ListItemIcon>
                        <ListItemText 
                        primary={index % 2 === 0 ? <Link style={{ textDecoration: 'none', color: 'unset', fontWeight: "bold" }} to="/listMovie">{text}</Link> : <Link style={{ textDecoration: 'none', color: "unset", fontWeight: "bold" }} to="/formMovie">{text}</Link>} />
                    </ListItem>
                ))}
                <ListItem>
                    <ListItemIcon>
                        <Link style={{ textDecoration: 'none', color: 'unset', fontWeight: "bold" }} to="/createMovie"><ListAltIcon style={{ color: 'grey', fontSize: '30px' }}></ListAltIcon></Link>
                    </ListItemIcon>
                    <Link style={{ textDecoration: 'none', color: 'unset', fontWeight: "bold" }} to="/createMovie"><ListItemText><strong>Create Movie</strong></ListItemText></Link>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Link style={{ textDecoration: 'none', color: 'unset', fontWeight: "bold" }} to="/tableMovie"><StorageOutlinedIcon style={{ color: 'grey', fontSize: '30px' }}></StorageOutlinedIcon></Link>
                    </ListItemIcon>
                    <Link style={{ textDecoration: 'none', color: 'unset', fontWeight: "bold" }} to="/tableMovie"><ListItemText><strong>Table Movie's</strong></ListItemText></Link>
                </ListItem>
            </List>
            <Divider />
            <List>
                {['List Game\'s', 'Form Game\'s '].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <SportsEsportsOutlinedIcon style={{ color:'grey', fontSize:'30px'}} /> : <VideogameAssetOutlinedIcon style={{color:'grey', fontSize:'30px'}}/>}</ListItemIcon>
                        <ListItemText primary={index % 2 === 0 ? <Link style={{ textDecoration: 'none', color: 'unset', fontWeight: "bold" }} to="/listgame">{text}</Link> : <Link style={{ textDecoration: 'none', color: "unset", fontWeight: "bold" }} to="/formgame">{text}</Link>} />
                    </ListItem>
                ))}
                <ListItem>
                    <ListItemIcon>
                        <Link style={{ textDecoration: 'none', color: 'unset', fontWeight: "bold" }} to="/createGame"><GamesIcon style={{ color: 'grey', fontSize: '30px' }}></GamesIcon></Link>
                    </ListItemIcon>
                    <Link style={{ textDecoration: 'none', color: 'unset', fontWeight: "bold" }} to="/createGame"><ListItemText><strong>Create Game</strong></ListItemText></Link>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Link style={{ textDecoration: 'none', color: 'unset', fontWeight: "bold" }} to="/tableMovie"><StorageOutlinedIcon style={{ color: 'grey', fontSize: '30px' }}></StorageOutlinedIcon></Link>
                    </ListItemIcon>
                    <Link style={{ textDecoration: 'none', color: 'unset', fontWeight: "bold" }} to="/tableGame"><ListItemText><strong>Table Game's</strong></ListItemText></Link>
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Link to="/"><HomeIcon style={{color: "white", fontSize: "40px"}}></HomeIcon></Link>
                    <Header/>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
          </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
            </main>
        </div>
        </>
    );
}
