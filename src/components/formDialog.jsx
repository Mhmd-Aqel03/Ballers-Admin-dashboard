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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
        {fields.map((field) => {
          if (field.type === "checkbox") {
            return (
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
            );
          } else if (field.type === "select") {
            return (
              <FormControl fullWidth margin="dense" key={field.name}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  name={field.name}
                  value={formValues[field.name] || ""}
                  onChange={handleChange}
                  label={field.label}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          } else if (field.type === "file") {
            return (
              <div key={field.name}>
                <InputLabel>{field.label}</InputLabel>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFormValues((prev) => ({
                        ...prev,
                        [field.name]: file, // store the file object
                      }));
                    }
                  }}
                  style={{ marginTop: "8px", marginBottom: "16px" }}
                />
                {formValues[field.name] && (
                  <p>Selected: {formValues[field.name].name}</p>
                )}
              </div>
            );
          } else {
            return (
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
            );
          }
        })}
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
