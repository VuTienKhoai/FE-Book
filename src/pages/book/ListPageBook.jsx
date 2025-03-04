import { Box, Button, Grid, IconButton, Modal, Paper, TextField } from '@mui/material';
import React, { memo, useState } from 'react';
import StyledDataGrid from 'components/table/StyledDataGrid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { use } from 'react';
import { useEffect } from 'react';
import { showToast } from 'components/notification/CustomToast';
import { formatPrice } from './../../utils/format/FormatPrice';
import { ListBook } from './services/book.api';




// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   { id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   { id: 12, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   { id: 13, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   { id: 14, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   { id: 15, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   { id: 16, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   { id: 17, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
// ];

const paginationModel = { page: 0, pageSize: 10 };
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
        // showToast('Có lỗi xảy ra' + error, 'error');
      })
      .finally(() => {
      });
  };

  useEffect(() => {
    handleListBook();
  }, []); // Chỉ gọi 1 lần khi component mount
  const handleEdit = (book) => {
    setSelectedBook(book);
    setOpenModal(true);
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
                <TextField fullWidth label="Tên sách" variant="outlined" value={selectedBook.name} sx={{ mb: 2 }} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Giá" variant="outlined" value={selectedBook.price} sx={{ mb: 2 }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Mô tả" variant="outlined" value={selectedBook.description} sx={{ mb: 2 }} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Tác giả" variant="outlined" value={selectedBook.author} sx={{ mb: 2 }} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Nhà xuất bản" variant="outlined" value={selectedBook.publisher} sx={{ mb: 2 }} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Số lượng" type="number" variant="outlined" value={selectedBook.qty} sx={{ mb: 2 }} />
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
