import { Router } from "express";

const routes = Router();

import userCreateController from "./controllers/User/userCreate.controller";
import userDeleteSelfController from "./controllers/User/userDeleteSelf.controller";
import userListOneController from "./controllers/User/userListOne.controller";
import userLoginController from "./controllers/User/userLogin.controller";
import validateUserCreateMiddleware from "./middlewares/validateUserCreate.middleware";
import validateUserIdMiddleware from "./middlewares/validateUserId.middleware";
import { authUser } from "./middlewares/authUser.middleware";
import userUpdateController from "./controllers/User/userUpdateSelf.controller";
import contactCreateController from "./controllers/Contact/contactCreate.controller";
import contactListUserController from "./controllers/Contact/contactListUser.controller";
import contactDeleteSelfController from "./controllers/Contact/contactDeleteSelf.controller";
import contactUpdateSelfController from "./controllers/Contact/contactUpdateSelf.controller";
import validateOwnerContactMiddleware from "./middlewares/validateOwnerContact.middleware";
import validateContactCreateMiddleware from "./middlewares/validateContactCreate.middleware";

//USER
routes.post("/users", validateUserCreateMiddleware, userCreateController);
routes.post("/users/login", userLoginController);
routes.get("/users/me", authUser, userListOneController);
routes.delete(
  "/users/me/:id",
  authUser,
  validateUserIdMiddleware,
  userDeleteSelfController
);
routes.patch(
  "/users/me/:id",
  authUser,
  validateUserIdMiddleware,
  userUpdateController
);

//CONTACTS
routes.post(
  "/users/contacts/:id",
  authUser,
  validateUserIdMiddleware,
  validateContactCreateMiddleware,
  contactCreateController
);
routes.get("/users/contacts", authUser, contactListUserController);
routes.delete(
  "/users/contacts/:id/:id_contact",
  authUser,
  validateUserIdMiddleware,
  validateOwnerContactMiddleware,
  contactDeleteSelfController
);
routes.patch(
  "/users/contacts/:id/:id_contact",
  authUser,
  validateUserIdMiddleware,
  validateOwnerContactMiddleware,
  contactUpdateSelfController
);
export default routes;
