import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { fetcher, tmdbAPI } from "../../config";
import MovieCard from "./MovieCard";
import useSWR from "swr";

// https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
const MovieList = ({ type = "now_playing" }) => {
  const { data } = useSWR(tmdbAPI.getMovieList(type), fetcher);

  const movies = data?.results || [];

  return (
    <div className='movie-list'>
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView='auto'>
        {movies.length > 0 &&
          movies.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default MovieList;
