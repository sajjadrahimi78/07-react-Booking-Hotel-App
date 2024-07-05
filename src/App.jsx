import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import BootmarkListProvider from "./components/context/BootmarkListContext";

function App() {
  return (
    <div>
      <BootmarkListProvider>
        <HotelsProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            {/* nested route */}
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route path="/bookmark" element={<BookmarkLayout />}>
              <Route index element={<div>bootmark page</div>} />
              <Route path="add" element={<div>add new bootmark</div>} />
            </Route>
          </Routes>
        </HotelsProvider>
      </BootmarkListProvider>
    </div>
  );
}

export default App;

// list of bookmarks location + map
//  /bookmark
//  /bookmark/add
