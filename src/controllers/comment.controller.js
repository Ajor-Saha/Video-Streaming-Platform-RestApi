import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"


const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
   // const {page = 1, limit = 10} = req.query
   const video = await Video.findById({ _id: videoId })

   if (!video) {
      throw new ApiError(400, "Video not found");
   }

   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 10;
   const startIndex = (page - 1)*limit;

   const comments = await Comment.find({ video: videoId })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    

    return res.status(201).json(
        new ApiResponse(200, comments, "Comments retrieved successfully")
    )
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const { videoId } = req.params;

    const existVideo = await Video.findOne({ _id:videoId })

    if (!existVideo) {
        throw new ApiError(400, "Video is not found");
    }

    const { content } = req.body

    // Check if the content field is provided
    if (!content) {
        throw new ApiError(400, "Content field is required");
    }

    const comment = await Comment.create({
        content,
        video: videoId,
        owner: req.user._id
    })

    return res.status(200).json(
        new ApiResponse(200, comment, "Comment added successfully")
    );
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const { commentId } = req.params;
    const { content } = req.body;

    if (!content?.trim()) {
        throw new ApiError(400, "Content is required")
    }

    // Find the comment by its ID and update its details
    const updatedComment = await Comment.findByIdAndUpdate(
        { _id: commentId },
        {
            $set: {
                content
            }
        },
        { new: true }
    )

    // If no comment is found, return a 404 error
    if (!updatedComment) {
        throw new ApiError(404, "Comment not found");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedComment, "Comment updated successfully")
    )


})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const { commentId } = req.params;

    // Find the comment by its ID and delete it
    const deletedComment = await Comment.findByIdAndDelete({ _id: commentId });

    // If no comment is found, return a 404 error
    if (!deletedComment) {
        throw new ApiError(404, "Comment not found");
    }

    return res.status(200).json(
        new ApiResponse(200, null, "Comment deleted successfully")
    );

})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }