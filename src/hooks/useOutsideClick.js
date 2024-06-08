import { useEffect } from "react";

function useOutsideClick(ref, cb, exceptionId) {
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    function handleOutsideClick(e) {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        e.target.id !== exceptionId
      ) {
        console.log(exceptionId);
        cb();
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);
}

export default useOutsideClick;
