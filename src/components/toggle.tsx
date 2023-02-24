import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
  Switch,
  SwitchProps,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyle = makeStyles<{ size: 'large' | 'medium' | 'small' }>()(
  (theme, { size }) => ({
    label: {
      color: 'GrayText',
      fontSize: (() => {
        if (size === 'large') {
          return '1rem';
        } else if (size === 'medium') {
          return '0.85rem';
        } else if (size === 'small') {
          return '0.7rem';
        }
        return undefined;
      })(),
    },
  })
);

export const SwitchInput = (
  props: Omit<FormControlLabelProps, 'control'> & {
    labelClassName?: string;
    switchProps?: SwitchProps;
    size?: 'small' | 'medium' | 'large';
  }
) => {
  const { labelClassName, switchProps, size = 'medium' } = props;
  const { classes, cx } = useStyle({ size });

  return (
    <FormControlLabel
      {...props}
      control={<Switch {...switchProps} />}
      classes={{ label: cx(classes.label, labelClassName) }}
    />
  );
};

export const CheckboxInput = (
  props: Omit<FormControlLabelProps, 'control'> & {
    labelClassName?: string;
    checkboxProps?: CheckboxProps;
    size?: 'small' | 'medium' | 'large';
  }
) => {
  const { labelClassName, checkboxProps, size = 'medium' } = props;
  const { classes, cx } = useStyle({ size });

  return (
    <FormControlLabel
      {...props}
      control={<Checkbox {...checkboxProps} />}
      classes={{ label: cx(classes.label, labelClassName) }}
    />
  );
};
