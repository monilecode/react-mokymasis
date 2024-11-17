import mongoose from 'mongoose';

interface ICategory extends mongoose.Document {
  category: string;
  icon: string;
  alt: string;
}

const CategorySchema = new mongoose.Schema<ICategory>({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  icon: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});

CategorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);

export { CategoryModel };
