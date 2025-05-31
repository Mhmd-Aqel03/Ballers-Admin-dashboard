import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import courtImagesService from "../services/courtImagesService";

const CourtImagesDataGrid = ({refresh, onDelete}) => {
  const [courtImages, setCourtImages] = useState([]);
  

  useEffect(() => {
    const fetchCourtImages = async () => {
      try {
        const data = await courtImagesService.getAllCourtImages();

        setCourtImages(data.courtImages);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourtImages();
  }, [refresh]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "courtId", headerName: "Court ID", width: 200 },
    { field: "photoUrl", headerName: "Photo URL", width: 200 },
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
        rows={courtImages}
        columns={columns}
        disableRowSelectionOnClick // disables selection
        checkboxSelection={false} // explicitly disables checkboxes
      />
    </div>
  );
};

export default CourtImagesDataGrid;