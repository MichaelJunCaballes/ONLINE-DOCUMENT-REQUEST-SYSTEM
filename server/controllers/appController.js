import UserModel from '../model/User.model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js'
import otpGenerator from 'otp-generator';

/** middleware for verify user */
export async function verifyUser(req, res, next){
    try {
        
        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        if(!exist) return res.status(404).send({ error : "Can't find User!"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}


/** POST: http://localhost:8080/student/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;

        // Check the existing user
        const existUsername = UserModel.findOne({ username }).exec();
        const existEmail = UserModel.findOne({ email }).exec();

        const [existingUsername, existingEmail] = await Promise.all([
            existUsername,
            existEmail
        ]);

        if (existingUsername) {
            throw { error: "Please use a unique username" };
        }

        if (existingEmail) {
            throw { error: "Please use a unique email" };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const student = new UserModel({
            username,
            password: hashedPassword,
            profile: profile || "",
            email,
        });

        // Save the user to the database
        const result = await student.save();

        res.status(201).send({ msg: "User registered successfully" });
    } catch (error) {
        res.status(500).send({ error });
    }
}

/** POST: http://localhost:8080/student/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req, res) {
    const { username, password } = req.body;

    try {
        console.log("Login Request Received");
        const user = await UserModel.findOne({ username });

        if (!user) {
            console.log("User not found:", username);
            return res.status(404).send({ error: "Username not found" });
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) {
            console.log("Invalid password for user:", username);
            return res.status(400).send({ error: "Invalid password" });
        }

        // create jwt token
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
            },
            ENV.JWT_SECRET,
            { expiresIn: "24h" }
        );

        console.log("Login Successful for user:", username);
        return res.status(200).send({
            msg: "Login Successful...!",
            username: user.username,
            token,
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}


/** GET: http://localhost:8080/student/user/example123 */
export async function getUser(req, res) {
    const { username } = req.params;

    try {
        if (!username) {
            return res.status(501).send({ error: "Invalid Username" });
        }

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(501).send({ error: "Couldn't Find the User" });
        }

        // Remove sensitive data like password before sending the response
        const { password, ...rest } = user.toObject();

        return res.status(201).send(rest);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}



/** PUT: http://localhost:8080/student/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) {
    try {
        const { userId } = req.user;

        if (userId) {
            const body = req.body;

            // update the data
            const updatedUser = await UserModel.findByIdAndUpdate(userId, body, { new: true });

            if (updatedUser) {
                // `updatedUser` contains the document after the update
                return res.status(201).send({ msg: "Record Updated...!" });
            } else {
                return res.status(404).send({ error: "No records updated" });
            }
        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}




/** GET: http://localhost:8080/student/generateOTP */
export async function generateOTP(req,res){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({ code: req.app.locals.OTP })
}


/** GET: http://localhost:8080/student/verifyOTP */
export async function verifyOTP(req,res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}


// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/student/createResetSession */
export async function createResetSession(req,res){
   if(req.app.locals.resetSession){
        return res.status(201).send({ flag : req.app.locals.resetSession})
   }
   return res.status(440).send({error : "Session expired!"})
}


// update the password when we have valid session
/** PUT: http://localhost:8080/student/resetPassword */
export async function resetPassword(req, res) {
    try {
        if (!req.app.locals.resetSession) {
            return res.status(440).send({ error: "Session expired!" });
        }

        const { username, password } = req.body;

        try {
            const user = await UserModel.findOne({ username });

            if (!user) {
                return res.status(404).send({ error: "Username not Found" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await UserModel.updateOne(
                { username: user.username },
                { password: hashedPassword }
            );

            req.app.locals.resetSession = false; // reset session
            return res.status(201).send({ msg: "Record Updated...!" });
        } catch (error) {
            return res.status(500).send({ error: "Unable to reset password" });
        }
    } catch (error) {
        return res.status(401).send({ error });
    }
}

/** DELETE: http://localhost:8080/student/deleteuser 
 * @param: {
  "header" : "<token>"
}
*/
export async function deleteUser(req, res) {
    try {
        const { userId } = req.user;

        if (userId) {
            // delete the user
            const deletedUser = await UserModel.findByIdAndDelete(userId);

            if (deletedUser) {
                // `deletedUser` contains the document before deletion
                return res.status(201).send({ msg: "User Deleted...!" });
            } else {
                return res.status(404).send({ error: "No user found for deletion" });
            }
        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

/** GET: http://localhost:8080/student/allusers */
export async function getAllUsers(req, res) {
    try {
        const users = await UserModel.find({}, { password: 0 }); // Exclude the password field

        if (!users || users.length === 0) {
            return res.status(404).send({ error: "No users found" });
        }

        // Exclude sensitive data like password before sending the response
        const sanitizedUsers = users.map(user => {
            const { password, ...rest } = user.toObject();
            return rest;
        });

        return res.status(200).send(sanitizedUsers);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}