import listModel from '../models/List'
import { RequestHandler } from "express";
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { title } from 'process';


export const listController:RequestHandler = async (req, res, next) => {
    try {
        // throw createHttpError(401);
       const todolists = await listModel.find().exec();
       res.status(200).json(todolists);
    } catch (error) {
       next(error)
    }
 
 };

 export const getlistbyid:RequestHandler = async (req,res,next) => {
    const listid = req.params.listid;
    try {
        if(!mongoose.isValidObjectId(listid))
        {
            throw createHttpError(400, "Invalid TODO List ID")
        }
        const todolist = await listModel.findById(listid).exec();
       if (!todolist){
        throw createHttpError(404, "Todo-list Not Found");
       }
        res.status(200).json(todolist);
    } catch (error) {
        next(error)
    }
 };

interface CreateListBody {
    task?:string,
    priority?:[],
    duedate?:string,
    status:boolean,
}

 export const newlistcontroller:RequestHandler<unknown,unknown,CreateListBody,unknown> =async (req,res,next) => {
   const task = req.body.task;
   const priority = req.body.priority;
   const duedate = req.body.duedate;
   const status = req.body.status;
    try {
        if(!task) {
            throw createHttpError(400, "Please define a task");
        }
        if(!priority) {
            throw createHttpError(400, "Please set a priority of your task");
        }
        const createnewlist = await listModel.create({
            task:task,
            priority:priority,
            duedate:duedate,
            status:status,
        });
        res.status(201).json(createnewlist)
    } catch (error) {
        next(error)
    }
    
 };

interface updateListParams {
    listid: string,
}

 interface updateListBody {
    task?:string,
    priority?:[],
    duedate:string,
    status:boolean,
 }
 export const updateListConstroller:RequestHandler<updateListParams,unknown,updateListBody,unknown> =async (req,res,next) => {
    const listid = req.params.listid;
    const newtask = req.body.task;
    const newpriority = req.body.priority;
    const newduedate = req.body.duedate;
    const newstatus = req.body.status;
    try {
        if(!mongoose.isValidObjectId(listid))
        {
            throw createHttpError(400, "Invalid TODO List ID")
        }
        if(!newtask) {
            throw createHttpError(400, "Please define a task");
        }
        if(!newpriority) {
            throw createHttpError(400, "Please set a priority of your task");
        }
        const todolist = await listModel.findById(listid).exec();
        if(!todolist){
            throw createHttpError(404,"Todo-list not found");
        }
        todolist.task = newtask;
        todolist.priority = newpriority;
        todolist.duedate = newduedate;
        todolist.status = newstatus;
   
        const updatedList = await todolist.save();
        res.status(200).json(updatedList);

    } catch (error) {
        next(error)
    }
 };

export const deleteListController: RequestHandler =async (req,res,next) => {
    const listid = req.params.listid;
    try {
        if(!mongoose.isValidObjectId(listid))
        {
            throw createHttpError(400, "Invalid TODO List ID")
        }
        const todolist = await listModel.findById(listid).exec();
        if(!todolist){
            throw createHttpError(404,"Todo-list not found");
        }
        const deleted = todolist.remove();
        res.status(204).json(deleted);
    } catch (error) {
        next(error);   
    }
}