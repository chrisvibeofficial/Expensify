const userModel = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const firstRandomNum = Math.floor(Math.random() * 1000);
    const secondRandomNum = Math.floor(Math.random() * 100);
    const UID = 'UID' + firstRandomNum + 'BM' + secondRandomNum;
    const { firstName, lastName, email, gender, phoneNumber } = req.body;

    const userData = {
      id: UID,
      firstName,
      lastName,
      email,
      gender,
      phoneNumber
    }

    const newUser = await userModel.create(userData);
    res.status(201).json({
      message: 'User successfully signed in',
      data: newUser
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    })
  }
}


exports.getUsers = async (req, res) => {
  try {
    const allUsers = await userModel.findAll();
    res.status(200).json({
      totalUsers: allUsers.length,
      data: allUsers
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    })
  }
}


exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const checkId = await userModel.findOne({ where: { id: id } });

    if (!checkId) {
      return res.status(404).json('User not found')
    }

    const user = await userModel.findOne({ where: { id: id } });
    res.status(200).json({
      data: user
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    })
  }
}


exports.updateUserPhoneNumber = async (req, res) => {
  try {
    const { id } = req.params;
    const checkId = await userModel.findOne({ where: { id: id } });

    if (!checkId) {
      return res.status(404).json('User not found')
    }

    const { phoneNumber } = req.body;
    const update = { phoneNumber };
    await userModel.update(update, { where: { id: id } });
    res.status(200).json('Phone number updated successfully')
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    })
  }
}


// exports.updateUserPassword = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const checkId = await userModel.findOne({ where: { id: id } });

//     if (!checkId) {
//       return res.status(404).json('User not found')
//     }

//     const { password, confirmPassword } = req.body;
//     const update = { password, confirmPassword };
//     await userModel.update(update, { where: { id: id } });
//     res.status(200).json('Password updated successfully')
//   } catch (error) {
//     res.status(500).json({
//       message: 'Internal server error',
//       error: error.message
//     })
//   }
// }


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const checkId = await userModel.findOne({ where: { id: id } });

    if (!checkId) {
      return res.status(404).json('User not found')
    }

    await userModel.destroy({ where: { id: id } });
    res.status(200).json('Account Deleted Successfully')
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    })
  }
}
