import { User } from "../models/user";
import { AppDataSource } from "../config/dbConfig";

export const UserRepository = AppDataSource.getRepository(User);
