/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserValidationSchema } from "./user.validation";
import { userServices } from "./user.service";

const createUser =async (req:Request,res:Response) =>{
    try {
        const userData = req.body;
        const userValidationData = UserValidationSchema.parse(userData)
        
        const result = await userServices.createUser(userValidationData)
        
        res.status(200).json({
            success:true,
            message:'User is created successfully!',
            data:result
        });
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:'User is created failed!',
            error:error.message
        });
    }
}

const getAllUser = async (req:Request,res:Response) =>{
    try {
        const result = await userServices.getAllUsers()
        res.status(200).json({
            success:true,
            message:'All users is retrieve successfully!',
            data:result
        })
    } catch (err) {
        res.status(500).json({
          success: false,
          message: "User not found",
          error: {
            code: 404,
            description: "User not found!",
          },
        });
      }
}

const getSingleUser = async (req:Request,res:Response) =>{
    try {
        const {userId} = req.params;
        const result = await userServices.getSingleUser(userId)
        
        res.status(200).json({
            success:true,
            message:'User data is retrieve successfully!',
            data:result
        })
    } catch (err) {
        res.status(404).json({
          success: false,
          message: "User not found",
          error: {
            code: 404,
            description: "User not found!",
          },
        });
      }
}

const updateUser = async (req:Request,res:Response) =>{
    try {
        const id = req.params.userId;
        
        const updatedDoc = req.body;
        if ("password" in updatedDoc) {
            throw new Error("password field is not updated!");
          }
        const result = await userServices.updateUser(id,updatedDoc)
        // console.log('result',result)
        res.status(200).json({
            success:true,
            message:'User data is updated successfully!',
            data:result
        })
    } catch (err) {
        res.status(500).json({
          success: false,
          message: "Failed to update user data",
          error: {
            code: 404,
            description:"User not found!",
          },
        });
      }
}

const deleteUser = async (req:Request,res:Response) =>{
    try {
        const id = req.params.userId;
        await userServices.deleteUser(id)
        res.status(200).json({
            success:true,
            message:'User is deleted successfully!',
        })
     } catch (err) {
        res.status(500).json({
          success: false,
          message: "User not found",
          error: {
            code: 404,
            description: "User not found!",
          },
        });
      }
}

const addNewProduct = async (req:Request,res:Response) =>{
    try {
        const id = req.params.userId;
        const newProd = req.body;
        const result = await userServices.addNewProduct(id,newProd)
        res.status(200).json({
            success: true,
            "message": "Order created successfully!",
            data: result?.orders,
          });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'user is created failed!',
            error:error
        });
    }
}

const singleUserAllOrders = async (req:Request,res:Response) =>{
    try {
        const id = req.params.userId;
        const result = await userServices.singleUserAllOrders(id)
        res.status(200).json({
            success:true,
            message:'User data is retrieve successfully!',
            data:result
            
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Orders data is retreieved failed!',
            error:error
        });
    }
}
const totalPriceOfOrders = async (req:Request,res:Response) =>{
    try {
        const id = req.params.userId;

        const result = await userServices.totalPriceOfOrders(id)
        res.status(200).json({
            success:true,
            message:'Total price calculated successfully!',
            data:{
                "totalPrice": result
            }
            
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Orders data is retreieved failed!',
            error:error
        });
    }
}



export const userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addNewProduct,
    singleUserAllOrders,
    totalPriceOfOrders
}