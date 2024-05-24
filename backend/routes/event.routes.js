import { Router } from "express";
import {verifyJWT} from "../api/middlewares/auth.middleware.js"
import { addEvent, getEvent, showEvents } from "../api/controllers/event.controller.js";

const eventRouter = Router()

// private routes
eventRouter.route("/addEvent").post(verifyJWT,addEvent)

eventRouter.route("/showEvents").get(showEvents)

eventRouter.route("/e/:eventId").get(getEvent)

export default eventRouter;