const { addContact } = require("./addContact");
const { deleteContact } = require("./deleteContact");
const { editContact } = require("./editContact");
const { editFavProp } = require("./updateFavProp");
const { getContacts } = require("./getContacts");
const { getById } = require("./getById");

module.exports = {
  addContact,
  deleteContact,
  editContact,
  editFavProp,
  getContacts,
  getById,
};
