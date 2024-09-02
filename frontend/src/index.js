import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Bookmarks from "./pages/Bookmarks";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TvSeriesDetail from "./pages/TvSeriesDetail";
import { Provider } from "react-redux";
import store from "./store/store";
import Movies from "./pages/Movies";
import TvSeries from "./pages/TvSeries";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route  index={true} path="/" element={<Home />} />
      <Route  path="/search/:keyword" element={<Home />} />
      <Route  path="/login" element={<Login />} />
      <Route  path="/signup" element={<Signup />} />
      <Route  path="/movies" element={<Movies />} />
      <Route  path="/movies/search/:keyword" element={<Movies />} />
      <Route  path="/moviedetail/:id" element={<MovieDetail />} />
      <Route  path="/search/:keyword/moviedetail/:id" element={<MovieDetail />} />
      <Route  path="/movies/moviedetail/:id" element={<MovieDetail />} />
      <Route  path="/movies/search/:keyword/moviedetail/:id" element={<MovieDetail />} />
      <Route  path="/tvseries" element={<TvSeries />} />
      <Route  path="/tvseries/search/:keyword" element={<TvSeries />} />
      <Route  path="/tvseriesdetail/:id" element={<TvSeriesDetail />} />
      <Route  path="/search/:keyword/tvseriesdetail/:id" element={<TvSeriesDetail />} />
      <Route  path="tvseries/tvseriesdetail/:id" element={<TvSeriesDetail />} />
      <Route  path="tvseries/search/:keyword/tvseriesdetail/:id" element={<TvSeriesDetail />} />
      <Route  path="/bookmarks" element={<Bookmarks />} />
      <Route  path="/bookmarks/search/:keyword" element={<Bookmarks />} />
      <Route  path="/bookmarks/moviedetail/:id" element={<MovieDetail />} />
      <Route  path="/bookmarks/search/:keyword/moviedetail/:id" element={<MovieDetail />} />
      <Route  path="/bookmarks/tvseriesdetail/:id" element={<TvSeriesDetail />} />
      <Route  path="/bookmarks/search/:keyword/tvseriesdetail/:id" element={<TvSeriesDetail />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
