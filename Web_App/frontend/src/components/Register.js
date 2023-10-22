import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Grid , TextField , Button ,Card , Select , MenuItem , CardContent , Typography , InputLabel , FormControl} from "@material-ui/core";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useHistory } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [nameError,setNameError] = useState(false);
  const [nameErrorText,setNameErrorText] = useState("");
  const [nic_or_pass, setNic_or_pass] = useState("");
  const [nic_or_passError,setNic_or_passError] = useState(false);
  const [nic_or_passErrorText,setNic_or_passErrorText] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError,setPhoneError] = useState(false);
  const [phoneErrorText,setPhoneErrorText] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError,setUsernameError] = useState(false);
  const [usernameErrorText,setUsernameErrorText] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError,setPasswordError] = useState(false);
  const [passwordErrorText,setPasswordErrorText] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [cpasswordError,setCpasswordError] = useState(false);
  const [cpasswordErrorText,setCpasswordErrorText] = useState("");
  const [country, setCountry] = useState("");
  const [countryError,setCountryError] = useState(false);
  const [countryErrorText,setCountryErrorText] = useState("");
  const inputRef = React.useRef();
  let history = useHistory();

  useEffect(async () => {
    if (localStorage.getItem("loginAccess")) {
      if (localStorage.getItem("type") === "patient") {
      } else {
        if (localStorage.getItem("type") === "admin") {
          history.push("/admin");
        } else if (localStorage.getItem("type") === "doctor") {
          history.push("/doctor");
        } else if (localStorage.getItem("type") === "nurse") {
          history.push("/nurse");
        } else if (localStorage.getItem("type") === "pharmacy") {
          history.push("/pharmacy");
        }
      }
    }
  }, []);

  const setNameForm = (e) => {
    setName(e.target.value);
  };

  const setNic_or_passForm = (e) => {
    setNic_or_pass(e.target.value);
  };

  const setPhoneForm = (e) => {
    setPhone(e.target.value);
  };

  const setUsernameForm = (e) => {
    setUsername(e.target.value);
  };

  const setPasswordForm = (e) => {
    setPassword(e.target.value);
  };

  const setCpasswordForm = (e) => {
    setCpassword(e.target.value)
  };

  const setCountryForm = (e) => {
    setCountry(e.target.value);
  };

  const onClear = () => {
    setNic_or_pass("");
    setPhone("");
    setUsername("");
    setPassword("");
    setCpassword("");
    setName("");
    setCountry("");
    inputRef.current.focus();
  };

  const validation = () => {
    var Error = false;

    if (name === "") {
      setNameError(true)
      setNameErrorText("Name Required!")
      Error = true
    }else{
      setNameError(false)
      setNameErrorText('')
    }

    if (nic_or_pass === "") {
      setNic_or_passError(true)
      setNic_or_passErrorText("Nic or Passport Required!")
      Error = true;
    }else{
      setNic_or_passError(false)
      setNic_or_passErrorText('')
    }

    if (phone === "") {
      setPhoneError(true)
      setPhoneErrorText("Phone Required!")
      Error = true;
    }else{
      setPhoneError(false)
      setPhoneErrorText('')
    }

    if (username === "") {
      setUsernameError(true)
      setUsernameErrorText("Username Required!")
      Error = true;
    }else{
      setUsernameError(false)
      setUsernameErrorText('')
    }

    if (password === "") {
      setPasswordError(true)
      setPasswordErrorText("Password Required!")
      Error = true;
    }else{
      setPasswordError(false)
      setPasswordErrorText('')
    }

    if (cpassword === "") {
      setCpasswordError(true)
      setCpasswordErrorText("Confirm Password Required!")
      Error = true;
    } else if (password !== cpassword) {
      setCpasswordError(true)
      setCpasswordErrorText("Password & Confirm Password Not Equal!")
      Error = true;
    }else{
      setCpasswordError(false)
      setCpasswordErrorText('')
    }
    
    if (country === "") {
      setCountryError(true)
      setCountryErrorText("Country Required!")
      Error = true
    }else{
      setCountryError(false)
      setCountryErrorText('')
    }

    if (Error) {
      return false;
    }

    return true;
  };

  const SubmitForm = async (e) => {
    e.preventDefault();

    if (validation()) {
      const url = "http://localhost:3500/User";
      const data = JSON.stringify({
        name: name,
        nic_or_pass: nic_or_pass,
        phone: phone,
        username: username,
        password: password,
        country: country
      });
      console.log(data);
      await axios
        .post(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(async (res) => {
          console.log(res);
          if (res.data.err !== "connection") {
            if (res.data.err === "username") {
              setUsername("");
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Validation Error!"
                    content="Username Already Exists!"
                    scheme={Cinnamon.Crisp.SCHEME_RED}
                    icon={<ErrorOutlineIcon />}
                  />
                ),
              });
            } else if (res.data.err !== "already") {
              onClear();
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Success!"
                    content="Insert Successful!"
                    scheme={Cinnamon.Crisp.SCHEME_GREEN}
                    icon={<CheckCircleOutlineIcon />}
                  />
                ),
              });
            } else {
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Validation Error!"
                    content="Already Exists!"
                    scheme={Cinnamon.Crisp.SCHEME_RED}
                    icon={<ErrorOutlineIcon />}
                  />
                ),
              });
            }
          } else {
            ButterToast.raise({
              content: (
                <Cinnamon.Crisp
                  title="Validation Error!"
                  content="Connection Error!"
                  scheme={Cinnamon.Crisp.SCHEME_RED}
                  icon={<ErrorOutlineIcon />}
                />
              ),
            });
          }
        });
    }
  };

  return (
    <div className="App">
      <br />
      <Grid>
        <Card
          style={{
            maxWidth: 50 + "%",
            padding: "20px 5px",
            margin: "0 auto",
            backgroundColor: "#f5f5f5",
            boxShadow: "0 10px 6px rgba(0, 0, 0, 0.16)",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              style={{ fontFamily: "Arial", fontSize: "34px" }}
            >Register</Typography>
            <br />
            <form autoComplete="off" onSubmit={SubmitForm}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Name"
                    inputRef={inputRef}
                    autoFocus
                    variant="outlined"
                    name="name"
                    value={name}
                    error ={nameError}
                    helperText= {nameErrorText}
                    onChange={setNameForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="NIC or Passport"
                    variant="outlined"
                    name="nic_or_pass"
                    value={nic_or_pass}
                    error ={nic_or_passError}
                    helperText= {nic_or_passErrorText}
                    onChange={setNic_or_passForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select
                      name="country"
                      value={country}
                      error ={countryError}
                      helperText= {countryErrorText}
                      style={{ textAlign: "left" }}
                      onChange={setCountryForm}
                    >
                      <MenuItem value={""}>
                        <p>Select</p>
                      </MenuItem>
                      <MenuItem value={"Sri Lanka"}>
                        <p>Sri Lanka</p>
                      </MenuItem>
                      <MenuItem value={"India"}>
                        <p>India</p>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    placeholder="Phone Number"
                    variant="outlined"
                    name="phone"
                    value={phone}
                    error ={phoneError}
                    helperText= {phoneErrorText}
                    onChange={setPhoneForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Username"
                    variant="outlined"
                    name="username"
                    value={username}
                    error ={usernameError}
                    helperText= {usernameErrorText}
                    onChange={setUsernameForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    placeholder="Password"
                    variant="outlined"
                    name="password"
                    value={password}
                    error ={passwordError}
                    helperText= {passwordErrorText}
                    onChange={setPasswordForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    placeholder="Confirm Password"
                    variant="outlined"
                    name="cpassword"
                    value={cpassword}
                    error ={cpasswordError}
                    helperText= {cpasswordErrorText}
                    onChange={setCpasswordForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onClear()}
                    fullWidth
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <br />
    </div>
  );
}

export default Register;
