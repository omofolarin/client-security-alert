import * as React from "react";

import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import OptionUnstyled, {
  optionUnstyledClasses,
} from "@mui/base/OptionUnstyled";
import SelectUnstyled, {
  SelectUnstyledProps,
  SelectUnstyledRootSlotProps,
  selectUnstyledClasses,
} from "@mui/base/SelectUnstyled";
import { blue, grey } from "@mui/material/colors";

import PopperUnstyled from "@mui/base/PopperUnstyled";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import { makeStyles } from "tss-react/mui";
import { styled } from "@mui/system";

const useStyle = makeStyles<{ size?: string }>()((theme, { size }) => {
  return {
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

    styledButton: {
      fontFamily: "IBM Plex Sans, sans-serif",
      fontSize: "0.875rem",
      boxSizing: "border-box",
      minHeight: "calc(1.5em + 22px)",
      minWidth: "100%",
      width: "100%",
      padding: "12px",
      borderRadius: "12px",
      textAlign: "left",
      lineHeight: 1.5,
      background: theme.palette.mode === "dark" ? grey[900] : "#fff",
      border: `1px solid  ${
        theme.palette.mode === "dark" ? grey[700] : grey[200]
      }`,
      color: `${theme.palette.mode === "dark" ? grey[300] : grey[900]}`,
      position: "relative",
      transitionProperty: "all",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDuration: "120ms",
      "&:hover": {
        background: `${theme.palette.mode === "dark" ? grey[800] : grey[50]}`,
        borderColor: `${theme.palette.mode === "dark" ? grey[600] : grey[300]}`,
      },

      "&": {
        [selectUnstyledClasses.focusVisible]: {
          borderColor: `${blue[400]}`,
          outline: `3px solid ${
            theme.palette.mode === "dark" ? blue[500] : blue[200]
          }`,
        },
      },

      "& > svg": {
        fontSize: "1rem",
        position: "absolute",
        height: "100%",
        top: 0,
        right: "10px",
      },
    },
  };
});
export const SelectInputButton = React.forwardRef(function Button<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TValue extends {}
>(props: SelectUnstyledRootSlotProps<TValue>, ref: React.ForwardedRef<HTMLButtonElement>) {
  const { ownerState, ...other } = props;
  const { classes } = useStyle({ size: "medium" });

  return (
    <button type="button" {...other} ref={ref} className={classes.styledButton}>
      {other.children}
      {ownerState.open ? <UnfoldMoreRoundedIcon /> : <UnfoldMoreRoundedIcon />}
    </button>
  );
});

const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 100%;
  width: 100%;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${
    theme.palette.mode === "dark" ? grey[900] : grey[200]
  };
  `
);

export const SelectOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }
  `
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
  width: 100%;
  position: absolute;
  overflow-y: auto;
`;

// eslint-disable-next-line @typescript-eslint/ban-types
export type SelectInputProps<TValue extends {}> =
  SelectUnstyledProps<TValue> & {
    label?: string;
    labelClassName?: string;
    id?: string;
    required?: boolean;
    error?: boolean;
    helpText?: string;
  };

export const SelectInput = React.forwardRef(function CustomSelect<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TValue extends {}
>(props: SelectInputProps<TValue>, ref: React.ForwardedRef<HTMLButtonElement>) {
  const components = {
    Root: SelectInputButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    // ...props.component
  };

  const { labelClassName, label, id } = props;
  const { classes, cx } = useStyle({ size: "medium" });

  return (
    <FormControl sx={{ width: "100%" }}>
      {label && (
        <FormLabel
          htmlFor={id}
          sx={{ py: 0.5 }}
          className={cx(classes.label, labelClassName)}
        >
          {label}
        </FormLabel>
      )}
      <SelectUnstyled
        {...props}
        ref={ref}
        id={id}
        slots={{
          root: SelectInputButton,
          listbox: StyledListbox,
          popper: StyledPopper,
        }}
      />

      <FormHelperText sx={{ marginLeft: 0.25 }} error={props.error}>
        {props.helpText}
      </FormHelperText>
    </FormControl>
  );
});
