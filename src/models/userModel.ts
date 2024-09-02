import mongoose,{Schema,Document} from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  
}

const userSchema: Schema<User> = new Schema({
  //@ts-ignore
  email: {
    type: String,
    required: true,
    unique: true,
  },
  //@ts-ignore
  password: {
    type: String,
    required: true,
  },
  //@ts-ignore
  name: {
    type: String,
    required: true,
  },
  exams: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Exam',
    },
  ],
}, { timestamps: true });

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>('User', userSchema);

export default UserModel;

