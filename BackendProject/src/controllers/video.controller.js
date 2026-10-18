import mongoose from "mongoose";
import {Video} from "../models/video.model"
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/cloudinary";

const getAllVideos = asyncHandler(async(req, res) => {
    const {
        page =1, 
        limit = 10, 
        query, 
        sortBy = "createdAt", 
        userId 
    } = req.query

    const pageNumber = Math.max(1, Number(page) || 1);
    const limitNumber = Math.max(1, Math.min(100, Number(limit) || 10));

    const filter = {
        isPublished: true
    };

    if(query?.trim()){
        filter.$or = [
            {
                title: {
                    $regex: query.trim(),
                    $options: "i"//makes the search case insensitive
                }
            },
            {
                desciption: {
                    $regex: query.trim(),
                    $options: "i",
                }
            }
        ];
    }

    if(userId){
        filter.owner = userId;
    }

    const allowedSortFields = [
        "createdAt",
        "title",
        "duration",
        "views"
    ];

    const sortField = allowedSortFields.includes(sortBy) ? sortBy
    : "createdAt";

    const sortOptions = {
        [sortField]: -1
    };

    const videos = await Video.find(filter)
    .sort(sortOptions)
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber);

    const totalVideos = await Video.countDocuments(filter);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                videos,
                totalVideos,
                currentPage: pageNumber,
                totalPages: Math.ceil(
                    totalVideos / limitNumber
                ),
                limit: limitNumber
            },
            "Videos fetched successfully"
        )
    );
});

const publishAVideo = asyncHandler(async (req, res) => {
    const {title, desciption} = req.body
    

    if(!title?.trim() || !desciption?.trim()){
        throw new ApiError(400, "Title and Description are required");
    }

    const videoLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if(!videoLocalPath){
        throw new ApiError(400, "Video file required");
    }

    if(!thumbnailLocalPath){
        throw new ApiError(400, "Thumbnail is required");
    }

    const videoUpload =await  uploadOnCloudinary(videoLocalPath);
    const thumbnailUpload = await  uploadOnCloudinary(thumbnailLocalPath);

    if(!videoUpload?.url){
        throw new ApiError(400, "Video not uploaded");
    }

    if(!thumbnailUpload?.url){
        throw new ApiError(400, "Thumbnail not uploaded")
    }

    const video = await Video.create({
        videoFile: videoUpload.url,
        thumbnail: thumbnailUpload.url,
        title: title.trim(),
        desciption: desciption.trim(),
        duration: videoUpload.duration  || 0,
        owner: req.user._id,
    })

    return res.status(201).json(
        new ApiResponse(
            200,
            Video,
            "Video uploaded successfully"
        )
    );

})

const getVideoById = asyncHandler( async( req, res) => {
    const {videoId} = req.params
    const video = await Video.findById(videoId);

    if(!video){
        throw new ApiError(401, "Video not found");
    }

    return res.status(200).json(
            new ApiResponse(
            200,
            video,
            "Video found successfully"
        )
    );
});

const updateVideo = asyncHandler( async(req, res) => {
    const {videoId} = req.params
    const {title, desciption} = req.body
    const video = await Video.findById(videoId);

    if(!video){
        throw new ApiError(404, "VIdeo not found");
    }

    if(video.owner.toString() !== req.user._id){
        throw new ApiError(401, "You cannot edit the video");
    }

    if(title !== undefined){
        if(!title.trim()){
            throw new ApiError(400, "Title cannot be empty");

            video.title = title.trim();
        }
    }

    if(desciption !== undefined){
        if(!desciption.trim()){
            throw new ApiError(404, " Desciption cannot be empty ");

            video.desciption = desciption.trim();
        }
    }

    const thumbnailLocalPath = req.file?.path;

    if(thumbnailLocalPath){
        const thumbnailUpload = await uploadOnCloudinary(thumbnailLocalPath);

        if(!thumbnailUpload.url){
            throw new ApiError(401, "Thumbnail upload failed")
        }
    }

    await video.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            video,
            "Video updated successfully"
        )
    );
});

const deleteVideo = asyncHandler( async (req, res) => {
    const {videoId} = req.params
    const video = await Video.findById(videoId);

    if(!video){
        throw new ApiError(404, "Video not found");
    }

    if(video.owner.toString() !== req.user._id.toString()){
        throw new ApiError(400, " You cannot delete this video");
    }

    await Video.findByIdAndDelete(videoId);

    return res.status(200).json(
        200,
        {},
        "Video deleted successfully"
    )
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