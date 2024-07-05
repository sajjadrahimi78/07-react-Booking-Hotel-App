import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookmark } from "../context/BootmarkListContext";

function BookmarkLayout() {
  const { bookmarks } = useBookmark();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <div className="mapContainer">
        <Map markerLocations={bookmarks} />
      </div>
    </div>
  );
}

export default BookmarkLayout;

// state => bookmarkList => global
