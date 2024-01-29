import React, { useEffect, useState } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logout } from "../../actions/login";
import { styles } from "./styles";

const Navbar = () => {
  const [profile, setProfile] = useState(
    localStorage.getItem("profile")
      ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
      : "null"
  );
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.login);

  const user = userState?.authData;

  const history = useNavigate();

  const location = useLocation();

  const onLogout = () => {
    dispatch(logout(history));
    setProfile("");
  };

  useEffect(() => {
    if (profile !== "null" && profile !== null) {
      if (profile.exp * 1000 < new Date().getTime()) onLogout();
    }
    setProfile(
      localStorage.getItem("profile")
        ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
        : "null"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <AppBar sx={styles.appBar} position="static" color="inherit">
      {!userState?.loading && (
        <>
          <div sx={styles.brandContainer}>
            <Typography
              component={Link}
              to="/"
              sx={styles.heading}
              variant="h5"
              align="center"
            >
              CoinToss
            </Typography>
          </div>
          <Toolbar sx={styles.toolbar}>
            {userState?.isAuthenticated && (
              <>
                <div sx={styles.profile}>
                  <Avatar
                    sx={styles.purple}
                    alt={user?.name}
                    src={user?.picture}
                  >
                    {user?.name?.charAt(0)}
                  </Avatar>
                  <Box sx={styles.credentialContainer}>
                    <Typography sx={styles.userName} variant="h6">
                      {user?.name}
                    </Typography>
                    <Typography sx={styles.userName} variant="h6">
                      Tokens: {user?.tokens}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    sx={styles.logout}
                    color="secondary"
                    onClick={onLogout}
                  >
                    Logout
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      history("/password");
                    }}
                  >
                    Set Password
                  </Button>
                </div>
              </>
            )}
            {!userState?.isAuthenticated && (
              <Button
                component={Link}
                to="/auth"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            )}
          </Toolbar>
        </>
      )}
    </AppBar>
  );
};

export default Navbar;
