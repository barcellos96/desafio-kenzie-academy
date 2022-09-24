import * as express from "express";
import { Contact } from "../../src/entities/contact.entity";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      userEmail: string;
    }
  }
}
