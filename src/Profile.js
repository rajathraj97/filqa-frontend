import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode";
import { Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';





const Profile = () =>{
    const[userDetails,setUserDetails] = useState({})
    
  



    const navigate = useNavigate()
    useEffect(()=>{
        const data = jwt_decode(localStorage.getItem('token'))
        setUserDetails(data)
    },[])

    console.log(userDetails)

    const handelUpdateMobile = async(userDetails) =>{
      const { value: mobile } = await Swal.fire({
        title: 'Input mobile number',
        input: 'number',
        inputLabel: 'Your Mobile',
        inputPlaceholder: 'Enter your mobile'
      })
      
      if (mobile) {
        Swal.fire(`Entered mobile number: ${mobile}`)
        axios.patch('http://localhost:3001/api/update',{email:userDetails.email,mobile:mobile},{headers:{'Authorization':localStorage.getItem('token')}})
        .then((res)=>{
          console.log(res)
          if(res.data.hasOwnProperty("_id")){
            Swal.fire('Change Sucessful')
            localStorage.removeItem('token')
            navigate('/home')
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      }
     
    }

    const handelUpdateUsername = async(userDetails) =>{
      const { value: userName } = await Swal.fire({
        title: 'Input username',
        input: 'text',
        inputLabel: 'UserName',
        inputPlaceholder: 'Enter user name'
      })
      
      if (userName) {
        Swal.fire(`Entered username: ${userName}`)
        axios.patch('http://localhost:3001/api/update',{email:userDetails.email,username:userName},{headers:{'Authorization':localStorage.getItem('token')}})
        .then((res)=>{
          console.log(res)
          if(res.data.hasOwnProperty("_id")){
            console.log(res)
            Swal.fire('Change Sucessful')
            localStorage.removeItem('token')
            navigate('/home')
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    }

    const handelUpdatePassword = async(userDetails) =>{
      const { value: password } = await Swal.fire({
        title: 'Input new password',
        input: 'password',
        inputLabel: 'password',
        inputPlaceholder: 'Enter password'
      })
      
      if (password) {
        Swal.fire(`Entered password: ${password}`)
        axios.patch('http://localhost:3001/api/update',{email:userDetails.email,password:password},{headers:{'Authorization':localStorage.getItem('token')}})
        .then((res)=>{
          console.log(res)
          if(res.data.hasOwnProperty("_id")){
            console.log(res)
            Swal.fire('Change Sucessful')
            localStorage.removeItem('token')
            navigate('/home')
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    }

    return(<div style={{margin:"15px"}}>
        <h2 align="center">Profile Details</h2>
         <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={6} md={4}>
          <div style={{textAlign:"end"}}>
            
          <Box>
            
            <img src={userDetails.image} alt="" style={{width:"255px",height:"255px"}}/><br/>
            <Button onClick={()=>{handelUpdatePassword(userDetails)}} variant='contained' color='secondary'>Change Password </Button>
          </Box>
          </div>
        </Grid>
        <Grid xs={6} md={8}>
          <div style={{textAlign:"start"}}>
          <Box>
            <Typography variant='h5'>Username:{userDetails.username}<Button onClick={()=>{handelUpdateUsername(userDetails)}}><EditIcon/></Button></Typography><br/>
            <Typography variant='h5'>Email:{userDetails.email} </Typography><br/>
            <Typography variant='h5'>Mobile:{userDetails.mobile} <Button onClick={()=>{handelUpdateMobile(userDetails)}}><EditIcon/></Button></Typography><br/>
          
          </Box>
          </div>
        </Grid>
      </Grid>
    </Box>
    </div>)
}

export default Profile