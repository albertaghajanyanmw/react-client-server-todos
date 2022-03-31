import React, { useState, useCallback, useEffect } from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useHistory } from 'react-router-dom';

import usersService from 'services/usersService';
import { adaptUsersTableData } from 'helpers/adapter';

import User from './user/user';
import styles from './styles';
import toast from 'react-hot-toast';
import M from 'messages';

const UsersPage = () => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const history = useHistory();
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

  return (
    <div className={classes.content}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid m={2} spacing={2} container className={classes.itemsContent}>
            {usersData.data.map((user) => (
              <Grid className={classes.grid} key={user.id} item xs={12} sm={6} md={4} lg={3}>
                <User user={user} />
              </Grid>
            ))}
          </Grid>
        </main>
    </div>
  );
};

export default UsersPage;
