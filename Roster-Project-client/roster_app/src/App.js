import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Home from './components/Home';
import CheckIn from './components/CheckIn';
import CheckOut from './components/CheckOut';
import ChildInfo from './components/ChildInfo';
import List from './components/List';
import {Grid, AppBar, Toolbar, Button, Typography} from "@material-ui/core";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import logo from './colonial-logo.png';
import {makeStyles} from '@material-ui/styles';

//there will be two components inside of App: Navigation and Main
//Navigation will be the NavBar component that will be visible no matter your path
const colonialTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#974806',
            contrastText: '#fff'
        },
        secondary: {
            main: '#6e6e6e',
            contrastText: '#fff'
        }
    }
})
const useStyles = makeStyles(() => ({
    logoStyles: {
        height: 50,
        width: 50,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buttonStyles: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 20
    }

}));

function Navigation() {
    const classes = useStyles();
    return (
        <ThemeProvider theme={colonialTheme}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography className={classes.buttonStyles}>
                        <ThemeProvider theme={colonialTheme}>
                            <Button component={Link} to="/" variant="contained" color="secondary"
                                    className={classes.buttonStyles} href="/">Welcome</Button>
                            <Button component={Link} to="/list" variant="contained" color="secondary"
                                    className={classes.buttonStyles} href="/list">Roster</Button>
                        </ThemeProvider>
                    </Typography>
                    <Typography>
                        <a href="https://www.colonial.org/">
                            <img src={logo} alt="logo" className={classes.logoStyles}/>
                        </a>
                    </Typography>
                </Toolbar>
            </AppBar>
        </ThemeProvider>

    )
}

//Main will call the appropriate components to load in given paths
function Main() {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/check-in" component={CheckIn}/>
            <Route exact path="/check-out" component={CheckOut}/>
            <Route exact path="/list" component={List}/>
            <Route exact path="/list/:_id" component={ChildInfo}/>
        </Switch>);
}


function App() {
    return (
        <div className="App">
            <Router>
                <Grid container direction="column" spacing={5}>
                    <Grid item>
                        <Navigation/>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column">
                            <Grid item>
                                <Main/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Router>
        </div>
    );
}

export default App;
