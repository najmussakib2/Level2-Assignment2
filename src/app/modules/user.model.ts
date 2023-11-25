import { Schema, model } from "mongoose";
import { IOrder, IUser, TUserModel } from "./user/user.interface";
import bcrypt from 'bcrypt'
const saltRounds = 10;

const orderSchema = new Schema<IOrder,TUserModel>({
    productName:{
        type:String
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

const userSchema = new Schema <IUser,TUserModel>({
    userId:{
        type:Number,
        unique:true,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String
    },
    fullName:{
        firstName:String,
        lastName:String
    },
    age:Number,
    email:String,
    isActive:Boolean,
    address:{
        street:String,
        city:String,
        country:String
    },
    hobbies:[String],
    orders:[orderSchema],
    isDeleted: {
        type: Boolean,
        default: false,
      }
})

// userSchema.methods.isUserExists =async function(id:number): Promise<boolean>{
//     const existingUser = await User.findOne({userId:id});
//     return !!existingUser;
// }
// ,{
//     toJSON:{virtuals:true},
//     toObject:{virtuals:true}
// }

userSchema.statics.userExists = async (userId: number) => {
    const existingUser = await User.findOne({ userId });
    return existingUser;
  };
  

userSchema.pre('save',async function(next) {
    this.password =await bcrypt.hash(this.password, saltRounds);
    next();
  });




  userSchema.pre('find',function(next){
    this.find({isDeleted:{$ne:true}})
    next();
})
userSchema.pre('findOne',function(next){
    this.find({isDeleted:{$ne:true}})
    next();
})


const User = model<IUser,TUserModel>('User', userSchema);
export default User;