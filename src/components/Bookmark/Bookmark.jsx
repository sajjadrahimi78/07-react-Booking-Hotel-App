import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../context/BootmarkListContext";
import { Link } from "react-router-dom";

function Bookmark() {
  const { isLoading, bookmarks } = useBookmark();

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <h2>Bookmarll Page</h2>
        <div className="bookmarkList">
          {bookmarks.map((item) => {
            return (
              <Link key={item.id}
                to={`${item.id}?lat=${item.latitude}&long=${item.longitude}`}
              >
                <div className="bookmarkItem">
                  <ReactCountryFlag countryCode={item.countryCode} svg />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
              </Link>
            );
          })}
        </div>
    </div>
  );
}

export default Bookmark;
