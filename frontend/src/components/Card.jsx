import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoBookmark } from "react-icons/io5";
import { IMAGE_BASE_URL } from "../constants";
import { PiFilmStripFill, PiTelevisionFill } from "react-icons/pi";
import {
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetBookmarksQuery,
} from "../slices/bookmarkApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CiBookmark } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { IoMdPlayCircle } from "react-icons/io";


const Card = ({ items }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { keyword } = useParams();
  const userId = userInfo?._id;
  const [addBookmark] = useAddBookmarkMutation();
  const [deleteBookmark] = useDeleteBookmarkMutation();
  const { data: bookmarks, refetch } = useGetBookmarksQuery(
    { userId, keyword },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, refetch]);

  const location = useLocation();
  const isBookmarksInUrl = location.pathname.includes("/bookmarks");


  //  It identifies the items already added to the bookmarks
  const isItemBookMarked = (itemId) =>
    bookmarks?.some((bookmark) => bookmark.itemId === itemId);


  //  Adds the item to bookmarks
  const handleBookmarkClick = async (item) => {
    if (!userInfo) {
      toast.error("You must be logged in to add bookmarks");
      return;
    }

    try {
      const bookmarkData = {
        user: userId,
        itemId: item.id,
        backdrop_path: item.backdrop_path,
        title: item.title || null,
        name: item.name || null,
        release_date: item.release_date || null,
        first_air_date: item.first_air_date || null,
      };

      await addBookmark(bookmarkData).unwrap();
      toast.success("Bookmark added successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Error adding bookmark");
    }
  };
// Removes the item from  bookmarks
  const handleDeleteClick = async (item) => {
    try {
      await deleteBookmark({
        user: userId,
        itemId: item.id,
      }).unwrap();
      toast.success("Bookmark removed successfully");
      refetch(); // Call refetch to update the bookmarks list
    } catch (error) {
      toast.error(error?.data?.message || "Error removing bookmark");
    }
  };

  //  It removes the item from Bookmarks & this func will only be available ont he bookmark page only
  const bookmarkDeleteClick = async (item) => {
    try {
      await deleteBookmark({
        user: userId,
        itemId: item.itemId,
      }).unwrap();
      toast.success("Bookmark removed successfully");
      refetch(); // Call refetch to update the bookmarks list
    } catch (error) {
      toast.error(error?.data?.message || "Error removing bookmark");
    }
  };

  return (
    <div className="grid grid-cols-12 gap-5">
      {items.map(
        (item) =>
          (item.title?.length < 22 || item.name?.length < 22) && (
            <div
              key={item.id}
              className="relative col-span-6 md:col-span-4 lg:col-span-3 items-between h-[175px] sm:h-[200px] grid grid-rows-12 group"
            >
              {isBookmarksInUrl ? (
                <span className="p-2 rounded-full bg-gray-700 bg-opacity-50 absolute right-1 top-1 sm:right-4 sm:top-3 z-40">
                  <IoBookmark
                    className="cursor-pointer"
                    onClick={() => bookmarkDeleteClick(item)}
                  />
                </span>
              ) : isItemBookMarked(item.id) ? (
                <span className="p-2 rounded-full bg-gray-700 bg-opacity-50 absolute right-1 top-1 sm:right-4 sm:top-3 z-40">
                  <IoBookmark
                    className="cursor-pointer"
                    onClick={() => handleDeleteClick(item)}
                  />
                </span>
              ) : (
                <span className="p-2 rounded-full bg-gray-900 bg-opacity-75 font-bold absolute right-1 top-1 sm:right-4 sm:top-3 z-40 hover:bg-white hover:text-black">
                  <CiBookmark
                    className="cursor-pointer"
                    onClick={() => handleBookmarkClick(item)}
                  />
                </span>
              )}
              <div className="row-span-7 sm:row-span-9 rounded-lg overflow-hidden relative">
                <img
                  src={`${IMAGE_BASE_URL}/${item.backdrop_path}`}
                  alt=""
                  className="w-full sm:object-cover opacity-75"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="flex justify-around items-center rounded-full bg-white bg-opacity-10 px-2 py-1 gap-3 cursor-pointer">
                    <p className=" text-[35px] " >
                      <IoMdPlayCircle/>
                    </p>
                    <p>Play</p>
                  </div>
                </div>
              </div>
              <div className="row-span-1 text-gray-300 font-semibold flex gap-1 text-[13px] items-center pt-2">
                <span>
                  {item.release_date?.split("-")[0] ||
                    item.first_air_date?.split("-")[0]}
                </span>
                <span className="border-2 rounded-full"></span>
                <span>
                  {item.release_date ? (
                    <PiFilmStripFill className="rotate-90" />
                  ) : (
                    <PiTelevisionFill />
                  )}
                </span>
                <span>{item.first_air_date ? "TV Show" : "Movie"}</span>
                <span className="border-2 rounded-full"></span>
                <span>{item.adult ? "18+" : "PG"}</span>
              </div>
              <div className="row-span-4 sm:row-span-2 flex flex-wrap sm:items-center pt-2 text-[18px] font-bold ">
                <Link
                  to={
                    item.release_date
                      ? `moviedetail/${item.id || item.itemId}`
                      : `tvseriesdetail/${item.id || item.itemId}`
                  }
                  aria-label={`${item.release_date ? `moviedetail of ${item.id || item.itemId}` : `tvseriesdetail of ${item.id || item.itemId}`}`}
                >
                  {item.title || item.name}
                </Link>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Card;
