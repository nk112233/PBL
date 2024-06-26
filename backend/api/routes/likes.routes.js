import { Router } from "express";

import {verifyJWT} from "../api/middlewares/auth.middleware.js"
import {likeBlog, getLikesCount, getTopVoices, likeAnswer, getLikesCountAnswer} from "../api/controllers/likes.controller.js"


const likesRouter = Router()

likesRouter.route("/l/:blogId").post(verifyJWT, likeBlog).get(verifyJWT,getLikesCount)

likesRouter.route("/getTopVoices").get(getTopVoices)

likesRouter.route("/likeAnswer/:answerId").post(verifyJWT, likeAnswer).get(verifyJWT,getLikesCountAnswer)

export default likesRouter