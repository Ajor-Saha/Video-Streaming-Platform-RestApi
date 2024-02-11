import { Playlist } from "../models/playlist.model.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  //TODO: create playlist

  const existedPlaylist = await Playlist.findOne({ name: name });

  if (existedPlaylist) {
    throw new ApiError(404, "Playlist with that name already exist");
  }

  const playlist = await Playlist.create({
    name,
    description,
    owner: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, playlist, "Playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  //TODO: get user playlists

  const existUser = await User.findById({ _id: userId });

  if (!existUser) {
    throw new ApiError(404, "User not found");
  }

  const userPlaylists = await Playlist.find({ owner: userId });

  if (!userPlaylists) {
    throw new ApiError(404, "No playlist found");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        userPlaylists,
        "Retreived all playlist for a user get Successfully"
      )
    );
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id
  const playlist = await Playlist.findById({ _id: playlistId });

  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, playlist, "Playlist retrieved successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { videoId, playlistId } = req.params;

  const existPlaylist = await Playlist.findById({ _id: playlistId });
  const existVideo = await Video.findById({ _id: videoId });

  if (!existPlaylist) {
    throw new ApiError(404, "Playlist does not exist");
  }

  if (!existVideo) {
    throw new ApiError(404, "Video is not found");
  }

  const existingVideo = existPlaylist.videos.find((video) =>
    video._id.equals(videoId)
  );

  if (existingVideo) {
    throw new ApiError(400, "Video already exists in the playlist");
  }

  existPlaylist.videos.push(existVideo);

  const updatedPlaylist = await existPlaylist.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedPlaylist,
        "Video added to playlist successfully"
      )
    );
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist

  const playlist = await Playlist.findById({ _id: playlistId})

  if (!playlist) {
    throw new ApiError(404, "Playlist not found")
  }

  const videoIndex = playlist.videos.findIndex(video => video._id.equals(videoId));

    if (videoIndex === -1) {
      throw new ApiError(404, "Video not found in playlist");
    }

  playlist.videos.splice(videoIndex, 1);
  
  const updatedPlaylist = await playlist.save();

  return res.status(200).json(
    new ApiResponse(200, updatedPlaylist, "Video removed from playlist successfully")
  );



});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist
  // Find the playlist by its ID and delete it
  const deletedPlaylist = await Playlist.findByIdAndDelete({ _id: playlistId });

  // If the playlist is not found, return a 404 error
  if (!deletedPlaylist) {
    throw new ApiError(404, "Playlist not found");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, deletedPlaylist, "Playlist deleted successfully")
    );
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist
  const existPlaylist = await Playlist.findById({ _id: playlistId });

  if (!existPlaylist) {
    throw new ApiError(404, "Playlist is not found");
  }

  if ([name, description].some((field) => field?.trim() === "")) {
    throw new ApiError(404, "All fields are required");
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    { _id: playlistId },
    {
      $set: {
        name,
        description,
      },
    },
    { new: true }
  );

  return res
    .status(201)
    .json(
      new ApiResponse(200, updatedPlaylist, "Playlist updated successfully")
    );
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
