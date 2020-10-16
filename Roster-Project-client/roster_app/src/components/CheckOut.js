import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {Button, Divider, Grid, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

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
        paddingRight: 70,
        paddingBottom: 20,
        paddingLeft: 70
    },
    alignItemsCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

}));


//This is our check out component that asks the user to select their kid (the user should see a list of kids)
function CheckOut(props) {
    const [list, setList] = useState([]);
    const classes = useStyles();

    async function getList() {
        try {
            const response = await axios.get("/api/check-out");
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
        props.history.push("/");
    }

    return (
        <Grid container direction="column" justify="space-evenly" spacing={1}>
            <Grid item>
                <BigGrayTextTypography variant='h2' className={classes.alignItemsCenter}>
                    Check-Out
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
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={() => {
                                        handleDelete(child._id).then(error => console.log(error));
                                    }} color="secondary">
                                        Check-Out
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

export default CheckOut;