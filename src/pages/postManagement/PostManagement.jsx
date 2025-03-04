import { Grid, IconButton } from '@mui/material';
import Loading from 'components/loading/Loading';
import { showToast } from 'components/notification/CustomToast';
import StyledDataGrid from 'components/table/StyledDataGrid';
import React, { useCallback, useEffect, useState } from 'react';
import { formatDate } from 'utils/format/FormatDate';
import { GetAllArticles } from './services/Post.api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  {
    field: 'title',
    headerName: 'Tiêu đề',
    flex: 1,
    renderCell: (params) => <span>{params.value.toUpperCase() || 'Không có'}</span> // In hoa tên
  },
  {
    field: 'content',
    headerName: 'Nội dung',
    flex: 1,
    renderCell: (params) => <span href={`mailto:${params.value}`}>{params.value || 'Không có'}</span> // Click gửi email
  },
  {
    field: 'type',
    headerName: 'Loại',
    flex: 1,
    renderCell: (params) => <span> {params.value == 'news' ? 'Tin tức' : 'Không có thể loại'}</span> // Thêm icon điện thoại
  },
  {
    field: 'img',
    headerName: 'Ảnh đại diện',
    flex: 1,
    renderCell: (params) => {
      {
        params?.value ? <img src={params?.value} /> : <span>Không có</span>;
      }
    } // In nghiêng địa chỉ
  },
  {
    field: 'createdAt',
    headerName: 'Ngày tạo',
    flex: 1,
    renderCell: (params) => {
      {
        params?.value ? <span>{formatDate(params.value)}</span> : <span>Không có</span>;
      }
    } // In nghiêng địa chỉ
  },
  {
    field: 'actions',
    headerName: 'Hành động',
    sortable: false,
    flex: 1,
    renderCell: (params) => (
      <>
        <IconButton color="primary" size="small" onClick={() => handleEdit(params.row)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" size="small" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      </>
    )
  }
];

export default function PostManagement() {
  const [stateListUser, setStateListUser] = useState({
    page: 1,
    pageSize: 10,
    count: 0,
    listUser: []
  });
  const paginationModel = { page: 0, pageSize: 10 };

  const [loading, setLoading] = useState(false);

  const handleGetArticles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await GetAllArticles();
      console.log('🚀 ~ handleGetArticles ~ response:', response);

      if (response?.err === 0) {
        setStateListUser((prev) => ({
          ...prev,
          listUser: response?.data?.rows,
          total: response?.data?.count
        }));
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
    handleGetArticles();
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
