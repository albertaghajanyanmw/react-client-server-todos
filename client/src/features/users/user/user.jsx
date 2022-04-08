import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import PropTypes from 'prop-types';

import useStyles from './styles';

const User = ({ user }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {user.image && (
        <CardMedia
          className={classes.media}
          image={user.image}
          title={user.firstName}
        />
      )}
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" component="h2">
            {user.firstName || user.lastName
              ? `${user.firstName} ${user.lastName}`
              : user.nickName}
          </Typography>
          <Typography variant="h5" component="h2">
            {user.email}
          </Typography>
        </div>
        <Typography
          dangerouslySetInnerHTML={{
            __html: user.firebaseToken ? 'Has token' : 'No token',
          }}
          variant="body2"
          color={user.firebaseToken ? "green" : "red"}
          component="p"
        />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="Add to Friend">
          <AccountCircleIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    nickName: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    firebaseToken: PropTypes.string,
  }).isRequired,
};
export default User;
