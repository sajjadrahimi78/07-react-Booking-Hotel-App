import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";

function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        {/* nested route */}
        <Route path="/hotles" element={<AppLayout />}>
          <Route index element={<div>Hotles</div>} />
          <Route path=":id" element={<div>single hotles</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
