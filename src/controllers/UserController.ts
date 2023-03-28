import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/User";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {

    try {

        const user = await UserModel.findById(req.session.userId).select("+email").exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

interface signUpBody {
    username?: string,
    email?: string,
    password?: string
}

export const signUp: RequestHandler<unknown, unknown, signUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;
    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "User Input Fields Missing!")
        }
        const existingUserName = await UserModel.findOne({ username: username }).exec();
        if (existingUserName) {
            throw createHttpError(409, "USERNAME ALREADY TAKEN< PLEASE USE ANOTHER NAME!")
        }
        const existingEmail = await UserModel.findOne({ email: email }).exec();
        if (existingEmail) {
            throw createHttpError(409, "EMAIL ADDRESS ALREADY EXIST, USE ANOTHER EMAIL!")
        }
        const passwordHashed = await bcrypt.hash(passwordRaw, 10);
        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
        });

        req.session.userId = newUser._id;

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

interface loginBody {
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, loginBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, "Login Input Fields Missing!");
        }
        const user = await UserModel.findOne({ username: username }).select("+password +email").exec();

        if (!user) {
            throw createHttpError(401, "INVALID CREDENTIALS!");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw createHttpError(401, "INVALID CREDENTIALS!");
        }
        req.session.userId = user._id;
        res.status(201).json(user);

    } catch (error) {
        next(error)
    }
};

export const logout: RequestHandler = async (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error);
        }
        else {
            res.sendStatus(200);
        }
    })
};