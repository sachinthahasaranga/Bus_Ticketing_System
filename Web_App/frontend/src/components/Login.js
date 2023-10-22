import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useHistory } from "react-router-dom";

function Login() {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = React.useRef();

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

  const setUsernameForm = (e) => {
    setUsername(e.target.value);
  };

  const setPasswordForm = (e) => {
    setPassword(e.target.value);
  };

  const onClear = () => {
    setUsername("");
    setPassword("");
    inputRef.current.focus();
  };

  const validation = () => {
    var Error = false;

    if (username === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Username Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (password === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Password Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      });
      Error = true;
    }

    if (Error) {
      return false;
    }

    return true;
  };

  const SubmitForm = async (e) => {
    e.preventDefault();

    if (validation()) {
      const url = "http://localhost:3500/User/login";
      const data = JSON.stringify({
        username: username,
        password: password,
      });
      console.log(data);
      await axios
        .post(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(async (res) => {
          console.log(res.data);
          if (res.data.err === "User not found") {
            ButterToast.raise({
              content: (
                <Cinnamon.Crisp
                  title="Validation Error!"
                  content="User not found!"
                  scheme={Cinnamon.Crisp.SCHEME_RED}
                  icon={<ErrorOutlineIcon />}
                />
              ),
            });
          } else {
            if (res.data.err === "Incorrect Password") {
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Validation Error!"
                    content="Incorrect Password!"
                    scheme={Cinnamon.Crisp.SCHEME_RED}
                    icon={<ErrorOutlineIcon />}
                  />
                ),
              });
            } else {
              onClear();
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Success!"
                    content="Login Successful!"
                    scheme={Cinnamon.Crisp.SCHEME_GREEN}
                    icon={<CheckCircleOutlineIcon />}
                  />
                ),
              });
              localStorage.setItem("username", res.data.username);
              localStorage.setItem("type", res.data.privilege);
              localStorage.setItem("id", res.data.id);
              localStorage.setItem("loginAccess", true);
              console.log(res)
              if (res.data.privilege === "admin") {
                history.push("/admin");
              } else {
                history.push("/user");
              }
            }
          }
        })
        .catch(function (error) {
          console.log(error);
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
            >
              Login
            </Typography>
            <br />
            <form autoComplete="off" onSubmit={SubmitForm}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Username"
                    inputRef={inputRef}
                    autoFocus
                    label="Username"
                    variant="outlined"
                    name="username"
                    value={username}
                    onChange={setUsernameForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    placeholder="Password"
                    inputRef={inputRef}
                    label="Password"
                    variant="outlined"
                    name="password"
                    value={password}
                    onChange={setPasswordForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onClear()}
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

export default Login;
