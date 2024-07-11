import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useFeach(url, query = "") {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function feachData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}?${query}`);
        setData(data);
      } catch (err) {
        setData([]);
        toast.error(err?.message);
      } finally {
        setIsLoading(false);
      }
    }

    feachData();
  }, [url, query]);

  return { data, isLoading };
}
