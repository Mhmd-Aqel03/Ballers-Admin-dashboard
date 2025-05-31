import React from "react";
import CourtImagesDataGrid from "../components/courtImageDataGrid";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import courtImagesService from "../services/courtImagesService";
import courtsServices from "../services/courtsServices";
import FormDialog from "../components/formDialog";

const CourtImageTable = () => {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedCourtImage, setSelectedCourtImage] = useState({
    photoUrl: "",
    courtId: "",
  });

  const [courtIds, setCourtIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courtsData = await courtsServices.getAllCourts();

        const courtIdsList = courtsData.courts;

        setCourtIds(courtIdsList);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [refresh]);

  const handleSubmit = async (data) => {
    console.log(data);

    console.log(data);
    await courtImagesService.createCourtImage(data);

    setRefresh(!refresh);
    setOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await courtImagesService.deleteCourtImage(id);

      setRefresh(!refresh);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-9 flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl">Court Images</h1>
        <Button
          color="success"
          onClick={() => {
            setSelectedCourtImage({
              photoUrl: "",
              courtId: "",
            });
            setOpen(true);
          }}
        >
          Create
        </Button>
      </div>
      <CourtImagesDataGrid refresh={refresh} onDelete={handleDelete} />
      <FormDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        title="Create Court Image"
        fields={[
          { name: "photo", label: "Photo", type: "file" },
          {
            name: "courtId",
            label: "Court ID",
            type: "select",
            options: courtIds.map((court) => ({
              label: court.name,
              value: court.id,
            })),
          },
        ]}
        initialValues={selectedCourtImage}
      />
    </div>
  );
};

export default CourtImageTable;
