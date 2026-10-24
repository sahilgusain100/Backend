import mongoose, {isValidObjectId} from "mongoose";
import {Like} from "../models/like.model"
import { Comment } from "../models/comment.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import {Tweet} from "../models/tweet.model"
import { Video } from "../models/video.model";

const toggleVideoLike = asyncHandler( async( req, res) => {
    const {videoId} = req.params
    const userId = req.user._id;
    const video = await Video.findById(videoId);

    if(!video){
        throw new ApiError(404, "Video cannot be found");
    }

    const existingLike = await Like.findOne({
        video: videoId,
        likedBy: userId,
    })

    if(existingLike){
        await Like.findByIdAndDelete(existingLike._id);

        return res.status(200).json(
             new ApiResponse(
                200,
                {liked: false},
                "VIdeo unliked successfully"
            )
        )
    }

    await Like.create({
        video: videoId,
        likedBy: userId,
    })

    return res.status(200).json(
        new ApiResponse(
            200,
            {liked: true},
            "Video is liked successfully"
        )
    )
})

const toggleCommentLike = asyncHandler( async( req, res) => {
    const {commentId} = req.params
    const userId = req.user._id;;

    const comment = await Comment.findById(commentId);

    if(!comment){
        throw new ApiError(404, "Comment not found");
    }

    const existingLike = {
        comment: commentId,
        likedBy: userId,
    }

    if(existingLike){
        await Comment.findByIdAndDelete(existingLike._id);

        return res.status(200).json(
            new ApiResponse(
                200, 
                {liked: false},
                "Comment unliked successfully"
            )
        )
    }

    await Like.create({
        comment: commentId,
        likedBy: user,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {liked: false},
            "Comment liked successfully"
        )
    )

})

const toggleTweetLike = asyncHandler(async(req, res) => {
    const {tweetId}= req.params
    const user = req.user._id;

    const tweet = await Tweet.findById(tweetId);

    if(!tweet){
        throw new ApiError(404, "Tweet not found");
    }

    const existingLike = {
        tweet: tweetId,
        likedBy: user,
    }

    if(existingLike){
        await Tweet.findByIdAndDelete(existingLike);

        return res.status(200).json(
            new ApiResponse(
                200,
                {liked: false},
                "Tweet unliked successfully"
            )
        )
    }

    await Tweet.create({
        tweet: tweetId,
        likedBy: user,
    })

    return res.status(200).json(
        new ApiResponse(
            200,
            {liked:true},
            "Tweeet liked successfully"
        )
    )
})

const getLikedVideos = asyncHandler(async( req, res) => {
    //TODO: get all liked videos
})

export{ 
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}