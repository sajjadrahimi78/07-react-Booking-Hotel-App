import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFeach from "../../hooks/useFeach";
import axios from "axios";
import toast from "react-hot-toast/headless";

const HotelsContext = createContext();

const BASE_URL = "http://localhost:5000/hotels";

function HotelsProvider({ children }) {
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;

  const { isLoading, data: hotels } = useFeach(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  async function getHotel(id) {
    setIsLoadingCurrentHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrentHotel(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrentHotel(false);
    }
  }

  return (
    <HotelsContext.Provider
      value={{
        isLoading,
        currentHotel,
        hotels,
        getHotel,
        isLoadingCurrentHotel,
      }}
    >
      {children}
    </HotelsContext.Provider>
  );
}

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelsContext);
}
