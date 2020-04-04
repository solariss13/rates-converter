import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line import/prefer-default-export
export const useListStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      width: '100%',
      height: 300,
      maxWidth: 100,
      backgroundColor: theme.palette.background.paper,
    },
  });
});

export const useListItemStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      position: 'relative',
      height: 42,
      width: 'min-content',
      backgroundColor: theme.palette.background.paper,
    },
  });
});

export const useButtonStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  });
});
