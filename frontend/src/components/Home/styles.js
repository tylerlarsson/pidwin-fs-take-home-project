import { theme } from "../../themes/Default";
import { deepPurple } from "@mui/material/colors";

export const styles = {
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "1000px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  form: {
    "& > .MuiInputBase-root": {
      backgroundColor: theme.palette.common.white,
    },
  },
  formContainer: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    rowGap: theme.spacing(2),
  },
  coinContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    columnGap: theme.spacing(1),
  },
  coin: {
    display: "block",
    margin: "0 auto",
  },
  coinInnerContainer: {
    minWidth: 54,
  },
  won: {
    color: theme.palette.success["main"],
  },
  lost: {
    color: theme.palette.error["main"],
  },
};
