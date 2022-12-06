//import mongoose from 'mongoose';
const User = require('./users.mongo.js');

/**
 * takes the users id and returns the user object
 *
 * @param {*} id - the users id
 */
const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Takes the user object passed in from the controller and adds it to the database
 * used by the register controller
 * @param {*} user
 * @return {*}
 */
const createUser = async (user) => {
  try {
    const response = await User.create(user);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Takes the user id and the user object and updates the user in the database
 *
 * @param {*} id
 * @param {*} user
 * @return {*}
 */
const updateUser = async (id, user) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    });
    if (updatedUser === null) throw new Error('User not found');

    return updatedUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Takes the user id and deletes the user from the database
 *
 * @param {*} id
 * @return {*}
 */
const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser === null) throw new Error('User not found');
    return deletedUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Takes the user id and returns the users contacts array
 *
 * @param {*} id - the users id
 */
const getUserContacts = async (id) => {
  try {
    const user = await getUserById(id);
    if (user) {
      return user.contacts;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createContact = async (id, contact) => {
  try {
    const user = await getUserById(id);
    if (user !== null) {
      user.contacts.push(contact);
      await user.save();
      return user.contacts;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteContact = async (id, contactId) => {
  try {
    const user = await getUserById(id);
    if (user) {
      const contacts = user.contacts.filter((contact) => {
        return contact._id.toString() !== contactId;
      });
      user.contacts = contacts;
      await user.save();
      return user.contacts;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getUserById,
  getUserContacts,
  createUser,
  updateUser,
  deleteUser,
  createContact,
  deleteContact,
};
