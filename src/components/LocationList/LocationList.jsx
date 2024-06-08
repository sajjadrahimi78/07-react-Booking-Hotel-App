import useFeach from "../../hooks/useFeach";

function LocationList() {
  const { data, isLoading } = useFeach("http://localhost:5000/hotles", "");

  if (isLoading) <p>Loading...</p>;

  return (
    <div className="nearbyLocation">
      <h2>Nearby Location</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <div className="locationItem" key={item.id}>
              <div className="locationItem-img">
              <img src={item.thumbnail_url} alt={item.name}/>
              </div>
              <div className="locationItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  €&nbsp;{item.price}&nbsp;<span>night</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
