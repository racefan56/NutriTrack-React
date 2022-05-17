import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getUsers } from '../../features/user/userSlice';
import Table from '../layout/Table/Table';
import TableDataItem from '../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../Spinner/Spinner';
import ButtonMain from '../layout/Button/ButtonMain/ButtonMain';
import Error from '../Error/Error';

import classes from './UserResults.module.css';

const UserResults = (props) => {
  const dispatch = useDispatch();

  const { users, loading, isError, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getUsers());
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  const handleRefresh = () => {
    dispatch(getUsers());
  };

  if (loading) {
    return <Spinner />;
  }

  if (!loading && isError) {
    return <Error></Error>;
  } else {
    return (
      <>
        <Table
          headers={['Email', 'Role', 'Created', '']}
          heading='Users'
          refresh={handleRefresh}
          createPath='create'
        >
          {users.map((user, index) => (
            <React.Fragment key={user._id}>
              <TableDataItem
                navigatePath={`/control-panel/users/${user._id}`}
                dataPoints={[user.email, user.role, user.createdAt]}
              >
                <td>
                  <ButtonMain
                    className='m-0'
                    type='Link'
                    path={`${user._id}`}
                    text='View/Edit'
                  />
                </td>
              </TableDataItem>
            </React.Fragment>
          ))}
        </Table>
      </>
    );
  }
};

export default UserResults;
