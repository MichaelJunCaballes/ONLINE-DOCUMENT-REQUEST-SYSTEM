import DocumentModel from '../model/document.model.js';

export async function createDocument(req, res) {
    try {
        const { studentId, documentType, content } = req.body;

        const document = new DocumentModel({
            studentId,
            documentType,
            content,
            // Add other fields as needed
        });

        const result = await document.save();

        res.status(201).send({ msg: "Document created successfully", result });
    } catch (error) {
        res.status(500).send({ error });
    }
}

export async function getAllDocuments(req, res) {
    try {
        const documents = await DocumentModel.find();

        res.status(200).send({ documents });
    } catch (error) {
        res.status(500).send({ error });
    }
}

export async function getDocumentById(req, res) {
    try {
        const { documentId } = req.params;

        const document = await DocumentModel.findById(documentId);

        if (document) {
            res.status(200).send({ document });
        } else {
            res.status(404).send({ error: "Document not found" });
        }
    } catch (error) {
        res.status(500).send({ error });
    }
}

export async function updateDocument(req, res) {
    try {
        const { documentId } = req.params;
        const updateData = req.body;

        const updatedDocument = await DocumentModel.findByIdAndUpdate(
            documentId,
            updateData,
            { new: true }
        );

        res.status(200).send({ msg: "Document updated", updatedDocument });
    } catch (error) {
        res.status(500).send({ error });
    }
}

export async function deleteDocument(req, res) {
    try {
        const { documentId } = req.params;

        const deletedDocument = await DocumentModel.findByIdAndDelete(documentId);

        if (deletedDocument) {
            res.status(200).send({ msg: "Document deleted", deletedDocument });
        } else {
            res.status(404).send({ error: "Document not found" });
        }
    } catch (error) {
        res.status(500).send({ error });
    }
}