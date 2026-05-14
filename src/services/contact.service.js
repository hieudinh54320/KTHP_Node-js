const Contact = require("../models/contact.model");

const createContact = async (data) => {
  return await Contact.create(data);
};

const getContacts = async (userId, keyword) => {
  const query = {
    owner: userId,
  };

  if (keyword) {
    query.fullname = {
      $regex: keyword,

      $options: "i",
    };
  }

  return await Contact.find(query).sort({ createdAt: -1 });
};

module.exports = {
  createContact,
  getContacts,
};
