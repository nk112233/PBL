import { Router } from "express";

import {verifyJWT} from "../api/middlewares/auth.middleware.js"
import {postAnswer, getAnswers, deleteAnswer  } from "../api/controllers/answer.controller.js";


const answerRouter = Router()

answerRouter.route("/answer/:questionId").get(getAnswers).post(
    verifyJWT,
    postAnswer
)
answerRouter.route("/deleteAnswer/:answerId").delete(
    verifyJWT,
    deleteAnswer
)


export default answerRouter