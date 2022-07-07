const fs = require("fs/promises");
const path = require("path");
const {v4}= require("uuid");

const contactsPath = path.join(__dirname,"db/contacts.json");

const listContacts = async()=> {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}
  
const getContactById = async(id)=> {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === id);
    if(!result){
        return null;
    }
    return result;
}
  
const removeContact = async(id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if(index === -1){
        return null;
    }
    const [removeContact ]= contacts.splice(index,1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removeContact;
}
  
const addContact = async(data) => {
    const contacts = await listContacts();
    const newContact = {id:v4(), ...data};
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}

const updateContact= async(id, data) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if(index === -1){
        return null;
    }
    contacts[index]={id, ...data};
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[index];
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    updateContact,
    addContact,
  };