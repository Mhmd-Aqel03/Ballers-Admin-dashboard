import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import courtService from "../services/courtsServices";

const CourtDataGrid = ({refresh, onDelete, onUpdate}) => {
  const [courts, setCourts] = useState([]);
  

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const data = await courtService.getAllCourts();

        setCourts(data.courts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourts();
  }, [refresh]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "city", headerName: "City", width: 200 },
    { field: "placeId", headerName: "Goolge Place ID", width: 250 },
    { field: "hasBathroom", headerName: "Bathroom?", width: 200 },
    // { field: "hasCafeteria", headerName: "Cafeteria?", width: 200 },
    // { field: "hasParking", headerName: "Parking?", width: 200 },
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

          <Button color="success" onClick={() => onUpdate(params.row)}>
            Update
          </Button>

        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={courts}
        columns={columns}
        disableRowSelectionOnClick // disables selection
        checkboxSelection={false} // explicitly disables checkboxes
      />
    </div>
  );
};

export default CourtDataGrid;