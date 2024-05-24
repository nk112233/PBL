import { Router } from "express";

import {verifyJWT} from "../api/middlewares/auth.middleware.js"
import { deleteBlog, getBlog, postBlog, showBlogs } from "../api/controllers/blog.controller.js";
import { upload } from "../api/middlewares/multer.middleware.js";
import { showQuestions } from "../api/controllers/question.controller.js";


const blogRouter = Router()

blogRouter.route("/postBlog").post(
    verifyJWT,
    upload.fields([
        {
            name:"blogPicture",
            maxCount:1
        }
    ]),
    postBlog
)

blogRouter.route("/showBlogs").get(
   showBlogs
)

blogRouter.route("/b/:blogId").get(getBlog)

blogRouter.route("/deleteBlog/:blogId").delete(deleteBlog);

export default blogRouter