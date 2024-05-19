const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    titre:{type: String},
    sender:{type: String},
    description:{type: String},
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    file_path: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const FileModel = mongoose.model('File', fileSchema);
module.exports = FileModel