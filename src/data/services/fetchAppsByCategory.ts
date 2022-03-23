import React, { useEffect, useState } from "react";
import { IError } from "../interfaces/fetch.interface";
import { BASE_API_PATH } from "../constants";
import { IApp } from "../interfaces/app.interface";

const FetchAppsByCategory = (category: string): [IApp[], boolean, IError] => {
  const [data, setData] = useState<IApp[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<IError>({
    error: false,
    message: "",
  });

  useEffect(() => {
    fetch(`${BASE_API_PATH}?categories_like=${category}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(true);
          setTimeout(() => {
            setData(result);
            setIsLoading(false);
          }, 500);
        },
        (error) => {
          setIsLoading(false);
          setHasError({
            error: true,
            message: `An Error has occured, please try again later ${error}`,
          });
        }
      );
  }, [category]);

  return [data, isLoading, hasError];
};

export default FetchAppsByCategory;
