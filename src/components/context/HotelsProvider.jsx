import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFeach from "../../hooks/useFeach";

const HotelsContext = createContext();

function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options")).room;

  const { isLoading, data : hotels } = useFeach(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  return (
    <HotelsContext.Provider value={{ isLoading, hotels }}>
      {children}
    </HotelsContext.Provider>
  );
}

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelsContext);
}
