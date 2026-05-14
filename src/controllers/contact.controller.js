const Contact = require("../models/contact.model");

const contactService = require("../services/contact.service");

const { contactSchema } = require("../helpers/validate.helper");

const index = async (req, res) => {
  const keyword = req.query.keyword;

  const contacts = await contactService.getContacts(
    req.user.id,

    keyword,
  );

  res.render("contacts/index", {
    contacts,

    keyword,
  });
};

const showCreate = (req, res) => {
  res.render("contacts/create", {
    error: null,
  });
};

const create = async (req, res) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res.render("contacts/create", {
      error: error.details[0].message,
    });
  }

  await contactService.createContact({
    fullname: req.body.fullname,

    phone: req.body.phone,

    email: req.body.email,

    address: req.body.address,

    owner: req.user.id,
  });

  res.redirect("/contacts");
};

const showEdit = async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  res.render("contacts/edit", {
    contact,

    error: null,
  });
};

const update = async (req, res) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    const contact = await Contact.findById(req.params.id);

    return res.render("contacts/edit", {
      contact,

      error: error.details[0].message,
    });
  }

  await Contact.findByIdAndUpdate(
    req.params.id,

    {
      fullname: req.body.fullname,

      phone: req.body.phone,

      email: req.body.email,

      address: req.body.address,
    },
  );

  res.redirect("/contacts");
};

const remove = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);

  res.redirect("/contacts");
};

module.exports = {
  index,
  showCreate,
  create,
  showEdit,
  update,
  remove,
};
