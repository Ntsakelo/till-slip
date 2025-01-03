import React from "react";
import StepperComponent from "../../components/StepperComponent"
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";


const UserInfo = () => {
    const navigate = useNavigate()

    const handleInfoSave = () => {
        navigate('/upload')
    }
    return (
        <div className="main-container">
          <StepperComponent step={0}/>
          <Grid container>
            <Grid size={{xs:12}}>
            <TextField sx={{width:'75%',display:'block',margin:'auto',marginTop:'40px'}} fullWidth label="First name" id="fullWidth" />
            </Grid>
            <Grid size={{xs:12}}>
            <TextField sx={{width:'75%',display:'block',margin:'auto',marginTop:'40px'}} fullWidth label="Last name" id="fullWidth" />
            </Grid>
            <Grid size={{xs:12}}>
            <TextField sx={{width:'75%',display:'block',margin:'auto',marginTop:'40px'}} fullWidth label="Email address" id="fullWidth" />
            </Grid>
            <Grid size={{xs:12}}>
              <button className="main-cta" type="button" onClick={handleInfoSave}>Save and Proceed</button>
            </Grid>
          </Grid>
        </div>
    )
}

export default UserInfo;