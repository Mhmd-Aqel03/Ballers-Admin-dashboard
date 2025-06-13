import React from "react";
import CourtDataGrid from "../components/courtDataGrid";
import { Button } from "@mui/material";
import { useState } from "react";
import courtService from "../services/courtsServices";
import FormDialog from "../components/formDialog";

const CourtTable = ({ refresh, setRefresh }) => {
  const [open, setOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState({
    id: "",
    name: "",
    city: "",
    hasParking: false,
    hasBathroom: false,
    hasCafeteria: false,
  });

  const handleSubmit = async (data) => {
    console.log(data);
    if (data.id == null) {
      console.log(data);
      await courtService.createCourt(data);

      setRefresh(!refresh);
      setOpen(false);
    } else {
      await courtService.updateCourt(data, data.id);

      setRefresh(!refresh);
      setOpen(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await courtService.deleteCourt(id);

      setRefresh(!refresh);
    } catch (err) {
      console.error(err);
    }
  };

  const openEdit = (data) => {
    setSelectedCourt(data);
    setOpen(true);
  };
  return (
    <div className="mt-9 flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl">Courts</h1>
        <Button
          color="success"
          onClick={() => {
            setSelectedCourt({
              name: "",
              city: "",
              hasParking: false,
              hasBathroom: false,
              hasCafeteria: false,
            });
            setOpen(true);
          }}
        >
          Create
        </Button>
      </div>
      <CourtDataGrid
        refresh={refresh}
        onDelete={handleDelete}
        onUpdate={openEdit}
      />
      <FormDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        title="Create Court"
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "city", label: "City", type: "text" },
          { name: "placeId", label: "PlaceId", type: "text" },
          { name: "hasParking", label: "Has Parking", type: "checkbox" },
          { name: "hasBathroom", label: "Has Bathroom", type: "checkbox" },
          { name: "hasCafeteria", label: "Has Cafeteria", type: "checkbox" },
        ]}
        initialValues={selectedCourt}
      />
    </div>
  );
};

export default CourtTable;
