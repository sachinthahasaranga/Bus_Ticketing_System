import React from "react";
import "../App.css";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import {AppBar,Box,Container,Divider,Grid,Stack,Toolbar,Typography,Link as MuiLink} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

class footer extends React.Component {
  Logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  render() {
    return (
      <Box 
      style={{
        margin: "0 auto",
        backgroundColor: "#060a2e"
      }}>
        <Divider />
        <Container maxWidth="xl">
          <Toolbar>
            <Grid container item columnSpacing={2} pt={2}>
              <Grid item sm={3} xs={12}>
                <Typography
                  variant="h4"
                  sx={{ fontFamily: "David Libre", color: "#ffffff" }} // Change text color to white
                  fontWeight={200}
                >
                  Ticket System
                </Typography>
                <Stack p={1} gap={0.5} sx={{ color: "#ffffff" }}>
                <Stack p={1} gap={0.5}>
                    <Typography paragraph>
                      <Facebook style={{ color: "#ffffff" }} />
                      <Instagram style={{ color: "#ffffff" }}/>
                      <Twitter style={{ color: "#ffffff" }} />
                      <YouTube style={{ color: "#ffffff" }} />
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item sm={3} xs={11} sx={{ color: "#ffffff" }}>
                <Typography variant="h5" fontWeight={500}>
                  Quick Links
                </Typography>
                <Stack p={1} gap={0.5} sx={{ color: "#ffffff" }}>
                  <a href="/store/prescriptionupload" style={{ textDecoration: 'none', color: 'inherit' }}>Upload Prescription</a>
                  <a href="/store/myorders" style={{ textDecoration: 'none', color: 'inherit' }}>My orders</a>
                  <a href="/store/profile/wishlist" style={{ textDecoration: 'none', color: 'inherit' }}>Wishlist</a>
                  <a href="/store/profile/cart" style={{ textDecoration: 'none', color: 'inherit' }}>Cart</a>
                  <a href="/store/termsandconditions" style={{ textDecoration: 'none', color: 'inherit' }}>Terms & Conditions</a>
                </Stack>
              </Grid>
              <Grid item sm={4} xs={11} sx={{ color: "#ffffff" }}>
                <Typography variant="h5" fontWeight={500}>
                  Contact Us
                </Typography>
                <Stack p={1} gap={0.5} sx={{ color: "#ffffff" }}>
                  <MuiLink
                    underline="none"  // Set underline to "none" to remove the underline
                    sx={{
                      color: "inherit",
                    }}
                    href="tel:0710001000"
                    >
                      Contact and Support : 071 00 00 000 / 071 11 11 2222
                    </MuiLink>

                    <MuiLink
                      underline="none"  // Set underline to "none" to remove the underline
                      sx={{
                        color: "inherit",
                        }}
                      href="https://goo.gl/maps/E5fqtBCg7xgCUomJ9"
                      >
                        Address : No.89, ABC Road, XYZ
                    </MuiLink>
                  </Stack>

              </Grid>
              <Grid item sm={2} xs={11} sx={{ color: "#ffffff" }}>
                <Typography variant="h5" fontWeight={500}>
                  Payment Options
                </Typography>
                <Stack p={1} gap={0.5} sx={{ color: "#ffffff" }}>
                  <img
                    alt="payment options"
                    style={{ height: "150px", width: "150px" }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>

        <AppBar
          position="static"
          elevation={0}
          component="footer"
          style={{ backgroundColor: "#060a2e" }} // Change background color
        >
          <Toolbar style={{ justifyContent: "center" }}>
          <Typography variant="caption">©2023</Typography>
          </Toolbar>
        </AppBar>

      </Box>
    );
  }
}

export default footer;
