import { createContext, useContext, useState } from "react";
import useFeach from "../../hooks/useFeach";
import axios from "axios";
import toast from "react-hot-toast/headless";

const BookmarkContext = createContext();

const BASE_URL = "http://localhost:5000";

function BookmarkListProvider({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState(null);
  const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] =
    useState(false);

  const { isLoading, data: bookmarks } = useFeach(`${BASE_URL}/bookmarks`);

  async function getBookmark(id) {
    setIsLoadingCurrentBookmark(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrentBookmark(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrentBookmark(false);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        currentBookmark,
        bookmarks,
        getBookmark,
        isLoadingCurrentBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkListProvider;

export function useBookmark() {
  return useContext(BookmarkContext);
}
