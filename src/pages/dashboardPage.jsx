import React from "react";
import CourtDataGrid from "../components/courtDataGrid";
import { Button } from "@mui/material";
import CourtTable from "../tables/courtTable";

const Dashboard = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="mx-[50px]">
      {/* Header */}
      <div className="flex flex-row justify-between sticky top-2 ">
        <h1 className="text-4xl">Ballers</h1>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FF6A3C",
            "&:hover": { backgroundColor: "darkorange" },
          }}
          onClick={logout}
        >
          Logout
        </Button>
      </div>

      {/* Courts */}
      <CourtTable />
    </div>
  );
};

export default Dashboard;
