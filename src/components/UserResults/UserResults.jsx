import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getUsers } from '../../features/user/userSlice';
import Table from '../layout/Table/Table';
import TableDataItem from '../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../Spinner/Spinner';
import ButtonMain from '../layout/Button/ButtonMain/ButtonMain';
import Error from '../Error/Error';

const UserResults = () => {
  const dispatch = useDispatch();

  const { users, loading, isError, message } = useSelector(
    (state) => state.user
  );
  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState('+userName');
  const [formData, setFormData] = useState({
    role: '',
  });
  const { role } = formData;

  // Run only once
  useEffect(() => {
    dispatch(getUsers(`limit=${limit}&sort=${sort}&isActive=true`));
    if (isError) {
      toast.error(message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset filter options to defaults, and resend disptach
  const handleReset = () => {
    if (formData.role !== '') {
      setFormData({
        role: '',
      });
      dispatch(getUsers(`isActive=true&limit=${limit}&sort=${sort}`));
    }
  };

  // Create filter string
  const handleFilterString = () => {
    let string = `&isActive=true`;

    if (role !== '') {
      string = `${string + `&role=${role}`}`;
    }
    return string;
  };

  const handleChange = (e) => {
    const key = e.target.id;
    setFormData((prevState) => ({ ...prevState, [key]: e.target.value }));
  };

  const filterOptions = {
    role: [
      { value: '', label: 'All' },
      { value: 'admin', label: 'Admin' },
      { value: 'nca', label: 'NCA' },
      { value: 'lead-nca', label: 'Lead-NCA' },
      { value: 'dietitian', label: 'Dietitian' },
      { value: 'nurse', label: 'Nurse' },
    ],
  };

  const sortOptions = [
    { value: '+userName', label: 'Username A-Z' },
    { value: '-userName', label: 'Username Z-A' },
  ];

  if (loading) {
    return <Spinner />;
  }

  if (!loading && isError) {
    return <Error></Error>;
  } else {
    return (
      <>
        <Table
          headers={['User', 'Email', 'Role', '']}
          heading='Users'
          refresh
          refreshDispatch={getUsers}
          createPath='create'
          createAllowedRoles={['admin']}
          filterOptions={filterOptions}
          filterValues={[role]}
          filterOnChange={handleChange}
          filterReset={handleReset}
          filterString={handleFilterString}
          limit
          limitValue={limit}
          limitSetLimit={setLimit}
          paginate
          paginateCurPage={curPage}
          paginateSetPage={setCurPage}
          sort
          sortInitialVal='+lastName'
          sortValue={sort}
          sortSetSort={setSort}
          sortOptions={sortOptions}
        >
          {users?.map((user) => (
            <React.Fragment key={user._id}>
              <TableDataItem
                navigatePath={`/control-panel/users/${user._id}`}
                dataPoints={[user.userName, user.email, user.role]}
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
