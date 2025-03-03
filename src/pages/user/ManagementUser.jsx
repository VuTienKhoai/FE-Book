import { Grid, IconButton, Paper } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';
import StyledDataGrid from 'components/table/StyledDataGrid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GetAllUser } from './services/User.api';
import { showToast } from 'components/notification/CustomToast';
import Loading from 'components/loading/Loading';
const columns = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'name',
    headerName: 'Họ và tên',
    flex: 1,
    textAlign: 'center'
  },
  { field: 'email', headerName: 'Email', flex: 1, textAlign: 'center' },
  {
    field: 'phoneNumber',
    headerName: 'Số điện thoại',
    type: 'number',
    flex: 1,
    textAlign: 'center'
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    flex: 1,
    textAlign: 'center'
  },
  {
    field: 'actions',
    headerName: 'Hành động',
    sortable: false,
    flex: 1,
    textAlign: 'center',
    renderCell: (params) => (
      <>
        {/* <Tooltip title="Chỉnh sửa"> */}
        <IconButton color="primary" size="small" onClick={() => handleEdit(params.row)}>
          <EditIcon />
        </IconButton>
        {/* </Tooltip> */}
        {/* <Tooltip title="Xóa"> */}
        <IconButton color="error" size="small" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
        {/* </Tooltip> */}
      </>
    )
  }
];

export default function ManagementUser() {
  const [stateListUser, setStateListUser] = useState({
    page: 1,
    pageSize: 10,
    count: 0,
    listUser: []
  });
  const paginationModel = { page: 0, pageSize: 10 };

  const [loading, setLoading] = useState(false);

  const handleGetListUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await GetAllUser();

      if (response?.err === 0) {
        setStateListUser((prev) => ({
          ...prev,
          listUser: response?.data?.rows,
          total: response?.data?.count
        }));
        showToast(response?.mess, 'success');
      } else {
        showToast(response?.mess, 'warning');
      }
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      showToast('Có lỗi xảy ra: ' + error, 'error');
    } finally {
      setLoading(false); // Dừng trạng thái loading
    }
  }, []);

  useEffect(() => {
    handleGetListUser();
  }, []);
  const handleEdit = (row) => {
    console.log('Chỉnh sửa:', row);
  };

  const handleDelete = (id) => {
    console.log('Xóa ID:', id);
  };
  if (loading) {
    return (
      <Grid container minHeight="50vh" justifyContent="center" alignItems="center">
        <Loading />
      </Grid>
    );
  }
  return <StyledDataGrid rows={stateListUser.listUser} columns={columns} paginationModel={paginationModel} />;
}
