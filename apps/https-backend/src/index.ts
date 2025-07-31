import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common/config";
import { Authmiddleware } from './middleware';
import {CreateUserSchema, CreateRoomSchema, SigninSchema} from "@repo/common/types"
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello, HTTPS Backend!');
});

app.post('/signup', (req, res)=>{
  try{
    //db call
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
      return res.status(411).json({
        message : "Invalid Inputs"
      })
    }

    return res.status(200).json({
      userId : 123
    })

  }
  catch(error){
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
})

app.post('/signin', (req,res)=>{
   try {
     //db call
     const data = SigninSchema.safeParse(req.body);
     if (!data.success) {
       return res.status(411).json({
         message: "Invalid Inputs",
       });
     }

     const userId = 123

     const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

     return res.status(200).json({
       userId: 123,
       token: token,
     });
   } catch (error) {
     console.log(error);
     res.status(500).send("Internal Server Error");
   }
})

app.post('/create-room', Authmiddleware, (req,res)=>{
  try{
    //db call
    const data = CreateRoomSchema.safeParse(req.body);
    if (!data.success) {
      return res.status(411).json({
        message: "Invalid Inputs",
      });
    }

    return res.status(200).json({
      roomId : 123
    })

  }
  catch(error){
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
})


app.listen(PORT, () => {
  console.log(`HTTPS Backend is running on port ${PORT}`);
});