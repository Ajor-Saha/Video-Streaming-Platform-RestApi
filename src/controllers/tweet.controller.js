import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"



const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const { content } = req.body;

    if (!content || content === '') {
        throw new ApiError(400, "Content of this tweet is required");
    }

    const tweet = await Tweet.create({
        content,
        owner: req.user._id,
    })
    
    return res.status(201).json(
        new ApiResponse(200, tweet, "Tweet created Successfully")
    )
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    const userId = req.user._id;

    // Find all tweets owned by the specified user
    const userTweets = await Tweet.find({ owner: userId });

    return res.status(201).json(
        new ApiResponse(200, userTweets, "User tweets retrieved successfully")
    )
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const { tweetId } = req.params;

    // Extract the fields to update from the request body
    const { content } = req.body;

    // Check if the content field is provided
    if (!content) {
        throw new ApiError(400, "Content field is required");
    }

    const updatedTweet = await Tweet.findByIdAndUpdate(
        { _id:tweetId},
        { $set: { content }},
        { new: true }
    )
    return res.status(201).json(
        new ApiResponse(200, updatedTweet, "Tweet updated successfully")
    )
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const { tweetId } = req.params
    
    const deletedTweet = await Tweet.findByIdAndDelete({ _id: tweetId });

    // If no tweet is found, return a 404 error
    if (!deletedTweet) {
        throw new ApiError(404, "Tweet not found");
    }

    return res.status(201).json(
        new ApiResponse(200, null, "Tweet deleted successfully")
    )
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}

/*
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
 */