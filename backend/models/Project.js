const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    status:{
        type: String,
        enum: ["ASSIGNED", "UNASSIGNED", "IN_PROGRESS", "COMPLETED"]
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    }
})

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema)

module.exports = Project