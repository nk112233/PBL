import { Router } from "express";

import {verifyJWT} from "../api/middlewares/auth.middleware.js"
import { getComments, postComment } from "../api/controllers/comment.controller.js";


const commentRouter = Router()

commentRouter.route("/c/:blogId").get(getComments).post(
    verifyJWT,
    postComment
)


export default commentRouter