import { useParams } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";
import { useEffect } from "react";

function SingleHotel() {
  const { id } = useParams();
  const { getHotel, isLoadingCurrentHotel, currentHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrentHotel) return <div>Loading ...</div>;

  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel?.name}</h2>
        <div>
          {currentHotel?.number_of_reviews} reviews &bull; {currentHotel?.smart_location}
        </div>
        <div className="locationItem-img">
        <img src={currentHotel?.thumbnail_url} alt={currentHotel?.name} />
        </div>
      </div>
    </div>
  );
}

export default SingleHotel;
