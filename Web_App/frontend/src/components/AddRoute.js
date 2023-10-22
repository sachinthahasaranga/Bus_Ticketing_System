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
  const [vehicle_num, setVehicle_num] = useState("");
  const [vehicle_numError,setVehicle_numError] = useState(false);
  const [vehicle_numErrorText,setVehicle_numErrorText] = useState("");
  const [time, setTime] = useState("");
  const [timeError,setTimeError] = useState(false);
  const [timeErrorText,setTimeErrorText] = useState("");
  const [driver, setDriver] = useState("");
  const [driverError,setDriverError] = useState(false);
  const [driverErrorText,setDriverErrorText] = useState("");
  const [descrption, setDescrption] = useState("");
  const [descrptionError,setDescrptionError] = useState(false);
  const [descrptionErrorText,setDescrptionErrorText] = useState("");
  const [date, setDate] = useState("");
  const [dateError,setDateError] = useState(false);
  const [dateErrorText,setDateErrorText] = useState("");
  const [price, setPrice] = useState("");
  const [priceError,setPriceError] = useState(false);
  const [priceErrorText,setPriceErrorText] = useState("");
  const inputRef = React.useRef();
  let history = useHistory();

  useEffect(async () => {
    if (localStorage.getItem("loginAccess")) {
    }
  }, []);

  const setNameForm = (e) => {
    setName(e.target.value);
  };

  const setVehicle_numForm = (e) => {
    setVehicle_num(e.target.value);
  };

  const setTimeForm = (e) => {
    setTime(e.target.value);
  };

  const setPriceForm = (e) => {
    setPrice(e.target.value);
  };

  const setDriverForm = (e) => {
    setDriver(e.target.value);
  };

  const setDescrptionForm = (e) => {
    setDescrption(e.target.value);
  };

  const setDateForm = (e) => {
    setDate(e.target.value)
  };

  const onClear = () => {
    setVehicle_num("");
    setTime("");
    setDriver("");
    setDescrption("");
    setDate("");
    setName("");
    setPrice("");
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
    
    if (price === "") {
      setPriceError(true)
      setPriceErrorText("Price Required!")
      Error = true
    }else{
      setPriceError(false)
      setPriceErrorText('')
    }

    if (vehicle_num === "") {
      setVehicle_numError(true)
      setVehicle_numErrorText("Vehicle Number Required!")
      Error = true;
    }else{
      setVehicle_numError(false)
      setVehicle_numErrorText('')
    }

    if (time === "") {
      setTimeError(true)
      setTimeErrorText("Time Required!")
      Error = true;
    }else{
      setTimeError(false)
      setTimeErrorText('')
    }

    if (driver === "") {
      setDriverError(true)
      setDriverErrorText("Driver Name Required!")
      Error = true;
    }else{
      setDriverError(false)
      setDriverErrorText('')
    }

    if (descrption === "") {
      setDescrptionError(true)
      setDescrptionErrorText("Descrption Required!")
      Error = true;
    }else{
      setDescrptionError(false)
      setDescrptionErrorText('')
    }

    if (date === "") {
      setDateError(true)
      setDateErrorText("Date Required!")
      Error = true;
    }else{
      setDateError(false)
      setDateErrorText('')
    }

    if (Error) {
      return false;
    }

    return true;
  };

  const SubmitForm = async (e) => {
    e.preventDefault();

    if (validation()) {
      const url = "http://localhost:3500/route";
      const data = JSON.stringify({
        name: name,
        vehicle_num: vehicle_num,
        time: time,
        driver: driver,
        descrption: descrption,
        price: price,
        date: date
      });
      console.log(data);
      await axios
        .post(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(async (res) => {
          console.log(res);
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
                    placeholder="Vehicle Number"
                    variant="outlined"
                    name="vehicle_num"
                    value={vehicle_num}
                    error ={vehicle_numError}
                    helperText= {vehicle_numErrorText}
                    onChange={setVehicle_numForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="date"
                    placeholder="Date"
                    variant="outlined"
                    name="date"
                    value={date}
                    error ={dateError}
                    helperText= {dateErrorText}
                    onChange={setDateForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="time"
                    placeholder="Time Number"
                    variant="outlined"
                    name="time"
                    value={time}
                    error ={timeError}
                    helperText= {timeErrorText}
                    onChange={setTimeForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Driver"
                    variant="outlined"
                    name="driver"
                    value={driver}
                    error ={driverError}
                    helperText= {driverErrorText}
                    onChange={setDriverForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    placeholder="Price"
                    variant="outlined"
                    name="price"
                    value={price}
                    error ={priceError}
                    helperText= {priceErrorText}
                    onChange={setPriceForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="descrption"
                    placeholder="Descrption"
                    variant="outlined"
                    name="descrption"
                    value={descrption}
                    error ={descrptionError}
                    helperText= {descrptionErrorText}
                    onChange={setDescrptionForm}
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
