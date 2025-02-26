import { userdb } from '../models/userModel.js'; 
import { projectdb } from '../models/projectModel.js'; 
import {mentordb} from '../models/projectMentorModel.js';
const getMentorProjects = async (req, res) => {
    try {
        const { email } = req.params; 
        const mentor = await userdb.findOne({ email }, { _id: 1 });
        if (!mentor) {
            return res.status(404).json({ error: 'Mentor not found' });
        }
        const mentorId = mentor._id.toString(); 
        const projects = await mentordb.find({ mentorId: mentorId, status: "approved" });
        if (!projects || projects.length === 0) {
            return res.status(404).json({ error: 'Projects not found' });
        }
        const projectIds = projects.map(project => project.projectId.toString());
        const mentorProjects = await projectdb.find({ _id: { $in: projectIds } });
        res.status(200).json(mentorProjects); 
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};


const getProjectDetailsByName = async (req, res) => {
    try {
        const { name } = req.params;
        const project = await projectdb.findOne({ name});
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        const student = await userdb.findOne({ _id: project.student });
        if (!student) {
            return res.status(404).json({ error: 'Student not found for the project' });
        }
        const projectDetails = {
            ...project.toObject(),
            studentEmail: student.email
        };

        res.status(200).json(projectDetails); 
    } catch (error) {
        console.error('Error fetching project details:', error);
        res.status(500).json({ error: 'Failed to fetch project details' });
    }
};  



const getStudentProjects = async (req, res) => {
    try {
        const { email } = req.params; 
        const student = await userdb.findOne({ email }, { _id: 1 });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        } else {
            const studentId = student._id; 
            const projects = await projectdb.find({ student: studentId });
            return res.status(200).json(projects); 
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

const getProjectsByTechnology = async (req, res) => {
    try {
        const {technology} = req.body;
        const projects = await projectdb.find({ technology });
        if (projects.length === 0) {
            return res.status(404).json({ error: 'No projects found with the specified technology' });
        }
      return  res.status(201).json(projects);
    } catch (error) {
        console.error('Error fetching projects by technology:', error);
        res.status(500).json({ error: 'Failed to fetch projects by technology' });
    }
};

const addProject = async (req, res) => {
    try {
        const { name, userStory, technology } = req.body; 
        const { email } = req.params;

        if (!name || !userStory || !technology ) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        const student = await userdb.findOne({ email });
        if (!student) {
            return res.status(404).json({ error: 'Student  not found' });
        }
        const newProject = new projectdb({
            name,
            userStory,
            technology,
            student: student._id ,
        });
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ error: 'Failed to add project' });
    }
};

const updateProject = async (req, res) => {
    try {
        const { name, userStory, technology,updatedName } = req.body;
        const updatedProject = await projectdb.findOne(  {name} );
        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        updatedProject.name=updatedName;
        updatedProject.userStory=userStory;
        updatedProject.technology=technology;

       const upt= await updatedProject.save();
    
        res.status(200).json(upt);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Failed to update project' });
    }
};
const deleteProject = async (req, res) => {
    try {
        const { name } = req.body;
        const project = await projectdb.findOne({ name });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const projectId = project._id;
        await mentordb.deleteMany({ projectId :projectId});
        await projectdb.deleteOne({ _id: projectId });
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
};


const requestProject= async (req, res) => {
try{
const {name}=req.body;
const {email}=req.params;
const mentor = await userdb.findOne({ email });
if (!mentor) {
    return res.status(404).json({ error: 'Mentor not found' });
}
const project=await projectdb.findOne({name});
if(!project){
    return res.status(404).json({ error: 'Project not found' });

}
const projectId=project._id;
const mentorId=mentor._id;
const projectFound=await mentordb.findOne({projectId,mentorId});
if(projectFound){
    return res.status(200).json({success: 'Project already requested' });
}
const projMent= new mentordb({
projectId,
mentorId,
status:"pending"
});
const savedProject = await projMent.save();
res.status(200).json({success:'Request Sended Successfully'});
}
catch (error) {
    console.error('Error requesting project:', error);
    res.status(500).json({ error: 'Failed to request a project' });
}



}
;
const getAllProjects = async (req, res) => {
    try {
      const projects = await projectdb.find();
      if (projects.length === 0) {
        return res.status(404).json({ error: "No projects found" });
      }
      return res.status(201).json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  };
const approveproject = async (req, res) => {

try{
    const {name,email}=req.body;
    const mentor = await userdb.findOne({ email });
    if (!mentor) {
        return res.status(404).json({ error: 'Mentor not found' });
    }
    const project=await projectdb.findOne({name});
    if(!project){
        return res.status(404).json({ error: 'Project not found' });
    
    }
    const projectId=project._id;
    const mentorId=mentor._id;
    const projMent=await mentordb.findOne({projectId,mentorId});
    projMent.status="approved";
    const proj= projMent.save();
    res.status(201).json(proj);

}
catch (error) {
    console.error('Error approving request of a  project:', error);
    res.status(500).json({ error: 'Failed to approver the request of a project' });
}



}
;

const getProjMentors = async (req, res) => {
    try {
        const { name } = req.params;
        const project = await projectdb.findOne({ name });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const projectId = project._id;
        const mentors = await mentordb.find({ projectId, status: "approved" });
        if (!mentors || mentors.length === 0) {
            return res.status(404).json({ error: 'Mentors not found' });
        }
        const mentorIds = mentors.map(mentor => mentor.mentorId);
        const mentorEmails = await userdb.find({ _id: { $in: mentorIds } }, { email: 1 });
        if (!mentorEmails || mentorEmails.length === 0) {
            return res.status(404).json({ error: 'Mentor emails not found' });
        }
        res.json(mentorEmails.map(mentor => mentor.email));
    } catch (error) {
        console.error('Error fetching project mentors:', error);
        res.status(500).json({ error: 'Failed to fetch project mentors' });
    }
};

const getprojectpendingrequest = async(req,res)=>{
    try {
        const { name } = req.params;
        const project = await projectdb.findOne({ name });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const projectId = project._id;
        const mentors = await mentordb.find({ projectId, status: "pending" });
        if (!mentors || mentors.length === 0) {
            return res.status(404).json({ error: 'Mentors not found' });
        }
        const mentorIds = mentors.map(mentor => mentor.mentorId);
        const mentorEmails = await userdb.find({ _id: { $in: mentorIds } }, { email: 1 });
        if (!mentorEmails || mentorEmails.length === 0) {
            return res.status(404).json({ error: 'Mentor emails not found' });
        }
        res.json(mentorEmails.map(mentor => mentor.email));
    } catch (error) {
        console.error('Error fetching project mentors:', error);
        res.status(500).json({ error: 'Failed to fetch project mentors' });
    }
};
const getPendingMentorsForStudent = async (req, res) => {
    try {
        const { email } = req.params;
        const student = await userdb.findOne({ email });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const userId = student._id;
        const userProjects = await projectdb.find({ student: userId });

        if (!userProjects || userProjects.length === 0) {
            return res.status(404).json({ error: 'Projects not found for the user' });
        }

        const pendingMentors = [];
        for (const project of userProjects) {
            const mentors = await mentordb.find({ projectId: project._id, status: "pending" });
            if (mentors && mentors.length > 0) {
                for (const mentor of mentors) {
                    const mentorUser = await userdb.findOne({ _id: mentor.mentorId });
                    if (mentorUser) {
                        pendingMentors.push({ projectName: project.name, mentorEmail: mentorUser.email });
                    }
                }
            }
        }

        if (pendingMentors.length === 0) {
            return res.status(404).json({ error: 'No pending mentors found for the user' });
        }

        res.json(pendingMentors);
    } catch (error) {
        console.error('Error fetching pending mentors for user:', error);
        res.status(500).json({ error: 'Failed to fetch pending mentors for user' });
    }
};

const getprojByName =async(req,res)=>{
    try{
        const { name } = req.params;
        const project = await projectdb.findOne({ name });
    
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
      return res.status(200).json(project);
    }
    catch (error) {
            console.error('Error fetching project details', error);
            res.status(500).json({ error: 'Failed to fetch project details' });
        }
    
     }
 export{getAllProjects as getAllProjects};
export {getprojByName as getprojByName};
export{getProjectDetailsByName as getProjectDetailsByName};
export{getPendingMentorsForStudent as getPendingMentorsForStudent};
export {getprojectpendingrequest as getprojectpendingrequest};
export {getProjMentors as getProjMentors };
export {approveproject as approveproject};
export{requestProject as requestProject};
export { addProject as addProject };
export {deleteProject as deleteProject};
export {updateProject as updateProject};
export { getMentorProjects as getMentorProjects};
export { getStudentProjects as getStudentProjects};
export { getProjectsByTechnology as getProjectsByTechnology};