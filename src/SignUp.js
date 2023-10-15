import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate,Link } from "react-router-dom";
import { MenuItem } from "@mui/material";
import axios from 'axios'
import Swal from "sweetalert2";


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignUp = () => {
  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    countrycode: "",
  });

 
  const navigate = useNavigate()
  
  const handleSubmit = (e,data) => {
    e.preventDefault()
    axios.post('http://localhost:3001/api/register',data)
    .then((res)=>{
        console.log(res)
        if(res.data.hasOwnProperty("_id")){
            Swal.fire("registered sucessfully")
            navigate("/login")
        }
    })
    .catch((err)=>{
        console.log(err)
    })
  };

  const handelChange = (e) => {
    if (e.target.name === "mobile") {
      setData({ ...data, [e.target.name]: parseInt(e.target.value) });
    } else if (e.target.name === "countrycode") {
      setData({ ...data, [e.target.name]: parseInt(e.target.value) });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  value={data.username}
                  onChange={(e) => {
                    handelChange(e);
                  }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={data.email}
                  onChange={(e) => {
                    handelChange(e);
                  }}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={data.password}
                  onChange={(e) => {
                    handelChange(e);
                  }}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  name="countrycode"
                  helperText="Country Code"
                  sx={{autoWidth:"false"}}
                  onChange={(e)=>{handelChange(e)}}
                >
                  <MenuItem value={"91"}>+91</MenuItem>
                  <MenuItem value={"1"}>+1</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={9}>
                <TextField
                  required
                  fullWidth
                  name="mobile"
                  label="mobile"
                  type="number"
                  id="mobile"
                  value={data.mobile}
                  onChange={(e) => {
                    handelChange(e);
                  }}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e)=>{handleSubmit(e,data)}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                  <Link style={{textDecoration:"none"}} to="/login">
                  Already have an account? Sign in
                  </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
