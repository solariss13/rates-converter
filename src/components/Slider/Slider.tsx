import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import debounce from '../../utils/use-debounce';
import calculateDate from '../../utils/calculateDate';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '80vw',
      marginTop: 30,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    margin: {
      height: 10,
    },
  }),
);

interface PropTypes {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

interface CustomizedSliderProps {
  onDateChange: (date: string) => void
}

function ValueLabelComponent(props: PropTypes) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement='top' title={calculateDate(value)}>
      {children}
    </Tooltip>
  );
}

const CustomizedSlider: React.FC<CustomizedSliderProps> = ({ onDateChange }) => {
  const [state, setState] = useState<string>(calculateDate(1089));
  const debouncedState = debounce(state, 100);
  const classes = useStyles();

  useEffect(() => {
    onDateChange(state as string);
  }, [debouncedState]);

  function handleChange(event: React.ChangeEvent<{}>, value: number | number[]) {
    const date: string = calculateDate(value as number);

    setState(date)
  };

  return (
    <div className={classes.root}>
      <Slider
        track='inverted'
        ValueLabelComponent={ValueLabelComponent}
        onChange={handleChange}
        defaultValue={1089}
        min={1}
        max={1096}
      />
    </div>
  );
}

export default CustomizedSlider;
