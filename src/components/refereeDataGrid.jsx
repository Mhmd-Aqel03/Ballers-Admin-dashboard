import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import refereeService from "../services/refereeService";

const RefreeDataGrid = ({refresh, onDelete}) => {
  const [referees, setReferees] = useState([]);
  

  useEffect(() => {
    const fetchReferees = async () => {
      try {
        const data = await refereeService.getAllReferees();

        setReferees(data.referees);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReferees();
  }, [refresh]);

  const columns = [
    { field: "username", headerName: "Username", width: 90 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button color="error" onClick={() => onDelete(params.row.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={referees}
        columns={columns}
        disableRowSelectionOnClick // disables selection
        checkboxSelection={false} // explicitly disables checkboxes
      />
    </div>
  );
};

export default RefreeDataGrid;