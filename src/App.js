import { observer } from "mobx-react-lite";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import useStore from "./hooks/useStore";

function App() {
  const { users, boards } = useStore();
  // console.log({ users });
  // console.log("users :>> ", users.toJSON());
  // console.log("boards :>> ", boards.toJSON());
  // console.log("boards.active :>> ", boards.active?.toJSON());
  // console.log(
  //   "boards.active :>> ",
  //   boards.active?.sections[0]?.tasks?.toJSON()
  // );

  return (
    <>
      <Header />
      <main>
        <Dashboard />
      </main>
    </>
  );
}

export default observer(App);
