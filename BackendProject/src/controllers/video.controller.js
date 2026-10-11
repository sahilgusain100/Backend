import mongoose from "mongoose";
import {Video} from "../models/video.model"
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/cloudinary";

const getAllVideos = asyncHandler(async(req, res) => {
    const {page =1, limit = 10, query, sortBy, userId } = req.query
    //TODO : get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const {title, desciption} = req.body
    //TODO: get video, upload to cloudinary, create video
})

const getVideoById = asyncHandler( async( req, res) => {
    const {videoId} = req.params
    //TODO : get video by ID
})

const updateVideo = asyncHandler( async(req, res) => {
    const {videoId} = req.params
      //TODO: update video details like title, desciption, thumbnail
})

const deleteVideo = asyncHandler( async (req, res) => {
    const {videoId} = req.params
})

const togglePublishStatus = asyncHandler( async( req, res) => {
    const {videoId} = req.params
})

export{
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}