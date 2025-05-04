import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import sessionService from "../services/sessionService";
const SessionDataGrid = ({refresh, onDelete, onUpdate}) => {
  const [sessions, setSessions] = useState([]);
  

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await sessionService.getAllSessions();

        setSessions(data.sessions);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSessions();
  }, [refresh]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "type", headerName: "Type", width: 200 },
    { field: "matchDate", headerName: "Match Date", width: 200 },
    { field: "matchStartTime", headerName: "Match Start Time", width: 250 },
    { field: "matchEndTime", headerName: "Match End Time", width: 200 },
    { field: "maxPlayers", headerName: "Max Players", width: 200 },
    { field: "price", headerName: "Price", width: 200 },
    { field: "courtId", headerName: "Court Id", width: 200 },
    { field: "refreeId", headerName: "RefereeId", width: 200 },
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
        rows={sessions}
        columns={columns}
        disableRowSelectionOnClick // disables selection
        checkboxSelection={false} // explicitly disables checkboxes
      />
    </div>
  );
};

export default SessionDataGrid;