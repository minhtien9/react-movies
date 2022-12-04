import React from "react";
import Banner from "./components/banner/Banner";
import "swiper/scss";
import HomePage from "./page/HomePage";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import MoviePage from "./page/MoviePage";

function App() {
    return (
        <React.Fragment>
            <Routes>
                <Route element={<Main></Main>}>
                    <Route
                        path='/'
                        element={
                            <>
                                <Banner></Banner>
                                <HomePage></HomePage>
                            </>
                        }></Route>
                    <Route path='/movies' element={<MoviePage></MoviePage>}></Route>
                </Route>
            </Routes>
        </React.Fragment>
    );
}

export default App;
