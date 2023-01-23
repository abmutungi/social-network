import { useState, useEffect } from "react";

const UseIdFromUrl = () => {
  const [id, setId] = useState("");

  useEffect(() => {
    const currentId = window.location.pathname.split("/")[2];
    setId(currentId);
  }, []);

  return id;
};

export { UseIdFromUrl };
