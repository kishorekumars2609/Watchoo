import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Modal from "./Modal";



const Movie = ({ item }) => {
  const [yt, setYT] = useState(null);
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const SEARCH_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=`;

  // async function fetchYoutubeLink(title) {
  //   const response = await fetch(
  //     SEARCH_URL +
  //       encodeURIComponent(title) +
  //       "&key=" +
  //       "AIzaSyBTMO9WtW6YrgMukCrTDKLx2awGthbRc1c"
  //   );
  //   const json = await response.json();
  //   const video = json.items.find((item) => item.id.kind === "youtube#video");
  //   if (!video) {
  //     throw new Error("No video found with the given title.");
  //   }
  //   setYT(`https://www.youtube.com/embed/${video.id.videoId}`);
  // }

  



  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id ,
          title: item.title,
          img: item.backdrop_path,
        }),
       
      });
    } else {
      alert("please log in to save a movie");
    }
  };
console.log(yt)
  return (
    <div   className="h-[180px]  w-[200px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img 
       
        className="w-80%  rounded h-full block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />   
      <div className="absolute top-0 left-0 flex flex-col w-full h-[172px] hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
      
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {item?.title}
        </p>
        <div className="w-full absolute  right-2 py-2 flex justify-center">

        <Modal  movie_id={item.id}  movie_link={yt}
        //  onClick={fetchYoutubeLink(item.title)}
         />
       </div>
        <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
   
    </div>
  );
};

export default Movie;
