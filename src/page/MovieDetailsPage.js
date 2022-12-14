/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { apiKey, fetcher, tmdbAPI } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className='py-10'>
      <div className='w-full h-[600px] relative'>
        <div className='absolute insPet-0 bg-black bg-opacity-70'></div>
        <div
          className='w-full h-full bg-cover bg-no-repeat'
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}></div>
      </div>
      <div className='w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10'>
        <img
          src={tmdbAPI.imageOriginal(poster_path)}
          alt=''
          className='w-full h-full object-cover rounded-xl'
        />
      </div>
      <h1 className='text-center text-4xl font-bold text-white mb-10'>{title}</h1>
      {genres.length > 0 && (
        <div className='flex items-center gap-x-5 mb-10 justify-center'>
          {genres.map((item) => (
            <span className='py-2 px-4 border-primary text-primary border rounded' key={item.id}>
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className='text-center leading-relaxed max-w-[600px] mx-auto mb-10'>{overview}</p>
      <MovieCredits></MovieCredits>
      <MovieVideo></MovieVideo>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};

const MovieCredits = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <>
      <h2 className='text-center text-3xl mb-10'>Casts</h2>
      <div className='grid grid-cols-4 gap-5'>
        {cast.slice(0, 4).map((item) => (
          <div className='cast-item'>
            <img
              src={tmdbAPI.imageOriginal(item.profile_path)}
              alt=''
              className='w-full h-[350px] object-cover rounded-lg mb-3'
            />
            <h3 className='text-xl font-medium'>{item.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

const MovieVideo = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className='py-10'>
      <div className='flex flex-col gap-10'>
        {results.slice(0, 2).map((item) => {
          return (
            <div key={item.id}>
              <h3 className='mb-5 text-xl font-medium p-3 bg-secondary inline-block'>
                {item.name}
              </h3>
              <div key={item.id} className='w-full aspect-video'>
                <iframe
                  width='864'
                  height='486'
                  src={`https://www.youtube.com/embed/${item.key}`}
                  frameborder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowfullscreen
                  className='w-full h-full object-fill'></iframe>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MovieSimilar = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "similar"), fetcher);
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className='py-10'>
      <h2 className='text-3xl font-medium mb-10'>Similar Movie</h2>
      <div className='movie-list'>
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView='auto'>
          {results.length > 0 &&
            results.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item}></MovieCard>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
