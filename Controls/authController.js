const admins = require("../Models/model");

// bcryptr is used to hashing our password
const bcrypt = require("bcrypt");
// this is a token used for authentication and autherisation
const jwt = require("jsonwebtoken");

// authentication  means the process of  login but autherisation means what permition user get is he an admin or not

// register

const register = async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const passwords = req.body.password;
    const isAdmin = req.body.isAdmin;

    const isExisting = await admins.findOne({ email });

    if (isExisting) {
      res.status(401).json("Already Such account with this email");
    } else {
      //  This method takes first argument as a plain text and the second argument as a salt string and it returns a hash value with salt string

      // Salts create unique passwords even in the instance of two users choosing the same passwords. Salts help us mitigate hash table attacks by forcing attackers to re-compute them using the salts for each user.
      const hashedpassword = await bcrypt.hash(passwords, 10);

      // pinna namukk egene value(req.body.usename) egane alla value kodukunnathin pakaram
      // we can use ...req.body(by spreading the value egane koduthaal alla value kittum)
      let newUser = new admins({
        username,
        email,
        isAdmin,
        // here in the password section we are re-assigning password with hashed password
        password: hashedpassword,
      });

      //password userkk kaanikand nikkanam so we are destructuring the value
      //It destructures the newUser object, excluding the password field. The password is not included in the response for security reasons.
      const { password, ...others } = newUser._doc;

      // adding token

      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      //the kayijttt namukk save cheyyanam ennit venam data send cheyyan
      newUser.save();
      // nammale bakki ullaa data full others verum athinte koode tokenum indakum
      //others enna object akath bakki data pokum
      res.status(200).json({ others, token });
    }
  } catch (error) {
    res.status(500).json("connection error", error);
  }
};

///login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check whether email and password fields are empty
    if (!email || !password) {
      res.status(400).json("All datas are required");
    } else {
      const user = await admins.findOne({ email });

      // Check if user with the provided email exists
      if (user) {
        // Compare the entered password with the hashed password in the database
        const comparePass = await bcrypt.compare(password, user.password);

        if (comparePass) {
          // If passwords match, create and send a JWT token
          const { password, ...others } = user._doc;

          const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );

          res
            .status(200)
            .json({ message: "Login success", user: others, token });
        } else {
          res.status(400).json("User credentials are wrong");
        }
      } else {
        res.status(404).json("User not found");
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Connection error", error: error.message });
  }
};

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   // Check whether email and password fields are empty
//   if (!email || !password) {
//     res.status(400).json("All data are required");
//   } else {
//     try {
//       // Find the user by email in the database
//       const user = await admins.findOne({ email });

//       if (user) {
//         // Compare the entered password with the hashed password in the database
//         const comparePass = await bcrypt.compare(password, user.password);

//         if (comparePass) {
//           // If passwords match, create and send a JWT token
//           const { password, ...others } = user._doc;

//           const token = jwt.sign(
//             { id: user._id, isAdmin: user.isAdmin },
//             process.env.JWT_SECRET,
//             {
//               expiresIn: "1h",
//             }
//           );

//           res.status(200).json({ others, token });
//         } else {
//           res.status(400).json("User credentials are wrong");
//         }
//       } else {
//         res.status(404).json("Incorrect email or password");
//       }
//     } catch (error) {
//       res.status(500).json("Connection error");
//     }
//   }
// };
module.exports = {
  register,
  login,
};
