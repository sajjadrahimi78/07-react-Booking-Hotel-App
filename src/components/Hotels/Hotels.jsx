import { useSearchParams } from "react-router-dom";
import useFeach from "../../hooks/useFeach";

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options")).room;

  const { isLoading, data } = useFeach(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  console.log(data);

  if (isLoading) <div>Loading...</div>;

  return <div>{data.length}</div>;
}

export default Hotels;
//
