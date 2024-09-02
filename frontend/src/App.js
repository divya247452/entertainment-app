import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBox from "./components/Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";

function App() {
  return (
    <div className="md:grid grid-cols-12 gap-2 p-4 bg-custom-dark-blue text-white min-h-[100vh]">
      <Navbar className="col-span-1" />

      <main className="p-2 md:pt-0 bg-custom-dark-blue col-span-11">
        <Header/>
        <SearchBox />
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
