import { Card } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "./Task";

const getItemStyle = (draggableStyle) => {
  return {
    padding: 8,
    marginBottom: 8,
    ...draggableStyle,
  };
};

const Column = ({ section }) => {
  // console.log("section :>> ", section.toJSON());
  return (
    <div>
      {section?.tasks?.map((task, index) => {
        return (
          <Draggable draggableId={task.id} key={task.id} index={index}>
            {(provided, snapshot) => (
              <Card
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.dragHandleProps.style
                )}
              >
                <Task task={task} />
              </Card>
            )}
          </Draggable>
        );
      })}
      {/*  */}
    </div>
  );
};

export default observer(Column);
