import { Link } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";

function Hotels() {
  const { isLoading, hotels, currentHotel } = useHotels();

  if (isLoading) <div>Loading...</div>;

  return (
    <div className="searchList">
      <h2>Search Results ({hotels.length})</h2>
      {hotels.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&long=${item.longitude}`}
          >
            <div
              className={`searchItem ${item.id === currentHotel?.id ? "current-hotel" : ""}`}
            >
              <img
                src={item.thumbnail_url}
                alt={item.name}
                style={{ border: "1px solid rgb(225, 225, 225)" }}
              />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  €&nbsp;{item.price}&nbsp;<span>night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;
//
