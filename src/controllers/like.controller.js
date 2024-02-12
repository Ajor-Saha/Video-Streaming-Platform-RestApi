import { Like } from "../models/like.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { Video } from "../models/video.model.js"
import {ApiError} from "../utils/ApiError.js"
import { Comment } from "../models/comment.model.js"
import { Tweet } from "../models/tweet.model.js"


const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params

    const existVideo = await Video.findById({ _id: videoId })

    if (!existVideo) {
        throw new ApiError(404, "Video is not found")
    }
    //TODO: toggle like on video
    const like = await Like.findOne({ video: videoId, likeBy: req.user._id })

    if (like) {
        const removeLike = await Like.findByIdAndDelete(like._id)
        return res.status(201).json(
            new ApiResponse(200, removeLike, "Like removed from video successfully")
        );
    } else {
        const createLike = await Like.create({
            video: videoId,
            likeBy: req.user._id
        })

        return res.status(201).json(
            new ApiResponse(200, createLike, "Like added to video successfully ")
        )
    }

})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment

    const existComment = await Comment.findById({ _id: commentId })

    if (!existComment) {
        throw new ApiError(404, "Comment is not found")
    }
    //TODO: toggle like on video
    const like = await Like.findOne({ comment: commentId, likeBy: req.user._id })

    if (like) {
        const removeLike = await Like.findByIdAndDelete(like._id)
        return res.status(201).json(
            new ApiResponse(200, removeLike, "Like removed from comment successfully")
        );
    } else {
        const createLike = await Like.create({
            comment: commentId,
            likeBy: req.user._id
        })

        return res.status(201).json(
            new ApiResponse(200, createLike, "Like added to comment successfully ")
        )
    }

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
    const existTweet = await Tweet.findById({ _id: tweetId })

    if (!existTweet) {
        throw new ApiError(404, "Tweet is not found");
    }

    let like = await Like.findOne({ tweet: tweetId, likeBy: req.user._id });

    if (like) {
        like = await Like.findByIdAndDelete(like._id)
        return res.status(201).json(
            new ApiResponse(200, {}, "Like removed from tweet successfully")
        )
    } else {
        like = await Like.create({ tweet: tweetId, likeBy: req.user._id});

        return res.status(201).json(
            new ApiResponse(200, like, "Like added to tweet successfully")
        )
    }

})

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const likes = await Like.find({ likeBy: req.user._id })
    
    const videoIds = likes.map(like => like.video)

    const likedVideos = await Video.find({ _id: {
        $in: videoIds
    }})

    return res.status(200).json(
        new ApiResponse(200, likedVideos, "Liked videos retrieved successfully")
    );
    
    
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}