import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema({
    name: { type: String, required: true ,unique:true},
    userStory: { type: String, required: true },
    technology: { type: String ,required: true },
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});
const projectModel = mongoose.model('Project', projectSchema);
export { projectModel as projectdb};
