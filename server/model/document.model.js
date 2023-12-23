import mongoose from 'mongoose';

export const DocumentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    documentType: {
        type: String,
        required: [true, 'Please provide the document type'],
    },
    content: {
        type: String,
        required: [true, 'Please provide the document content'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // Add more fields as needed for your use case
});


export default mongoose.model.Documents || mongoose.model('Document', DocumentSchema)