import { IconButton, Paper } from '@mui/material';
import React, { memo } from 'react';
import StyledDataGrid from 'components/table/StyledDataGrid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 12, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 13, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 14, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 15, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 16, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 17, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
];

const paginationModel = { page: 0, pageSize: 10 };
function ListPageBook() {
  const handleEdit = (row) => {
    console.log('Chỉnh sửa:', row);
  };

  const handleDelete = (id) => {
    console.log('Xóa ID:', id);
  };
  return <StyledDataGrid rows={rows} columns={columns} paginationModel={paginationModel} />;
}

export default memo(ListPageBook);
