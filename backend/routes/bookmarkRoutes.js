const express = require("express");
const router = express.Router();

const {
  createBookmark,
  getBookmarks,
  deleteBookmark
} = require('../controllers/bookmarksControllers')

const protect = require('../middlewares/authMiddleware')

router.post("/", protect, createBookmark);

router.get("/:userId", protect, getBookmarks);

router.delete("/delete", protect, deleteBookmark);

module.exports = router;
