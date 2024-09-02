const Bookmark = require("../models/bookmarkModel");

// @desc    Creates a bookmark
// @route   POST /api/bookmarks
// @access  Private
const createBookmark = async (req, res) => {
    try {
      const {
        user,
        itemId,
        backdrop_path,
        title,
        name,
        release_date,
        first_air_date,
      } = req.body;
  
      if (!user || !itemId) {
        return res.status(400).json({ message: "User and itemId are required" });
      }
      const bExist = await Bookmark.findOne({ user, itemId });
  
      if (bExist) {
        res.status(400).json({ message: "Item already bookmarked" });
      } else {
        const newBookmark = new Bookmark({
          user,
          itemId,
          backdrop_path,
          title,
          name,
          release_date,
          first_air_date,
        });
  
        const savedBookmark = await newBookmark.save();
        res.status(201).json(savedBookmark);
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: "Failed to create bookmark", error: error.message });
    }
  }


// @desc    Fetch Items Bookmarked By a User
// @route   GET /api/bookmarks/:userId
// @access  Private 

const getBookmarks = async (req, res) => {
    try {
      const { keyword } = req.query;
  
      const regex = new RegExp(keyword, "i");
  
      const { userId } = req.params;
  
      if (!userId || userId === "undefined") {
        return res.status(400).json({
          message:
            "Invalid or missing User ID, Kindly Login to access your Bookmarks",
        });
      }
      if (!keyword) {
        const bookmarks = await Bookmark.find({ user: userId });
        res.status(200).json(bookmarks);
      } else {
        // Query to find bookmarks that match the keyword in either name or title
        const searchedBookmarks = await Bookmark.find({
          user: userId,
          $or: [{ name: { $regex: regex } }, { title: { $regex: regex } }],
        });
  
        res.status(200).json(searchedBookmarks);
      }
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      res.status(500).json({ message: "Failed to fetch bookmarks", error });
    }
  }

// @desc    Deletes the bookmarked item
// @route   DELETE /api/bookmarks/delete
// @access  Private 

const deleteBookmark = async (req, res) => {
    try {
      const body = req.body;
  
      await Bookmark.findOneAndDelete(body);
      res.status(200).json({ message: "Successfully Removed" });
    } catch (error) {
      res.status(500).json({ message: "Unable To Remove from Bookmarks" });
    }
  }

  module.exports = {
    createBookmark,
    getBookmarks,
    deleteBookmark
  }