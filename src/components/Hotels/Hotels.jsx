import { Link, useSearchParams } from "react-router-dom";
import useFeach from "../../hooks/useFeach";

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options")).room;

  const { isLoading, data } = useFeach(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  if (isLoading) <div>Loading...</div>;

  return (
    <div className="searchList">
      <h2>Search Results ({data.length})</h2>
      {data.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&long=${item.longitude}`}
          >
            <div className="searchItem">
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
