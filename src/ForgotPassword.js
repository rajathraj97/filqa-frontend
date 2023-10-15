import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MuiOtpInput } from 'mui-one-time-password-input'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'


const defaultTheme = createTheme();

const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

const ForgotPassword = () =>{
    const[email,setEmail] = React.useState('')
    const[otp,setOtp] = React.useState('')
    const[password,setPassword] = React.useState('')
    const navigate = useNavigate()

    const handelChange = (e) =>{
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        }
        if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
        
    }

    const getOtp = (email) =>{
        axios.post('http://localhost:3001/api/forgotpassword',{email:email})
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const UpdatePassword = (email,otp,password) =>{
        axios.patch('http://localhost:3001/api/updatepassword',{email:email,otp:otp,password:password})
        .then((res)=>{
            if(res.data.hasOwnProperty('success')){
                Swal.fire('Password change sucessful')
                navigate('/login')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handelOtp = (value)=>{
        setOtp(value)
      }

      

    return(<ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e)=>{handelChange(e)}}
                autoFocus
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={()=>{getOtp(email)}}
              >
                Get Otp
              </Button>
              <Grid container>
              <Grid item>
              <Typography variant="h5">Verify Otp:</Typography><br/>
              <MuiOtpInput autoFocus name="otp"  type="number" value={otp} onChange={handelOtp} length={6} /><br/>
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Enter New Password"
                name="password"
                autoComplete="email"
                type="password"
                value={password}
                onChange={(e)=>{handelChange(e)}}
                autoFocus
              />
              
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>{UpdatePassword(email,otp,password)}}
            >
              updatepassword
            </Button>
              </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>)
}

export default ForgotPassword