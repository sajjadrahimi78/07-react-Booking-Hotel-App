import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../context/BootmarkListContext";
import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const { id } = useParams();
  const { getBookmark, isLoading, currentBookmark } =
    useBookmark();
  const navigate = useNavigate();

  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoading || !currentBookmark)
    return <div>Loading ...</div>;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="bookmarkList">
      <button onClick={handleBack} className="btn btn--back">
        {" "}
        &larr; Back
      </button>

      <div className="currentBookmark">
        <h2>{currentBookmark?.cityName}</h2>
        <div
          className={`bookmarkItem ${
            currentBookmark.id === currentBookmark?.id ? "current-bookmark" : ""
          }`}
        >
          <ReactCountryFlag countryCode={currentBookmark.countryCode} svg />
          &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
          <span>{currentBookmark.country}</span>
        </div>
      </div> 
    </div>
  );
}

export default SingleBookmark;
