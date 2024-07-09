import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../context/BootmarkListContext";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

function Bookmark() {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmark();

  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteBookmark(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!bookmarks.length) return <p>There is no bookmarked location! Please choose a location.</p>;
  
  return (
    <div>
      <h2>Bookmark Page</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&long=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookmark?.id ? "current-bookmark" : ""
                }`}
              >
                <div>
                  <ReactCountryFlag countryCode={item.countryCode} svg />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>

                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
