import {Router} from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken } from "../controllers/user.controller.js";
import {upload} from "../middlewarers/multer.middleware.js"
import { verifyJWT } from "../middlewarers/auth.middleware.js";
import { User } from "../models/user.model.js";
const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router