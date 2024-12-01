import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends mongoose.Document {
  _id: Types.ObjectId;
  name: string;
  age?: number;
  email: string;
  password: string;
  isCorrectPassword: (password: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

UserSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model<IUser>('User', UserSchema);

export { UserModel };
