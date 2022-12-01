import { Router } from "express";
import { getCitas } from "../controllers/citas";

const router = Router();

router.get("/", getCitas)

export default router;