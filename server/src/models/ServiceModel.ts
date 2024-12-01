import mongoose from 'mongoose';

interface IService extends mongoose.Document {
  heading: string;
  images: [{ url: { type: String; required: true } }];
  name: string;
  address: string;
  categoryTag: string;
  description: string;
  bookings: mongoose.Types.ObjectId[];
}

const ServiceSchema = new mongoose.Schema<IService>({
  heading: {
    type: String,
    required: true,
  },
  images: [{ url: { type: String, required: true } }],
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  categoryTag: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
  ],
});

ServiceSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const ServiceModel = mongoose.model<IService>('Service', ServiceSchema);

export { ServiceModel };
