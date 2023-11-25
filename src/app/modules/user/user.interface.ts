
import { Model } from "mongoose"

export interface IOrder  {
    productName:string
    price:number
    quantity:number
}


export interface IUser {
    userId: number
    username:string
    password:string
    fullName: {
      firstName: string;
      lastName: string;
    };
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: {
      street: string;
      city: string;
      country: string;
    };
    orders?:IOrder[],
    isDeleted: boolean;
  }

 export interface TUserModel extends Model<IUser> {
  userExists(id:number):Promise<IUser | null>;
  }

//  export interface TUserModel extends Model<IUser> {
//     findUserWithoutPassword(id:number):Partial<IUser | null>;
//   }

//   export interface IUserMethods {
//     isUserExists(id:string):Promise<IUser | null>;
//   }

//   export type TUserModel = Model<IUser, Record<string, never>, IUserMethods>;



  



