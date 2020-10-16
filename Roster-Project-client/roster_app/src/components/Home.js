import React from 'react';
import { Grid, Button, Typography } from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {makeStyles} from "@material-ui/styles";
import { Link } from 'react-router-dom';

const GrayTextTypography = withStyles({
    root: {
        color: "#555555"
    }
})(Typography);

const useStyles = makeStyles(() => ({
    bigButtonStyles:{
        fontSize: 20,
        width: 275,
        height: 150,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "#974806",
        color: "#FFF",
        '&:hover': {
            backgroundColor: "#7A3A06",
            color: '#D9D9D9'
        }
    }

}));

//This is our home component containing a button to check in and a button to check out
function Home() {
    const classes = useStyles();
    return (
        <Grid container direction="column" alignItems="center" justify="space-around" spacing={2}>
            <Grid item>
                <GrayTextTypography variant="h2">
                    Welcome to Colonial Childcare!
                </GrayTextTypography>
            </Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center" justify="space-around" spacing={5}>
                    <Grid item>
                        <Button component={Link} to="/check-in"variant="contained" overrides={{backgroundColor: "#974806"}} className={classes.bigButtonStyles}>Check-In</Button>
                    </Grid>
                    <Grid item>
                        <Button component={Link} to="/check-out" variant={"contained"} color = "primary" className={classes.bigButtonStyles}>Check-Out</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home;