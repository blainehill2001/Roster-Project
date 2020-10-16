import React, {useState} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {useForm} from 'react-hook-form'

const axios = require('axios');

const BigGrayTextTypography = withStyles({
    root: {
        color: "#555555"
    },
    typography: {
        fontSize: 20
    }
})(Typography);

const SmallRedTextTypography = withStyles({
    root: {
        color: "#E53935"
    }
})(Typography);


//This is our check in component that asks for name, grade, allergies, emergency contact, and emergency phone
function CheckIn(props) {
    const {register, errors, handleSubmit} = useForm();
    const initialState = {name: '', grade: '', allergies: '', emergencyContact: '', emergencyPhone: ''};
    const [form, setForm] = useState(initialState);

    function handleChange(event) {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const onSubmit = (data, event) => {
        event.preventDefault();

        async function postForm() {
            axios.post('/api/check-in', form)
                .then(function (response) {
                    props.history.push(`/`);
                })
                .catch(function (error) {
                    console.log('error', error)
                });
        }

        postForm();
    }

    function handleCancel() {
        props.history.push("/");
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" alignItems="center" justify="space-evenly" spacing={1}>
                <Grid item>
                    <BigGrayTextTypography variant='h2'>
                        Check-In
                    </BigGrayTextTypography>
                </Grid>

                <Grid item>
                    <Grid container direction="column" alignItems="left" justify="center" spacing={0.5}>
                        <Grid item>
                            <label>Name:</label>
                        </Grid>
                        <Grid item>
                            <input name="name" defaultValue={form.name} autoComplete="off" onChange={handleChange}
                                   ref={register({required: true, minLength: 2})}/>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    {errors.name && errors.name.type === "required" && (
                        <SmallRedTextTypography variant="p">This is required</SmallRedTextTypography>)}
                    {errors.name && errors.name.type === "minLength" && (
                        <SmallRedTextTypography variant="p">The name must be at least two
                            characters</SmallRedTextTypography>)}
                </Grid>

                <Grid item>
                    <Grid container direction="column" alignItems="left" justify="center" spacing={0.5}>
                        <Grid item>
                            <label>Grade:</label>
                        </Grid>
                        <Grid item>
                            <input name="grade" type="number" defaultValue={form.grade} autoComplete="off"
                                   onChange={handleChange} ref={register({required: true})}/>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    {errors.grade && (<SmallRedTextTypography variant="p">This is required</SmallRedTextTypography>)}
                </Grid>

                <Grid item>
                    <Grid container direction="column" alignItems="left" justify="center" spacing={0.5}>
                        <Grid item>
                            <label>Allergies:</label>
                        </Grid>
                        <Grid item>
                            <input name="allergies" defaultValue={form.allergies} autoComplete="off"
                                   onChange={handleChange} ref={register}/>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container direction="column" alignItems="left" justify="center" spacing={0.5}>
                        <Grid item>
                            <label>Emergency Contact:</label>
                        </Grid>
                        <Grid item>
                            <input name="emergencyContact" defaultValue={form.emergencyContact} autoComplete="off"
                                   onChange={handleChange} ref={register({required: true, minLength: 2})}/>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    {errors.emergencyContact && errors.emergencyContact.type === "required" && (
                        <SmallRedTextTypography variant="p">This is required</SmallRedTextTypography>)}
                    {errors.emergencyContact && errors.emergencyContact.type === "minLength" && (
                        <SmallRedTextTypography variant="p">The name must be at least two
                            characters</SmallRedTextTypography>)}
                </Grid>

                <Grid item>
                    <Grid container direction="column" alignItems="left" justify="center" spacing={0.5}>
                        <Grid item>
                            <label>Emergency Phone:</label>
                        </Grid>
                        <Grid item>
                            <input name="emergencyPhone" type="number" defaultValue={form.emergencyPhone}
                                   autoComplete="off" onChange={handleChange}
                                   ref={register({required: true, minLength: 10})}/>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    {errors.emergencyPhone && errors.emergencyPhone.type === "required" && (
                        <SmallRedTextTypography variant="p">This is required</SmallRedTextTypography>)}
                    {errors.emergencyPhone && errors.emergencyPhone.type === "minLength" && (
                        <SmallRedTextTypography variant="p">The phone number must be at least 10
                            numbers</SmallRedTextTypography>)}
                </Grid>

                <Grid item>
                    <Grid container direction="column" alignItems="left" justify="center" spacing={1}>
                        <Grid item>
                            <button type="submit" defaultValue="Submit" className="btn btn-primary">Submit</button>
                        </Grid>
                        <Grid item>
                            <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>

    );
}

export default CheckIn;