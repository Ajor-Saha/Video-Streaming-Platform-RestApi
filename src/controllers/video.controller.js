import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllVideos = asyncHandler(async (req, res) => {
    //const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //get all videos based on query, sort, pagination
    // Query the database to retrieve all videos
    const videos = await Video.find();

    // If no videos are found, return a 404 error
    if (!videos) {
        throw new ApiError(404, "No videos found");
    }

    // Return the list of videos as a response
    return res.status(200).json(
        new ApiResponse(200, videos, "All videos retrieved successfully")
    );
})

const publishVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    //get video, upload to cloudinary, create video

    if (
        [title, description].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedVideo = await Video.findOne({ title })

    if (existedVideo) {
        throw new ApiError(409, "Video with this title already exist")
    }

    const videoLocalPath = req.files?.videoFile[0]?.path;

    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

    if (!videoLocalPath) {
        throw new ApiError(400, "Video file is required")
    }

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumnail path is required")
    }

    const videoFile = await uploadOnCloudinary(videoLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
    
    if (!videoFile || !thumbnail) {
        throw new ApiError(400, "Videofile or thumnail is required")
    }

    


    const video = await Video.create({
        title,
        description,
        videoFile: videoFile.url,
        thumbnail: thumbnail.url,
        owner: req.user._id 
    })

    const createdVideo = await Video.findById(video._id)

    return res.status(201).json(
        new ApiResponse(200, createdVideo, "Video uploaded successfully")
    )

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    // get video by id
    
    const video = await Video.findById({ _id: videoId });

    // If no video is found, return a 404 error
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    // Return the video as a response
    return res.status(200).json(
        new ApiResponse(200, video, "Video retrieved successfully")
    );
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    // update video details like title, description, thumbnail
    // Extract the fields to update from the request body
    const { title, description } = req.body;

    // Check if any required fields are missing
    if (!title || !description) {
        throw new ApiError(400, "All fields are required");
    }

    const thumbnailLocalPath = req.file?.path

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "thumbnail file is missing")
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if (!thumbnail.url) {
        throw new ApiError(400, "Error whild uploading thumbnail")
    }


    // Find the video by its ID and update its details
    const updatedVideo = await Video.findByIdAndUpdate(
        { _id: videoId }, // Using the _id field
        {
            $set: {
                title,
                description,
                thumbnail: thumbnail.url
            }
        },
        { new: true } // Options: return the updated document
    );

    // If no video is found, return a 404 error
    if (!updatedVideo) {
        throw new ApiError(404, "Video not found");
    }

    // Return the updated video as a response
    return res
    .status(200)
    .json(new ApiResponse(200, updatedVideo, "Video details updated successfully"));
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video

    const deletedVideo = await Video.findByIdAndDelete({ _id: videoId});

    // If no video is found, return a 404 error
    if (!deletedVideo) {
        throw new ApiError(404, "Video not found");
    }

    // Return a success message as a response
    return res
        .status(200)
        .json(new ApiResponse(200, null, "Video deleted successfully"));
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}