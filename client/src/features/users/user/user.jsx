import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import PropTypes from 'prop-types';

import useStyles from './styles';

const User = ({ user }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {user.image && <CardMedia className={classes.media} image={user.image } title={user.firstName} />}
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" component="h2">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="h5" component="h2">
            {user.email}
          </Typography>
        </div>
        <Typography dangerouslySetInnerHTML={{ __html: user.email }} variant="body2" color="textSecondary" component="p" />
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
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string
    }).isRequired
}
export default User;