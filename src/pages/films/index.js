import React, { useState, useEffect } from "react";
import MovieList from "./movieList";
import { SingleMove } from "./singleMovie";
export default function Index() {

  const [url, setUrl] = useState("http://127.0.0.1:8000/api/movies");
  const changeUrl = async (newUrl) => {
    console.log("new url", newUrl);
    await setUrl(newUrl);
  }
  let passingUrl;
  passingUrl = url;
  console.log("passign url:", passingUrl);
  return (

    <MovieList url={passingUrl}></MovieList>

  )

}
