import { Avatar, Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";

const User = ({ user }) => {
  return (
    <Box display="flex" alignItems="center">
      <Avatar src={user.avatar} alt={user.name} />
      <Typography sx={{ p: "5px" }}>{user.name}</Typography>
    </Box>
  );
};

export default User;
