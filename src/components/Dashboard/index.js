import { Grid, Box, Paper, Typography, Button } from "@mui/material";

import { observer } from "mobx-react-lite";
import React, { useCallback, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import useStore from "../../hooks/useStore";
import Column from "./Column";
import NewTaskDialog from "./NewTaskDialog";

function getLisStyle(isDraggingOver) {
  return {
    backgroundColor: isDraggingOver ? "lightblue" : "lightgray",
    padding: 8,
    minHeight: 500,
  };
}

const Dashboard = () => {
  const { boards, users } = useStore();
  const [newTaskToSection, setNewTaskToSection] = useState();
  const onDragEnd = useCallback(
    (event) => {
      const { source, destination, draggableId: taskId } = event;
      boards.active.moveTask(taskId, source, destination);
    },
    ["boards"]
  );
  // console.log("boards Dashboard:>> ", boards.toJSON());
  // console.log("users Dashboard:>> ", users.toJSON());
  // const handleClose = useCallback(() => {
  //   setNewTaskToSection(null);
  // }, [setNewTaskToSection]);
  const handleClose = () => {
    setNewTaskToSection(null);
  };

  // console.log("newTaskToSection :>> ", newTaskToSection);

  return (
    <Box p={2}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          {boards?.active &&
            boards?.active?.sections.map((section) => {
              return (
                <Grid item key={section.id} xs>
                  <Paper>
                    <Box
                      p={1}
                      display="flex"
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography variant="h5">{section.title}</Typography>
                      <Button
                        sx={{ ml: "8px" }}
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          setNewTaskToSection(section.id);
                        }}
                      >
                        Create a task
                      </Button>
                    </Box>
                    <Droppable droppableId={section.id}>
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={getLisStyle(snapshot.isDraggingOver)}
                        >
                          <Column section={section} />
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </Paper>
                </Grid>
              );
            })}
        </Grid>
      </DragDropContext>
      <NewTaskDialog
        open={!!newTaskToSection}
        handleClose={handleClose}
        activeSection={newTaskToSection}
      />
    </Box>
  );
};

export default observer(Dashboard);
