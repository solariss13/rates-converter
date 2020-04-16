import React, { useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

interface PropTypes {
  onDateChange: (date: string) => void;
}

const useStyles = makeStyles({
  root: {
    marginLeft: 20
  }
});

const week = 7;
const month = 31;
const year = month * 12;


const RadioButtons: React.FC<PropTypes> = ({ onDateChange }) => {
  const [value, setValue] = React.useState<string>(getDateFromPast(week));
  const classes = useStyles();

  useEffect(() => {
    onDateChange(value);
  }, [value])

  function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset" className={classes.root}>
      <RadioGroup value={value} onChange={handleChange}>
        <FormControlLabel value={getDateFromPast(week)} control={<Radio />} label="7 days" />
        <FormControlLabel value={getDateFromPast(month)} control={<Radio />} label="1 month" />
        <FormControlLabel value={getDateFromPast(year)} control={<Radio />} label="1 year" />
        <FormControlLabel value={getDateFromPast(3 * year)} control={<Radio />} label="3 years" />
        <FormControlLabel value={getDateFromPast(5 * year)} control={<Radio />} label="5 years" />
      </RadioGroup>
    </FormControl>
  );
}

export default RadioButtons;


export function getDateFromPast(daysAgo: number) {
  const referenceDate = new Date();
  const dayInPast = referenceDate.getDate() - daysAgo;
  referenceDate.setDate(dayInPast)

  const dateWithoutTimestamp = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());
  const result = new Date(dateWithoutTimestamp).toISOString().slice(0,10);
  return result;
};
