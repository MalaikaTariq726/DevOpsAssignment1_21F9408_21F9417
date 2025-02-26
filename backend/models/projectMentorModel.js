import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectMentorSchema = new Schema({
    projectId:{type:Schema.Types.ObjectId,ref :'Project',required:true},
    mentorId: { type: Schema.Types.ObjectId, ref: 'User',required: true },
    
    status:{type:String,required:true},
});
const projectMentorModel = mongoose.model('ProjectMentor', projectMentorSchema);
export { projectMentorModel as mentordb };
