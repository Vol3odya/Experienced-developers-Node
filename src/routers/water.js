import { Router } from "express";
/*import * as contactControllers from "../controllers/contacts.js";*/
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
/*import { contactAddSchema, contactUpdateSchema } from "../validation/contacts.js";*/
import { isValidId } from "../middlewares/isValidd.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from '../middlewares/multer.js';



/*const contactsRouter = Router();
contactsRouter.use(authenticate);

contactsRouter.get("/", ctrlWrapper(contactControllers.getContactsControllers) );

contactsRouter.get("/:contactId", isValidId, ctrlWrapper(contactControllers.getContactByIdControllers));

contactsRouter.post("/", upload.single('photo'), validateBody(contactAddSchema), ctrlWrapper(contactControllers.addContactControllers));

contactsRouter.put("/:contactId", isValidId, validateBody(contactAddSchema), ctrlWrapper(contactControllers.upsertContactControllers));

contactsRouter.patch("/:contactId", upload.single('photo'), isValidId, validateBody(contactUpdateSchema), ctrlWrapper(contactControllers.patchContactControllers));

contactsRouter.delete("/:contactId", isValidId, ctrlWrapper(contactControllers.deleteContactControllers));
    
export default contactsRouter;*/