import { Router } from "express";
import {
  createMultipleMiaSlots,
  createSingleMiaSlot,
  deleteMultipleMiaSlots,
  deleteSingleMiaSlot,
  getAllMiaSlots,
  getSingleMiaSlot,
  updateMultipleMiaSlots,
  updateSingleMiaSlot,
} from "../controllers/miaSlotControllers.js";
const router = Router();

router
  .route("/slots")
  .get(getAllMiaSlots)
  .post(createMultipleMiaSlots)
  .patch(updateMultipleMiaSlots)
  .delete(deleteMultipleMiaSlots);

router.route("/slot").post(createSingleMiaSlot);

router
  .route("slot/:slotId")
  .get(getSingleMiaSlot)
  .patch(updateSingleMiaSlot)
  .delete(deleteSingleMiaSlot);

export default router;
