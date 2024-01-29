import React from "react";
import {
  Container,
  Grow,
  Paper,
  Typography,
  TextField,
  Box,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormHelperText,
  Avatar,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { wager } from "../../actions/wager";
import { styles } from "./styles";

const Home = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login);

  const formik = useFormik({
    initialValues: {
      tokens: "",
      wager: "",
    },
    validationSchema: yup.object().shape({
      tokens: yup.string().required("Tokens is required"),
      wager: yup.string().required("Wager is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      dispatch(
        wager({
          tokens: Number(values.tokens),
          ...values,
        })
      );
      resetForm();
    },
  });

  return (
    <Grow in>
      <Container component="main" maxWidth="sm">
        <Paper elevation={3}>
          {user?.isAuthenticated ? (
            <>
              <Typography variant="h4" align="center" color="primary">
                {`Welcome ${user.authData.name}`}
              </Typography>
            </>
          ) : (
            <Typography variant="h4" align="center" color="primary">
              Login to Play
            </Typography>
          )}
        </Paper>
        {user?.isAuthenticated && (
          <form onSubmit={formik.handleSubmit}>
            <Box sx={styles.formContainer}>
              <Box sx={styles.coinContainer}>
                {user?.authData?.coinTossResults?.map((coin) => {
                  return (
                    <Box sx={styles.coinInnerContainer} key={coin._id}>
                      <Avatar sx={styles.coin} src="/coin.svg" alt="Coin" />
                      <Typography variant="h6" component="p" align="center">
                        {coin.outcome}
                      </Typography>
                      <Typography variant="body2" component="p" align="center">
                        {coin.won ? (
                          <Typography sx={styles.won} component="span">
                            Won
                          </Typography>
                        ) : (
                          <Typography sx={styles.lost} component="span">
                            Lost
                          </Typography>
                        )}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
              <TextField
                error={formik.errors["tokens"] && formik.touched["tokens"]}
                helperText={
                  formik.errors["tokens"] && formik.touched["tokens"] ? (
                    <>{formik.errors["tokens"]}</>
                  ) : null
                }
                sx={styles.form}
                id="tokens"
                label="Tokens"
                variant="outlined"
                type="number"
                name="tokens"
                fullWidth
                value={formik.values.tokens}
                onKeyPress={(event) => {
                  if (event.charCode < 48) {
                    event.preventDefault();
                  }
                }}
                onChange={formik.handleChange}
                InputProps={{
                  inputProps: { min: 1 },
                }}
              />
              <FormControl
                error={formik.errors["wager"] && formik.touched["wager"]}
                variant="standard"
              >
                <RadioGroup
                  name="wager"
                  onChange={formik.handleChange}
                  value={formik.values.wager}
                  row
                >
                  <FormControlLabel
                    value="heads"
                    control={<Radio />}
                    label="Heads"
                  />
                  <FormControlLabel
                    value="tails"
                    control={<Radio />}
                    label="Tails"
                  />
                </RadioGroup>
                <FormHelperText>
                  {formik.errors["wager"] && formik.touched["wager"]
                    ? formik.errors["wager"]
                    : null}
                </FormHelperText>
              </FormControl>
              <Button variant="contained" fullWidth type="submit">
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Container>
    </Grow>
  );
};

export default Home;
