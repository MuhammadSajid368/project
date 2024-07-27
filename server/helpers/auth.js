import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if(err){
                reject(err)    
            }
            bcrypt.hash(password, salt, (err, hash)=>{
                if(err){
                    reject(err)    
                }
                resolve(hash);
            });
        });
    });
};

export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}


export const verifyPassword = async (password, hashedPassword) => {
    try {
      // Compare the provided password with the hashed password
      const match = await bcrypt.compare(password, hashedPassword);
      return match; // Return true if passwords match, false otherwise
    } catch (error) {
      console.error("Error verifying password:", error);
      return false; // Return false in case of any error
    }
  };