/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
import User from "../user.model"
import { IOrder, IUser } from "./user.interface"

const createUser = async (userData:IUser) =>{
    const newUser = await User.create(userData)
    const sanitizedUser = newUser.toObject();

    const { password, _id,orders,__v, ...userWithoutSensitiveInfo } = sanitizedUser;

    return userWithoutSensitiveInfo;
}

// const getAllUsers = async () =>{
//     const users = await User.find();   
//     const newUsers = users.map(user=>{
//         const sanitizedUser = user.toObject();

//         const { password, _id,orders,__v,hobbies,isActive, ...userWithoutSensitiveInfo } = sanitizedUser;
    
//         return userWithoutSensitiveInfo;
//     })
    
//     return newUsers
// }

// const getSingleUser = async (userId:string):Promise<IUser | null> =>{
//     try {
// const user = await User.findOne({userId});
// return user;
// } catch (error) {
//     console.error('Error finding user by ID:');
//     throw error;
//     }}

const getAllUsers = async () => {
    const newUsers = await User.aggregate([
        {
            $match: { isDeleted: { $ne: true } }
        },
        {
            $project: {
                password: 0,
                _id: 0,
                orders: 0,
                __v: 0,
                hobbies: 0,
                isActive: 0,
                isDeleted:0
            }
        }
    ]);

    return newUsers;
};


const getSingleUser = async (userId: string) => {
    const existingUser = await User.userExists(parseInt(userId));
    if (!existingUser) {
      throw new Error();
    }
    const result = await User.aggregate([
        {
            $match:{
                userId: parseInt(userId),
                isDeleted:false
            }
        },
        {
            $project:{
                username: 1,
                fullName: 1,
                age: 1,
                email:1,
                address: 1,
                _id:0
            }
        }
    ]);
    return result;
  };

const updateUser = async (userId:string,userData:Partial<IUser>) =>{
    const existingUser = await User.userExists(parseInt(userId));
    if (!existingUser) {
      throw new Error();
    }
    const result = await User.findOneAndUpdate({ userId: userId }, { $set: userData }, { new: true })
    return result
}

const deleteUser = async (userId:string) =>{
    const existingUser = await User.userExists(parseInt(userId));
    if (!existingUser) {
      throw new Error();
    }
    const result = await User.updateOne({ userId:userId }, { isDeleted: true });

    return result;
}

// Orders

const addNewProduct = async (userId:string,product:IOrder):Promise<IUser | null > =>{
    const existingUser = await User.userExists(parseInt(userId));
    if (!existingUser) {
      throw new Error();
    }
    const user = await User.findOneAndUpdate(
        {userId:userId},
        {
          $push: {
            orders: product,
          },
        },
        { new: true }
      );
      if (!user) {
        const newUser = await User.findOneAndUpdate(
            {userId:userId},
          {
            $set: {
              orders: [product],
            },
          },
          { new: true }
        );   
        return newUser;
      }  
      
      return user;
}

const singleUserAllOrders = async (id:string)=>{
    const existingUser = await User.userExists(parseInt(id));
    if (!existingUser) {
      throw new Error();
    }
    const orders = await User.findOne({userId:id}).select({orders:1,_id:0})
    return orders;
}

const totalPriceOfOrders = async (id:string):Promise<number | any> =>{
    const existingUser = await User.userExists(parseInt(id));
    if (!existingUser) {
      throw new Error();
    }
    const user = await User.findOne({userId:id});
    const total = user?.orders?.reduce((sum, order) => {
        const orderPrice = order?.price;
        if (orderPrice !== undefined && !isNaN(orderPrice)) {
            return sum + orderPrice;
        }
        return sum;
    }, 0);
    return total;
}


export const userServices= {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addNewProduct,
    singleUserAllOrders,
    totalPriceOfOrders
}