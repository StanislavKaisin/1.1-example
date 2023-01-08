import { CardContent, Typography } from "@mui/material";
import React from "react";
import User from "../common/User";

export const Task = ({ task }) => {
  return (
    <div>
      Task
      <CardContent>
        <Typography color="textPrimary" gutterBottom style={{ fontSize: 18 }}>
          {task?.title}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {task?.description}
        </Typography>
        {task.assignee && <User user={task.assignee} />}
      </CardContent>
    </div>
  );
};
