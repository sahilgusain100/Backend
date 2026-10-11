import mongoose from "mongoose";
import {Comment} from "../models/comment.model"
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/cloudinary";

const getVideoComments = asyncHandler(async (req, res ) => {
    //TODO: get all comments for  a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
})

const addComment = asyncHandler( async( req, res) => {
    //TODO : add a comment to the video 
})

const updateComment = asyncHandler( async( req, res) => {
    //TODO: update a comment
})

const deleteComment = asyncHandler(async( req, res) => {
    //TODO: delete a comment 
})

export{
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}