import mongoose from 'mongoose';

export const DocumentRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  documentType: {
    type: String,
    required: [true, 'Please provide the document type'],
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  requestedAt: {  
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "Please enter reason for request in a request letter format"]
  },
  mobile: {
    type: String
  },
  lrnNo: {
    type: String
  }
  // Add more fields as needed for your use case
});

export default mongoose.model.DocumentRequests || mongoose.model('DocumentRequest', DocumentRequestSchema);
