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
import Bookmark from "./components/Bookmark/Bookmark";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import Login from "./components/Login/Login";
import AuthProvider from "./components/context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <div>
      <AuthProvider>
        <BootmarkListProvider>
          <HotelsProvider>
            <Toaster />
            <Header />
            <Routes>
              <Route path="/" element={<LocationList />} />
              <Route path="/login" element={<Login />} />
              {/* nested route */}
              <Route path="/hotels" element={<AppLayout />}>
                <Route index element={<Hotels />} />
                <Route path=":id" element={<SingleHotel />} />
              </Route>
              <Route
                path="/bookmark"
                element={
                  <ProtectedRoute>
                    <BookmarkLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Bookmark />} />
                <Route path=":id" element={<SingleBookmark />} />
                <Route path="add" element={<AddNewBookmark />} />
              </Route>
            </Routes>
          </HotelsProvider>
        </BootmarkListProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

// list of bookmarks location + map
//  /bookmark
//  /bookmark/add
