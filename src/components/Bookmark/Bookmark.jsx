import Map from "../Map/Map";


function Bookmark() {
  return (
    <div className="appLayout">
      <div className="sidebar">{/* <Outlet /> */}
        <div>bookmark list</div>
      </div>
      <div className="mapContainer">
        <Map markerLocations={[]}/>
      </div>
    </div>
  );
}

export default Bookmark;

// state => bookmarkList => global 