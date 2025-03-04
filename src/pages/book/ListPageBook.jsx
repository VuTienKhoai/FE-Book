import { IconButton, Paper } from '@mui/material';
import React, { memo } from 'react';
import StyledDataGrid from 'components/table/StyledDataGrid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { use } from 'react';
import { useEffect } from 'react';
import { showToast } from 'components/notification/CustomToast';
import { formatPrice } from './../../utils/format/FormatPrice';
import { ListBook } from './services/book.api';
function ListPageBook() {
  const [books, setBooks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleListBook = () => {
    ListBook()
      .then((response) => {

        if (response.err === 0) {
          setBooks(response?.data?.rows);
        }
        else {
          showToast(response.message, 'error');
        }
      })
      .catch((error) => {
        console.error('Lỗi đăng ký:', error);
        showToast('Có lỗi xảy ra' + error, 'error');
      })
      .finally(() => {
      });

    const columns = [
      { field: 'id', headerName: 'ID' },
      {
        field: 'firstName',
        headerName: 'First name',
        flex: 1,
        textAlign: 'center'
      },
      { field: 'lastName', headerName: 'Last name', flex: 1, textAlign: 'center' },
      {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        flex: 1,
        textAlign: 'center'
      },
      {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        textAlign: 'center',
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`
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
  };

  const handleDelete = (id) => {
    console.log('Xóa ID:', id);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBook(null);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedBook((prev) => ({
          ...prev,
          img_src: JSON.stringify([e.target.result]), // Cập nhật ảnh mới
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center' },
    {
      field: 'name',
      headerName: 'Tên',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'price',
      headerName: 'Giá',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div >
          {formatPrice(params.value)}
        </div>
      ),
    },
    {
      field: 'description',
      headerName: 'Mô tả',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'author',
      headerName: 'Tác giả',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'publisher',
      headerName: 'Nhà xuất bản',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'qty',
      headerName: 'Số lượng',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: "img_src",
      headerName: "Ảnh",
      flex: 1,
      headerAlign: "center",
      align: "center",
      height: '200px',
      renderCell: (params) => {
        const firstImage = JSON.parse(params.value)?.[0]; // Lấy ảnh đầu tiên
        return firstImage ? (
          <img
            src={firstImage}
            alt="Ảnh sản phẩm"
            style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 5 }}
          />
        ) : null;
      },
    },
    {
      field: 'actions',
      headerName: 'Hành động',
      sortable: false,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: "5px", padding: "5px" }}>
          <IconButton color="primary" size="small" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" size="small" onClick={() => handleCloseModal(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    }
  ];
  return (
    <>
      <StyledDataGrid rows={books} columns={columns} paginationModel={{ page: 0, pageSize: 10 }} />

      {/* Modal chỉnh sửa sách */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2>Chỉnh sửa sách</h2>
          {selectedBook && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth label="Tên sách" variant="outlined" value={selectedBook.name} onChange={(e) => setSelectedBook(prev => ({ ...prev, name: e.target.value }))} sx={{ mb: 2 }} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Giá" variant="outlined" value={selectedBook.price} onChange={(e) => setSelectedBook(prev => ({ ...prev, price: e.target.value }))} sx={{ mb: 2 }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Mô tả" variant="outlined" value={selectedBook.description} onChange={(e) => setSelectedBook(prev => ({ ...prev, description: e.target.value }))} sx={{ mb: 2 }} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Tác giả" variant="outlined" value={selectedBook.author} onChange={(e) => setSelectedBook(prev => ({ ...prev, author: e.target.value }))} sx={{ mb: 2 }} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Nhà xuất bản" variant="outlined" value={selectedBook.publisher} onChange={(e) => setSelectedBook(prev => ({ ...prev, publisher: e.target.value }))} sx={{ mb: 2 }} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Số lượng" type="number" variant="outlined" value={selectedBook.qty} onChange={(e) => setSelectedBook(prev => ({ ...prev, qty: e.target.value }))} sx={{ mb: 2 }} />
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                  {selectedBook.img_src && (
                    <img
                      src={JSON.parse(selectedBook.img_src)?.[0]}
                      alt="Ảnh sách"
                      style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 5, marginBottom: 8 }}
                    />
                  )}
                  <Button variant="contained" component="label">
                    Chọn ảnh mới
                    <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="contained" color="primary">Lưu</Button>
                <Button variant="outlined" onClick={handleCloseModal}>Hủy</Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Modal>

    </>
  );
};



export default memo(ListPageBook);
