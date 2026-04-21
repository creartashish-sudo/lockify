const Document = require('../Models/Document');

// GET document details
const getDocument = async (req, res) => {

    try{
        const document = await Document.find({ userId: req.params.userId });
        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found',
            });
        }
        res.status(200).json({
            success: true,
            data: document,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// INSERT new document
const insertDocument = async (req, res) => {
    try {
        const document = new Document({
            ...req.body,
            photo: req.file.filename
          });
        await document.save();
        res.status(201).json({
            success: true,
            message: 'Document created successfully',
            data: document,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE document details
const updateDocument = async (req, res) => {
    try {
      
  
      const updateData = {
        ...req.body,
      };
  
      if (req.body.photo != "undefined") {
        updateData.photo = req.file.filename;
      }else{
        delete updateData.photo;
      }
  
      const document = await Document.findOneAndUpdate(
        { _id: req.body.id },
        updateData,
        { new: true }
      );
  
      if (!document) {
        return res.status(404).json({
          success: false,
          message: "Document not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Document updated successfully",
        data: document,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  
// DELETE document
const deleteDocument = async (req, res) => {
    try {
        const document = await Document.findByIdAndDelete(req.params.id);
        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Document deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
module.exports = { getDocument, insertDocument, updateDocument, deleteDocument };