import { Router } from "express";
import random from "../Controllers/random.js";

const routerRandom = Router()
routerRandom.get('/', random)
export default routerRandom