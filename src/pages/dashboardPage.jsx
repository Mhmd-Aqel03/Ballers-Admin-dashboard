import {useState} from "react";
import { Button } from "@mui/material";
import CourtTable from "../tables/courtTable";
import RefereeTable from "../tables/refereeTable";
import SessionTable from "../tables/sessionTable";
import CourtImageTable from "../tables/courtImagesTable"

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      {/* Nav Bar */}
      <div className="flex flex-row justify-between sticky top-0 z-20 bg-white shadow-sm px-9 py-2">
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
      {/* Tables */}
      <div className="mx-[50px]">
        {/* Courts */}
        <CourtTable refresh={refresh} setRefresh={setRefresh}/>

        {/* Court Images */}
        <CourtImageTable refresh={refresh} setRefresh={setRefresh}/>
        {/* Referees */}
        <RefereeTable refresh={refresh} setRefresh={setRefresh} />

        {/* Sessions */}
        <SessionTable refresh={refresh} setRefresh={setRefresh} />
      </div>
    </div>
  );
};

export default Dashboard;
