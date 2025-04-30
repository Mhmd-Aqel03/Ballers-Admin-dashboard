import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const FormDialog = ({
  open,
  onClose,
  onSubmit,
  title,
  fields,
  initialValues,
}) => {
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    setFormValues(initialValues || {});
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formValues);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {fields.map((field) =>
          field.type === "checkbox" ? (
            <FormControlLabel
              key={field.name}
              control={
                <Checkbox
                  name={field.name}
                  checked={formValues[field.name] || false}
                  onChange={handleChange}
                />
              }
              label={field.label}
            />
          ) : (
            <TextField
              key={field.name}
              margin="dense"
              name={field.name}
              label={field.label}
              type={field.type}
              fullWidth
              value={formValues[field.name] || ""}
              onChange={handleChange}
            />
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
