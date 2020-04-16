import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CountriesList from '../CountriesList/CountriesList';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface PropTypes {
  currency: string;
  setCurrentCurrency: (currency: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 120,
      '& > *': {
        backgroundColor: theme.palette.grey[300],
        width: 120
      },
    },
  }),
);

const CurrencyPicker: React.FC<PropTypes> = ({ currency, setCurrentCurrency }) => {
  const [isVisible, toggleIsVisible] = useState<boolean>(false);

  const classes = useStyles();

  function toggleListVisibility() {
    toggleIsVisible(!isVisible)
  };

  return (
    <div>
      <div className={classes.root} onClick={toggleListVisibility}>
        <Button>{currency}</Button>
      </div>
      {isVisible && <CountriesList toggleIsActive={toggleListVisibility} setCurrency={setCurrentCurrency} defaultCurrency={currency} />}
    </div>
  );
};

export default CurrencyPicker;
