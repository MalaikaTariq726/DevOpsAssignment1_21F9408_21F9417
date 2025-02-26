import { userdb } from '../models/userModel.js'; 
const getMentor=async(req,res)=>{
    try {
        const mentor = await userdb.find({role:"Mentor"});
        if (!mentor) {
            return res.status(404).json({ error: 'Mentor not found' });
        }
        res.status(200).json(mentor); 
    } catch (error) {
        console.error('Error fetching Mentor:', error);
        res.status(500).json({ error: 'Failed to fetch Mentor' });
    }
    
};

const getStudent=async(req,res)=>{
    try {
        const student = await userdb.find({role:"Student"});
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(student); 
    } catch (error) {
        console.error('Error fetching Student:', error);
        res.status(500).json({ error: 'Failed to fetch Student' });
    }
    
};

const requestApproval = async (req, res) => {
    const { email } = req.body;
    try {
      let stat = "Approved";
      const user = await userdb.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      user.status = stat;
      const updatedUser = await user.save();
  
      return res.status(200).json({ result: updatedUser });
    } catch (error) {
      console.error("Error updating user role:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
export {requestApproval as requestApproval};
export{getMentor as getMentor};
export {getStudent as getStudent};