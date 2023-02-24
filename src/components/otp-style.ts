import { InputBaseProps, colors } from "@mui/material";

import { makeStyles } from "tss-react/mui";

interface TextFieldProps extends Omit<InputBaseProps, "size"> {
  label?: string;
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;
  className?: string;
  labelClassName?: string;
  id?: string;
  name?: string;
}

export const useOtpStyle = makeStyles<
  Pick<TextFieldProps, "size" | "disabled" | "error">
>()((theme, { size, disabled, error }) => ({
  root: {
    minWidth: "100%",
    width: "100%",
  },
  label: {
    fontSize: (() => {
      if (size === "large") {
        return "1rem";
      } else if (size === "medium") {
        return "0.8rem";
      } else if (size === "small") {
        return "0.7rem";
      }
      return undefined;
    })(),
  },
  inputBaseRoot: {
    minWidth: "3.5em",
    minHeight: "3.5em",
    fontFamily: "IBM Plex Sans, sans-serif",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.5,
    padding: (() => {
      if (size === "large") {
        return "8px 16px 8px 16px";
      } else if (size === "medium") {
        return "4px 8px 4px 8px";
      } else if (size === "small") {
        return "0 8px 0px 8px";
      }
      return undefined;
    })(),
    borderRadius: "8px",
    color: `${
      theme.palette.mode === "dark" ? colors.grey[300] : colors.grey[900]
    }`,
    background: `${theme.palette.mode === "dark" ? colors.grey[900] : "#fff"}`,
    border: `2px solid ${(() => {
      if (!error) {
        return theme.palette.mode === "dark"
          ? colors.grey[700]
          : colors.grey[200];
      } else {
        return theme.palette.mode === "dark"
          ? colors.red[700]
          : colors.red[200];
      }
    })()}`,
    boxShadow: `0px 2px 2px ${
      theme.palette.mode === "dark" ? colors.grey[900] : colors.grey[50]
    }`,
    "&:hover": {
      borderColor: (() => {
        if (!disabled && !error) {
          return `${colors.blue[400]}`;
        } else if (error) {
          return `${colors.red[400]}`;
        }
        return undefined;
      })(),
    },
  },

  inputFocused: {
    borderColor: (() => {
      if (!error) {
        return `${colors.blue[400]}`;
      } else if (error) {
        return `${colors.red[400]}`;
      }
      return undefined;
    })(),

    outline: `1px solid ${() => {
      if (!error) {
        return theme.palette.mode === "dark"
          ? colors.blue[500]
          : colors.blue[200];
      } else if (error) {
        return theme.palette.mode === "dark"
          ? colors.red[500]
          : colors.red[200];
      } else {
        return "";
      }
    }}`,
  },
}));
