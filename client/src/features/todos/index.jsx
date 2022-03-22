import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';

import { useModal } from 'hooks/common';
import M from 'messages';
import SelectButton from 'components/button/SelectButton';
import CustomButton from 'components/button/CustomButton';
import CustomDialog from 'components/dialog';
import CustomForm from 'components/form';
import CustomTable from 'components/customTable';
import CustomTableToolbar from './toolbar';
import { dateFormat, getMessage } from 'helpers/helper';
import { adaptTodoTableData } from 'helpers/adapter';

import PageTitle from './PageTitle';
import { fetchTodoList, updateFilterStatus, createTodo, setParams, deleteTodo, updateTodo } from './todosSlice';
import { validationSchema } from './validation';
import { options, addTodoOptions, tableOptions } from './config/config.js';
import styles from './styles';
import CircularIndeterminate from 'components/loading/Loading';
import { askForPermissionToReceiveNotifications } from '../../firebase/pushNotification';
import { subscribeUser } from '../../firebase/subscription';
import NotificationButton from './NotificationButton';

const TodoList = () => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [mode, setMode] = useState({
    isEdit: false,
    currentTodo: {}
  });
  const [open, handleOpen, handleClose] = useModal(false);
  const todoState = useSelector((state) => state.todoState);
  const { todoList, count, status, error, filterStatus, params: filteredParams } = todoState;

  const { searchFields } = tableOptions.todo;

  const setFilteredParams = useCallback((newParams) => {
    dispatch(setParams(newParams));
  }, [dispatch])

  const fetchData = useCallback((params) => {
    dispatch(fetchTodoList(params));
  }, [dispatch]);

  useEffect(() => {
    if (status === 'waiting') {
      fetchData(filteredParams);
    }
  }, [filteredParams, status, fetchData, filterStatus]);

  const clearModeAndCloseModal = () => {
    setMode({isEdit: false, currentTodo: {}});
    handleClose();
  }

  // SW background sync add task request
  const registerBackgroundSync = async () => {
    const registration = await navigator.serviceWorker.ready;
    await registration.sync.register('addTask');
  }

  const storeTask = async (task) => {
    dispatch(createTodo(task));
    await registerBackgroundSync();
  }

  const requestAddTask = async (task) => {
    dispatch(createTodo(task));
  }

  const backgroundSyncOrRequest = async (task) => {
    const serviceWorkerExists = navigator.serviceWorker;
    if (serviceWorkerExists) {
      return storeTask(task);
    }
    return requestAddTask(task);
  }

  const formik = useFormik({
    initialValues: { name: '', expireDate: '' },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, {resetForm}) => {
      try {
        clearModeAndCloseModal();
        if (mode.isEdit) {
          dispatch(updateTodo({...mode.currentTodo, name: values.name, expireDate: values.expireDate || null}));
          return;
        }
        await backgroundSyncOrRequest({name: values.name, expireDate: values.expireDate || null});
        resetForm();
      } catch (err) {
        toast.error(getMessage(err?.response?.data, 'error'));
      }
    },
  });

  let content;
  // TODO: separate to handle errors and loadings (need to create ErrorBounder, LoadingComponent)
  if (status === 'loading') {
    content = <CircularIndeterminate />;
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  const updateFilter = useCallback(
    (e) => {
      const { value } = e.target;
      dispatch(updateFilterStatus(value));
  }, [dispatch]);

  const memoDialogContent = useMemo(() => {
    return (
      (
        <Box className={classes.todo__modal}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
              <CustomForm inputs={addTodoOptions.inputs} formik={formik} />
            </Grid>
          </form>
        </Box>
      )
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values]);

  const memoizedOptions = useMemo(() => {
    return options.todoStatuses;
  }, []);

  const memoHandleClose = useCallback(() => {
    handleClose();
    formik.resetForm();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleClose]);

  const handleEdit = useCallback(
    (todo) => {
      const itemValues = { name: todo.name, expireDate: todo.expireDateOrg ? dateFormat(new Date(todo.expireDateOrg), "YYYY-MM-DDTHH:mm") : '' };
      formik.setValues(itemValues);
      handleOpen();
      setMode({isEdit: true, currentTodo: todo});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleOpen]
  );

  // Updated todo status
  const handleCheck = useCallback((todo) => {
    const updatedStatus = todo.status === 'inprogress' ? 'completed' : 'inprogress';
    dispatch(updateTodo({ id: todo.id, status: updatedStatus }));
  }, [dispatch]);

  // Delete todo
  const handleDelete = useCallback((todo) => {
    dispatch(deleteTodo(todo.id));
  }, [dispatch]);

  const memoTableSource = useMemo(() => {
    return {data: adaptTodoTableData(todoList), count};
  }, [todoList, count]);

  const memoTableOptions = useMemo(() => {
    return tableOptions.todo;
  }, []);

  const onSearchCallback = useCallback((value) => {
    let oldValue = filteredParams.params?.search?.value;
    if (oldValue === undefined) {
      oldValue = '';
    }
    if (searchFields && (oldValue !== value)) {
      const newFilter = {params: { ...filteredParams.params, search: { value, fields: searchFields }, skip: 0 }};
      if (!value) {
        delete newFilter.params.search;
      }
      dispatch(setParams(newFilter));
    }
  }, [dispatch, searchFields, filteredParams]);

  const toolbarView = useMemo(() => (
    <CustomTableToolbar
      onSearchCallback={onSearchCallback}
      filteredParams={filteredParams}
    />
  ), [onSearchCallback, filteredParams]);


  return (
    <Grid className={classes.root} container spacing={3} direction="row">
      <Grid item xs={8}>
        <NotificationButton handleClick={askForPermissionToReceiveNotifications} text="Ask push permission"/>
        <NotificationButton handleClick={subscribeUser} text="Subscribe"/>
        <div className={classes.root__container}>
            <div className={classes.stickyHeader}>
              <PageTitle>{M.get('todo.title')}</PageTitle>
                <div className={classes.root__actionContent}>
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <CustomButton text={M.get('todo.addTodo')} onClick={handleOpen} variant="contained" />
                      <CustomDialog handleSubmit={formik.handleSubmit} open={open} handleClose={memoHandleClose} title={M.get('todo.modal.title')} description={M.get('todo.modal.description')}>
                        {memoDialogContent}
                      </CustomDialog>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <SelectButton title={options.selectTitle} options={memoizedOptions} value={filterStatus} setValue={updateFilter} />
                    </Grid>
                  </Grid>

                </div>

            </div>
          <Grid item xs={12}>
            <Box mt={3} className={classes.tableRoot}>
              <div className={classes.tabsContainer}>
                <CustomTable
                  tableSources={memoTableSource}
                  tableOptions={memoTableOptions}
                  loading={status === 'loading'}
                  filteredParams={filteredParams}
                  setFilteredParams={setFilteredParams}
                  handleEditAction={handleEdit}
                  handleDeleteAction={handleDelete}
                  handleRowClick={handleCheck}
                  toolbarView={toolbarView}
                />
              </div>
            </Box>
          </Grid>
      </div>
      </Grid>
    </Grid>
  );
};

export default TodoList;
