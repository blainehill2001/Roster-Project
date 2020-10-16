import React, {useState, useEffect} from 'react';
import {Grid, Button, Typography, Divider} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {makeStyles} from "@material-ui/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import {Link} from "react-router-dom";

const axios = require('axios');

const BigGrayTextTypography = withStyles({
    root: {
        color: "#555555"
    },
    typography: {
        fontSize: 20
    }
})(Typography);

const SmallGrayTextTypography = withStyles({
    root: {
        color: "#555555"
    },
    typography: {
        fontSize: 10
    }
})(Typography);

const useStyles = makeStyles(() => ({
    listStyles: {
        paddingTop: 0,
        paddingRight: 50,
        paddingBottom: 10,
        paddingLeft: 50
    },
    alignItemsCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    normalButtonStyles: {
        maxWidth: '20px',
        maxHeight: '20px',
        minWidth: '10px',
        minHeight: '10px',
        '&:hover': {
            backgroundColor: "#7A3A06",
            color: '#D9D9D9'
        }
    },
    twoButtonStyle: {
        paddingTop: 20,
        paddingBottom: 0
    }

}));


//This is our component to view all children at a glance to see their name, allergies, and grade in that order
function List() {
    const [list, setList] = useState([]);
    const classes = useStyles();

    async function getList() {
        try {
            const response = await axios.get("/api/list");
            setList(response.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(function () {
        getList().then(error => console.log(error));
    }, []);

    async function handleDelete(id) {
        try {
            await axios.delete(`/api/list/${id}`);

        } catch (error) {
            console.error(error);
        }
        getList().then(error => console.log(error));
    }

    return (
        <Grid container direction="column" justify="space-evenly" spacing={1}>
            <Grid item>
                <BigGrayTextTypography variant='h2' className={classes.alignItemsCenter}>
                    Roster
                </BigGrayTextTypography>
            </Grid>
            <Grid item>
                {list.map((child) => {
                    return (
                        <div key={child._id} className={classes.listStyles}>
                            <Grid container direction="row" justify="space-between">
                                <Grid item>
                                    <SmallGrayTextTypography variant="h4">
                                        {child.name}
                                    </SmallGrayTextTypography>
                                    <small>Allergies: {child.allergies}</small>
                                </Grid>
                                <Grid item className={classes.twoButtonStyle}>
                                    <Link to={'/list/' + child._id}>
                                        <Button variant="contained" styles={classes.normalButtonStyles} color="primary"
                                                startIcon={<InfoIcon/>}>Info</Button>
                                    </Link>
                                    <Button variant="contained" styles={classes.normalButtonStyles} onClick={() => {
                                        handleDelete(child._id).then(error => console.log(error));
                                    }} color="secondary" startIcon={<DeleteIcon/>}>
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>
                            <Divider/>
                        </div>
                    )
                })}
            </Grid>
        </Grid>
    );
}

export default List;