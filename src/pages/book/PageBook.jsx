import React from 'react';
import ListPageBook from './ListPageBook';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
export default function PageBook() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Quản lý sách</h2>
        <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "10px", marginBottom: "10px" }}>

          <Button
            component={Link}
            to="/add-book"
            size="small"
            type="submit"
            variant="contained"
            color="primary"
            style={{
              height: "36px",
              marginTop: '20px',  // Giữ chiều cao ổn định
              display: "flex", gap: '5px'
            }}
          >
            <AddIcon style={{ width: '16px' }} />
            <p>Thêm mới</p>
          </Button>
        </div>

      </div>
      {/* <div style={{ marginTop: "-20px" }}> */}
      <ListPageBook />

      {/* </div> */}
    </div>
  );
}
