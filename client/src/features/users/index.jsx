import React, { useState, useCallback, useEffect } from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import usersService from 'services/usersService';
import { adaptUsersTableData } from 'helpers/adapter';

import M from 'messages';
import CircularLoading from 'components/loading/Loading';
import User from './user/user';
import styles from './styles';
import PageTitle from 'components/pageTitle';

const UsersPage = ({ title }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [usersData, setUsersData] = useState({ count: 0, data: [] });
  const [loading, setLoading] = useState([]);

  const getUsersLists = useCallback(
    async () => {
      try {
        const response = await usersService.getUsers();
        if (response) {
          setUsersData({
            count: response.data.count,
            data: adaptUsersTableData(response.data.data),
          });
          setLoading(false);
        }
      } catch (err) {
        toast.error(M.get('actionMsg.error.get'));
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    getUsersLists();
  }, [getUsersLists]);

  return loading ? (
    <CircularLoading />
  ) : (
    <div className={classes.content}>
      <PageTitle>{M.get(title)}</PageTitle>

      <Grid mt={2} spacing={3} container className={classes.itemsContent}>
        {usersData.data.map((user) => (
          <Grid key={user.id} item xs={12} sm={6} md={4} lg={3}>
            <User user={user} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

UsersPage.propTypes = {
  title: PropTypes.string.isRequired,
};

export default UsersPage;
