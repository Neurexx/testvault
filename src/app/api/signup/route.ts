import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/userModel';
import bcrypt from 'bcrypt';


export async function POST(request: Request) {
  await dbConnect();

  try {
    const { name,email, password } = await request.json();

    const user = await UserModel.findOne({
      email,
      
    });

    if (user) {
      return Response.json(
        {
          success: false,
          message: 'Username is already taken',
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
        
        
      });

      await newUser.save();
   

   
    // Send verification email
   

    return Response.json(
      {
        success: true,
        message: 'User registered successfully.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return Response.json(
      {
        success: false,
        message: 'Error registering user',
      },
      { status: 500 }
    );
  }
}