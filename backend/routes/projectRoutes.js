import express from 'express';
import { 
 getMentorProjects,getStudentProjects,
 addProject,updateProject,getProjectsByTechnology,requestProject,approveproject,deleteProject,getProjMentors,getprojectpendingrequest,
 getPendingMentorsForStudent,getProjectDetailsByName,getprojByName,getAllProjects
} from '../controllers/projectController.js';

const router = express.Router();
router.get('/pendreq/:email',getPendingMentorsForStudent)//get pending req against student mail
router.get('/pendingreq/:name',getprojectpendingrequest);//gettin pending req against proj name
router.get('/projment/:name',getProjMentors);//approved mentors of a project
router.put('/approve',approveproject);//
router.delete('/delete',deleteProject);//
router.get('/getprojdetailbyname/:name',getProjectDetailsByName);
router.get('/mentorprojects/:email', getMentorProjects);//all mentor project which mentor is a part of
router.post('/request/:email',requestProject);//
router.get('/studentprojects/:email', getStudentProjects);//all students project
router.post('/addProject/:email',addProject);//
router.put('/updateProject',updateProject)//
router.get('/getprojectbytech',getProjectsByTechnology);//
router.get('/getProjByName/:name',getprojByName);//
router.get("/getAllProj", getAllProjects); //
export default router;
