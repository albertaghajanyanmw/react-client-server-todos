import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  root: {
    maxWidth: '100%',
  },
  media: {
    width: '100%',
    height: 250
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
}));