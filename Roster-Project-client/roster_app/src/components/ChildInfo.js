import React, {useState, useEffect} from 'react';
import {Grid, Typography} from "@material-ui/core";
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

//This is our component to view all data about a child
function ChildInfo(props) {
    const [child, setChild] = useState({});

    useEffect(function () {
        async function getChild() {
            try {
                const response = await axios.get(`/api/list/${props.match.params._id}`);
                setChild(response.data);
            } catch (error) {
                console.log('This is the error: ', error);
            }
        }

        getChild().then(error => console.log(error));
    }, [props]);

    function handleCancel() {
        props.history.push("/list");
    }

    return (
        <Grid container direction="column" alignItems="center" justify="space-evenly" spacing={1}>
            <Grid item>
                <BigGrayTextTypography variant='h2'>
                    {child.name}
                </BigGrayTextTypography>
            </Grid>
            <Grid item>
                <SmallGrayTextTypography variant='h5'>
                    Grade: {child.grade}
                </SmallGrayTextTypography>
            </Grid>
            <Grid item>
                <SmallGrayTextTypography variant='h5'>
                    Allergies: {child.allergies}
                </SmallGrayTextTypography>
            </Grid>
            <Grid item>
                <SmallGrayTextTypography variant='h5'>
                    Emergency Contact: {child.emergencyContact}
                </SmallGrayTextTypography>
            </Grid>
            <Grid item>
                <SmallGrayTextTypography variant='h5'>
                    Emergency Phone: {child.emergencyPhone}
                </SmallGrayTextTypography>
            </Grid>
            <Grid item>
                <button type="button" onClick={handleCancel} className="btn btn-secondary">Back</button>
            </Grid>
        </Grid>
    );
}

export default ChildInfo;