import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SignUp from './SignUp';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import ForgotPassword from './ForgotPassword';

const Navbar =()=>{

    const navigate = useNavigate()
    const handelLogout = () =>{
        localStorage.removeItem('token')
        navigate("/login")
    }

  return (<div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TASK
          </Typography>
          
          {localStorage.getItem('token') ? <Button onClick={()=>{handelLogout()}}color="inherit">Logout</Button> : <Link to="/login" style={{textDecoration:'none'}}><Button style={{textDecoration:'none',color:"white"}} color="inherit">Login</Button></Link> }
          {localStorage.getItem('token') ? <Link to="/home" style={{textDecoration:"none",color:"white"}}><Button color="inherit">Home</Button></Link> : null }
          <Link style={{textDecoration:"none",color:"white"}} to="/profile"><Button  color="inherit"><AccountCircleIcon/></Button></Link>
        </Toolbar>
      </AppBar>
    </Box>


    <Routes>
    <Route path="/home" element={localStorage.getItem('token') ? <Home/>:<Login/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/profile" element={localStorage.getItem('token') ? <Profile/>:<Login/>}/>
    <Route path="/forgotpassword" element={localStorage.getItem('token') ? <Profile/>:<ForgotPassword/>}/>
    </Routes>
    </div>
  );
}

export default Navbar