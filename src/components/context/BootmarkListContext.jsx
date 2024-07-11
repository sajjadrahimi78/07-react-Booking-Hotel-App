import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import toast from "react-hot-toast/headless";

const BookmarkContext = createContext();

const BASE_URL = "http://localhost:5000";

const intialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: null,
  error: null,
};

// در اینحا باید توابع ما به صورت پیور باشه ولی در این پروژه توابع ما چون حداقل دیتا رو فچ میکنه پس ساید افکت داره و نمیشه اینجا استفاده کرد
function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "bookmarks/loaded":
      return { ...state, bookmarks: action.payload, isLoading: false };
    case "bookmark/loaded":
      return { ...state, isLoading: false, currentBookmark: action.payload };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
        currentBookmark: null,
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action");
  }
}

// we have a async action => 1.pending 2.success 3.rejected

function BookmarkListProvider({ children }) {
  // const [currentBookmark, setCurrentBookmark] = useState(null);
  // const [bookmarks, setBookmarks] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    intialState
  );

  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error.message);
        dispatch({
          type: "rejected",
          payload: "an error occurred in loading bookmarks",
        });
      }
    }

    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    if (+id === currentBookmark?.id) return;

    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: "an error occurred in fetching single bookmark",
      });
    }
  }

  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
      // setBookmarks((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        currentBookmark,
        bookmarks,
        getBookmark,
        createBookmark,
        deleteBookmark,
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

// context + reducer => value ={{state , dispatch}} => SYNC ACTION => (no sync action)

// ACYNC ACTION => reducer function is a PURE function!!
