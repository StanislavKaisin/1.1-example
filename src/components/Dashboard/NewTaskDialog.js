import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import useStore from "../../hooks/useStore";

const NewTaskDialog = ({ open, handleClose = () => {}, activeSection }) => {
  const [formState, setFormState] = useState({});

  const updateFormState = useCallback(
    (event) => {
      const { name, value } = event.target;
      setFormState((prevState) => ({
        ...prevState,
        [name]: value ? value.trim() : "",
      }));
    },
    [setFormState]
  );
  const { boards, users } = useStore();

  // console.log("users :>> ", users);
  const handleSubmit = (e) => {
    e.preventDefault();
    boards.active.addTask(activeSection, formState);
    handleClose();
    setFormState({});
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Creating a new task</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box p={1}>
              <TextField
                fullwidth
                required
                type="text"
                label="Title"
                onChange={updateFormState}
                name="title"
                value={formState?.title || ""}
              />
            </Box>

            <Box p={1}>
              <TextField
                fullwidth
                required
                type="text"
                label="Description"
                onChange={updateFormState}
                name="description"
                value={formState?.description || ""}
              />
            </Box>

            <Box p={1}>
              <FormControl>
                <InputLabel shrink>Assignee</InputLabel>
                <Select
                  value={formState?.assignee || ""}
                  name="assignee"
                  native
                  onChange={updateFormState}
                  required
                >
                  <option value="" disabled>
                    -
                  </option>
                  {users &&
                    users.users &&
                    users.users.length &&
                    users.users.map((user) => {
                      return (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      );
                    })}
                </Select>
                <DialogActions>
                  <Button onClick={handleClose} color="secondary">
                    Close
                  </Button>
                  <Button type="submit" color="primary">
                    Create
                  </Button>
                </DialogActions>
              </FormControl>
            </Box>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default NewTaskDialog;
