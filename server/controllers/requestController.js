import DocumentRequestModel from '../model/Request.model.js';

// CRUD operations and other functions as needed

// POST student/create with bearer token
// {
//     "userId": "65817d4a5599d8c84d76877d",
//     "documentType": "transcript",
//     "description": "Hi!",
//     "email": "mendezglowny@gmail.com",
//     "mobile": "0931816481",
//     "lrnNo": "1341414"
//  }
export async function createDocumentRequest(req, res) {
    try {
      const { userId, documentType, description, email, mobile, lrnNo } = req.body;
  
      const documentRequest = new DocumentRequestModel({
        userId,
        documentType,
        description,
        email,
        mobile,
        lrnNo,
      });
  
      const result = await documentRequest.save();
      res.status(201).send({ msg: "Document Request Created Successfully", result });
    } catch (error) {
      console.error("Error creating document request:", error);
  
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        // Duplicate key error for the 'email' field
        res.status(400).send({ error: "Duplicate email address" });
      } else {
        // Other types of errors
        res.status(500).send({ error: error.message || "Internal Server Error" });
      }
    }
  }
  


// GET student/student/all/your_student_id with bearer token
// Fetch all document requests for a specific student
export async function getAllDocumentRequests(req, res) {
    try {
        const { studentId } = req.params;

        const documentRequests = await DocumentRequestModel.find({ studentId });

        res.status(200).send({ documentRequests });
    } catch (error) {
        res.status(500).send({ error });
    }
}

// PUT student/student/update/your_document_request_id with bearer token
// {
//   "status": "approved"
// }
// Update document request status
export async function updateDocumentRequestStatus(req, res) {
    try {
        const { documentRequestId } = req.params;
        const { status } = req.body;

        const updatedDocumentRequest = await DocumentRequestModel.findByIdAndUpdate(
            documentRequestId,
            { status },
            { new: true }
        );

        res.status(200).send({ msg: "Document request status updated", updatedDocumentRequest });
    } catch (error) {
        res.status(500).send({ error });
    }
}


// DELETE student/delete/your_document_request_id with bearer token
// Delete document request
export async function deleteDocumentRequest(req, res) {
    try {
        const { documentRequestId } = req.params;

        const deletedDocumentRequest = await DocumentRequestModel.findByIdAndDelete(documentRequestId);

        if (deletedDocumentRequest) {
            res.status(200).send({ msg: "Document request deleted", deletedDocumentRequest });
        } else {
            res.status(404).send({ error: "Document request not found" });
        }
    } catch (error) {
        res.status(500).send({ error });
    }
}