import { z } from 'zod';


const AddressValidationSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  });
  
  const OrderValidationSchema = z.object({
    productName: z.string(),
    price: z.number(),
    quantity: z.number(),
  });
  
  const UserValidationSchema = z.object({
    userId: z.number().int().positive(),
    username: z.string(),
    password: z.string(), 
    fullName: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }),
    age: z.number(),
    email: z.string().email(),
    isActive: z.boolean(),
    address: AddressValidationSchema,
    hobbies: z.array(z.string()),
    orders: z.array(OrderValidationSchema).optional(),
    isDeleted: z.boolean().default(false),
  });
  
  export { UserValidationSchema, OrderValidationSchema, AddressValidationSchema };