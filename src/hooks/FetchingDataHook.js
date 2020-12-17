/** @format */
import { useEffect, useState } from "react";

import axios from "../axios-instance";
import { useRecoilState } from "recoil";
import { ErrorState } from "../store/atons";

// Fetch data from Users API
export function useFetchingUsers() {
  const [users, setUsers] = useState([]);
  const [, setError] = useRecoilState(ErrorState);

  useEffect(() => {
    axios
      .get("/users")
      .then((response) => {
        if (response.data) {
          setUsers(response.data);
        } else {
          setError({
            message: "ON! We didn't found any data, Please try again",
            error: [],
          });
        }
      })

      .catch((error) => {
        setError({
          message: "ON! We didn't found any data, Please try again",
          error: error,
        });
      });
  }, [setError]);

  return { users };
}
