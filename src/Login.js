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



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Login = ()=>{
  const[data,setData] = React.useState({email:'',password:'',otp:''})
  const navigate = useNavigate()
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const handelChange = (e) =>{
    if(e.target.name === 'email' || e.target.name === 'password'){
        setData({...data,[e.target.name]:e.target.value})
    }
  }

  const handelOtp = (value)=>{
    setData({...data,otp:value})
  }

  const getOtp = (data) =>{
    console.log(data,'data')
    if(!(data.email.includes('@')) || data.password.length <= 5){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'invalid email or password',
             })
    }else{
        axios.post('http://localhost:3001/api/login',data)
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  }

  const verifyOtp = (data) =>{
    axios.post('http://localhost:3001/api/verifyotp',data)
    .then((res)=>{
        if(res.data.hasOwnProperty('token')){
            localStorage.setItem('token',res.data.token)
            setTimeout(()=>{
                navigate("/home")
            },2000)
            
        }
    })
    .catch((err)=>{
        console.log(err)
    })
  }
   

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Sign in
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
              value={data.email}
              onChange={(e)=>{handelChange(e)}}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={data.password}
              onChange={(e)=>{handelChange(e)}}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>{getOtp(data)}}
            >
              Get Otp
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotpassword">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup">
                  {"Don't have an account? Sign Up"}
                  </Link>
              </Grid>
              <br/>
              <br/>
              <Grid item>
              <Typography variant="h5">Verify Otp:</Typography><br/>
              <MuiOtpInput name="otp"  type="number" value={data.otp} onChange={handelOtp} length={6} /><br/>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>{verifyOtp(data)}}
            >
              Login
            </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login