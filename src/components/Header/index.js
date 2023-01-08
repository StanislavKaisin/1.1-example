import {
  AppBar,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import User from "../common/User";

function Header() {
  const { boards, users } = useStore();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Box display="flex" alignItems="center">
              <Typography variant="h6">Dashboard:</Typography>
              {boards.boards.length && (
                <FormControl>
                  <Select
                    sx={{ backgroundColor: "#fff", ml: "10px" }}
                    value={boards.active?.id || ""}
                    onChange={(event) => {
                      const { value } = event.target;
                      boards.selectBoard(value);
                    }}
                  >
                    <MenuItem value="" disabled>
                      -
                    </MenuItem>
                    {boards.boards.map((board) => {
                      return (
                        <MenuItem key={board.id} value={board.id}>
                          {board.title}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}
            </Box>
          </Grid>
          <Grid item>{users.me && <User user={users.me} />}</Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default observer(Header);
