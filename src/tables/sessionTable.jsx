import React from "react";
import SessionDataGrid from "../components/sessionDataGrid";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import FormDialog from "../components/formDialog";
import sessionService from "../services/sessionService";
import refereeService from "../services/refereeService";
import courtsServices from "../services/courtsServices";

const SessionTable = ({ refresh, setRefresh }) => {
  const [open, setOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState({
    id: "",
    type: "",
    matchDate: "",
    matchStartTime: "",
    matchEndTime: "",
    maxPlayers: 0,
    price: 0,
    playerCount: 0,
    courtId: "",
    refereeId: "",
  });
  const [courtIds, setCourtIds] = useState([]);
  const [refereeIds, setRefereeIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courtsData = await courtsServices.getAllCourts();
        const refereeData = await refereeService.getAllReferees();

        const courtIdsList = courtsData.courts;
        const refereeIdsList = refereeData.referees;

        setCourtIds(courtIdsList);
        setRefereeIds(refereeIdsList);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [refresh]);

  const handleSubmit = async (data) => {
    console.log(data);
    if (data.id == null) {
      console.log(data);
      await sessionService.createSession(data);

      setRefresh(!refresh);
      setOpen(false);
    } else {
      await sessionService.updateSession(data, data.id);

      setRefresh(!refresh);
      setOpen(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await sessionService.deleteSession(id);

      setRefresh(!refresh);
    } catch (err) {
      console.error(err);
    }
  };

  const openEdit = (data) => {
    console.log(data)
    setSelectedSession(data);
    setOpen(true);
  };

  return (
    <div className="mt-9 flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl">Sessions</h1>
        <Button
          color="success"
          onClick={() => {
            setSelectedSession({
              type: "",
              matchDate: "",
              matchStartTime: "",
              matchEndTime: "",
              maxPlayers: 0,
              price: 0,
              playerCount: 0,
              courtId: "",
              refereeId: "",
            });
            setOpen(true);
          }}
        >
          Create
        </Button>
      </div>
      <SessionDataGrid
        refresh={refresh}
        onDelete={handleDelete}
        onUpdate={openEdit}
      />
      <FormDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        title="Create Session"
        fields={[
          {
            name: "type",
            label: "Session Type",
            type: "select",
            options: [
              { label: "Teams", value: "Teams" },
              { label: "Random", value: "Random" },
            ],
          },
          { name: "matchDate", label: "Match Date", type: "text" },
          { name: "matchStartTime", label: "Start Time", type: "text" },
          { name: "matchEndTime", label: "End Time", type: "text" },
          { name: "maxPlayers", label: "Max Players", type: "text" },
          { name: "price", label: "Price", type: "text" },
          {
            name: "courtId",
            label: "Court ID",
            type: "select",
            options: courtIds.map((court) => ({
              label: court.name,
              value: court.id,
            })),
          },
          {
            name: "refereeId",
            label: "Referee ID",
            type: "select",
            options: refereeIds.map((ref) => ({
              label: ref.username,
              value: ref.id,
            })),
          },
        ]}
        initialValues={selectedSession}
      />
    </div>
  );
};

export default SessionTable;
