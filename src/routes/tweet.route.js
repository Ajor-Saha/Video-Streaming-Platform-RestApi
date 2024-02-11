import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { createTweet, deleteTweet, getUserTweets, updateTweet } from '../controllers/tweet.controller.js';

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").post(createTweet);
router.route("/user").get(getUserTweets);
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet);

export default router
