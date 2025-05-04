import React from "react";
import RefreeDataGrid from "../components/refereeDataGrid";
import { Button } from "@mui/material";
import { useState } from "react";
import refereeService from "../services/refereeService";
import FormDialog from "../components/formDialog";

const RefereeTable = () => {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedReferee, setSelectedReferee] = useState({
    name:"",
    email:"",
    password:""
  });

  const handleSubmit = async (data) => {
    console.log(data);

    console.log(data);
    await refereeService.createReferee(data);

    setRefresh(!refresh);
    setOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await refereeService.deleteReferee(id);

      setRefresh(!refresh);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-9 flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl">Refrees</h1>
        <Button
          color="success"
          onClick={() => {
            setSelectedReferee({
              username: "",
              email:"",
              password:""
            });
            setOpen(true);
          }}
        >
          Create
        </Button>
      </div>
      <RefreeDataGrid
        refresh={refresh}
        onDelete={handleDelete}
      />
      <FormDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        title="Create Referee"
        fields={[
          { name: "username", label: "Username", type: "text" },
          { name: "email", label: "Email", type: "text" },
          { name: "password", label: "Password", type: "text" },
        ]}
        initialValues={selectedReferee}
      />
    </div>
  );
};

export default RefereeTable;
