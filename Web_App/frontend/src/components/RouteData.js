import React, { useState , useEffect } from "react"
import "../App.css"
import { Grid, Button, Card, CardContent, Typography } from '@material-ui/core'

function RouteData() {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div className="App">
      <br/>
      <Typography gutterBottom variant="h3" align="center">
      Route Manage
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 50+'%', padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
            Routes
            </Typography>
            <br />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button href="/add_route" type="submit" variant="contained" color="primary" fullWidth>Add New Route</Button>
                </Grid>
                <Grid item xs={12}>
                  <Button href="/all_routes" type="submit" variant="contained" color="primary" fullWidth>All Route</Button>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => logout()}
                    fullWidth
                  >Logout</Button>
                </Grid>

              </Grid>
          </CardContent>
        </Card>
      </Grid>
      <br/>
    </div>
  );
}

export default RouteData;