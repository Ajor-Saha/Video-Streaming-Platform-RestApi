import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js"
import { verifyJWT } from "../middleware/auth.middleware.js";
import { deleteVideo, getAllVideos, getVideoById, publishVideo, updateVideo } from "../controllers/video.controller.js";


const router = Router()
router.use(verifyJWT);

// Route for GET method to retrieve all videos
router.get("/", getAllVideos);

router.post("/", upload.fields([
    {
        name: "videoFile",
        maxCount: 1,
    },
    {
        name: "thumbnail",
        maxCount: 1,
    }
]), publishVideo);

router.get("/:videoId", getVideoById);
router
    .route("/:videoId")
    .delete(deleteVideo)
    .patch(upload.single("thumbnail"), updateVideo);

export default router