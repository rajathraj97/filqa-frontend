
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { MenuItem, TextField } from '@mui/material';


const Home = () =>{
    const[users,setUsers] = useState([])
    const[search,setSearch] = useState('')
    const[filter,setFilter] = useState('')
    
    useEffect(()=>{
       
        if(search === ''){
            axios.get('http://localhost:3001/api/getusers')
        .then((res)=>{
            setUsers(res.data)
        })
        .catch((e)=>{
            console.log(e)
        })
        }else{
            const result = users.filter((ele)=>{return ele.username.includes(search)})
            console.log(result,'result')
            setUsers(result)
        }
    },[search])
    
    useEffect(()=>{
        if(filter === ''){
            axios.get('http://localhost:3001/api/getusers')
        .then((res)=>{
            setUsers(res.data)
        })
        .catch((e)=>{
            console.log(e)
        })
        }else{
            const result = users.filter((ele)=>{return ele.email.includes(filter)})
            console.log(result,'result')
            setUsers(result)
        }
    },[filter])

    
    useEffect(()=>{
        axios.get('http://localhost:3001/api/getusers')
        .then((res)=>{
            setUsers(res.data)
        })
        .catch((e)=>{
            console.log(e)
        })
    },[])
    console.log(users)
    
    const handelChange = (e) =>{
        if(e.target.name === 'search'){
            setSearch(e.target.value)
        }
        if(e.target.name === 'select'){
            setFilter(e.target.value)
        }   
       
    }
    console.log(filter)
    return(<div style={{margin:"15px"}}>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={8}>
         Search: <TextField name="search" size="small" value={search} onChange={(e)=>{handelChange(e)}} id="outlined-basic" label="Outlined" variant="outlined" />
        </Grid>
        <Grid xs={4}>
        <div style={{textAlign:"end"}}>
       filter: <TextField
          id="outlined-select-currency"
          select
          label="Select"
          size='small'
          name="select"
          helperText="Please select filter"
          onChange={(e)=>{handelChange(e)}}
        >
        <MenuItem value={''}>none</MenuItem>
        <MenuItem value={'gmail'}>gmail</MenuItem>
        <MenuItem value={'yahoo'}>yahoo</MenuItem>
        </TextField>
        </div>
        </Grid>
      </Grid>
      <hr/><br/>
      <h3>Total-Users:{users.length}</h3>
        <ul>
            {users.map((usr,i)=>{
                return <div><li key={i}>username: {usr.username} - email:{usr.email} </li></div>
            })}
        </ul>
    </Box>
    </div>)
}

export default Home