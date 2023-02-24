import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputBase,
  InputBaseProps,
  InputLabelProps,
  InputProps,
  colors,
} from "@mui/material";

import React from "react";
import { makeStyles } from "tss-react/mui";

export const useInputStyle = makeStyles<
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
    minWidth: "100%",
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

interface TextFieldProps extends Omit<InputBaseProps, "size"> {
  label?: string;
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;
  className?: string;
  labelClassName?: string;
  id?: string;
  name?: string;
  helpText?: string;
  InputProps?: InputProps;
  InputLabelProps?: InputLabelProps;
}

export const TextInput = React.forwardRef((props: TextFieldProps, ref) => {
  const {
    label,
    className,
    id,
    name,
    size,
    labelClassName,
    style,
    helpText,
    InputProps,
    InputLabelProps,
    ...inputBaseProps
  } = props;
  const { classes, cx } = useInputStyle({
    size,
    disabled: inputBaseProps.disabled,
    error: inputBaseProps.error,
  });
  if (label && !id) {
    console.warn("please add an id for this input");
  }

  return (
    <FormControl className={cx(classes.root, className)}>
      {label && (
        <FormLabel
          htmlFor={id}
          sx={{ py: 0.5 }}
          {...{
            error: inputBaseProps.error,
            disabled: inputBaseProps.disabled,
            required: inputBaseProps.required,
            filled: Boolean(inputBaseProps.value),
          }}
          className={cx(classes.label, labelClassName)}
          {...InputLabelProps}
        >
          {label}
        </FormLabel>
      )}
      <InputBase
        style={style}
        ref={ref}
        id={id}
        name={name}
        classes={{
          root: classes.inputBaseRoot,
          focused: classes.inputFocused,
        }}
        {...inputBaseProps}
        {...InputProps}
      />

      <FormHelperText sx={{ marginLeft: 0.25 }} error={inputBaseProps.error}>
        {helpText}
      </FormHelperText>
    </FormControl>
  );
});

TextInput.defaultProps = {
  size: "medium",
};

/**
 *
 *  file
 * html <div class>
 *
 *   React <div className=""/>
 *   // inline css
 *   React <div style={{fontSize: '14px'}}
 *
 *   // style.css
 *
 *   .root {
 *     background: #fff
 *     color: blue
 *
 *   }
 *
 *
 *   .root {
 *  background: red,
 * }
 *
 *   .bg_white {
 *  background-color: white
 * }
 *
 *  .bg_small {
 *   max-width: 100px
 *   }
 *
 *   .color {
 *      color: red
 *   }
 *
 *
 *
 * 1. html/css
 *    file
 *   import styles from './styles.css'
 *   import customStyles from './custom-styles.css'
 *
 *   <div className="root"/>
 *
 *    <input className="root"/>
 *
 *   // name spacing and style collision
 *
 *   // bem - block-element-modifier   main__input--disabled main__input--success, main__input--error
 *   // atom css - .bg_white .bg_small .color_red
 *
 *
 *  2.  // css modules
 *
 *
 *   .root {}
 *   .orange {}
 *
 *  import styles from './styles.css'
 *  import customStyles from './custom-styles.css'
 *
 *   <div className={styles.root} />
 *   <div className={customStyles.orange} />
 *   <div className={[styles.root, customStyles.root]} />
 *
 *  ///browser inspect css
 *    .root
 *    .root-#hash
 *
 *
 *    ./text-filled
 *       index.tsx | index.jsx
 *       text-field.css
 *       text-field.scss
 *
 *
 *  style engines: emotion | styledComponent
 *
 *  3. JSS format  javascript styles
 *
 *   const style = {
 *      fontSize: '12px'
 *    }
 *
 *
 *    const style = useStyle(() => {
 *  return {
 *    fontSize: '12px'
 * }
 * })
 *
 *     <head style= />
 *     <div style={style.root} />
 *
 *
 *  4. StyledComponent
 *
 *    const StyledDiv = StyleComponent(div)('
 *    .root {
 *        font-size: 12px
 *     }
 *   ')
 *
 *
 *
 *
 *  Provider pattern <Provider></Provider>
 *
 *  <Context.Provider>
 *
 *  <Context.Provider
 *
 *
 *
 *
 *   Rules of hooks
 *
 *   const EmotionContext = React.createContext({});
 * /// custom hook
 *   const useEmotion = () => React.useContext(EmotionContext);
 *
 *   Provider = ({children}) => (
 *   <EmotionContext.Provider value={null}>
 *    {children}
 *  </EmotionContext.Provider>
 * )
 *
 *
 *
 *   MyComponent = () => {
 *  const emotion = useEmotion()
 *  }
 */
