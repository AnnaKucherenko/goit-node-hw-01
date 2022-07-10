const yargs = require("yargs");
const {hideBin} = require("yargs/helpers");

const contactsOperations = require('./contacts');

const invokeAction = async({action, id, name, email, phone})=>{
    switch(action){
        case "list":
            const contacts = await contactsOperations.listContacts();
            console.table(contacts);
            break;
        case "getById":
            const contact = await contactsOperations.getContactById(id);
            if(!contact){
                throw new Error(`Contact with id=${id} not found`)
            }
            console.log(contact);
            break;
        case "add":
            const newContact = await contactsOperations.addContact(name, email, phone);
            console.log(newContact);
            break;
        case "updateById":
            const updateContact = await contactsOperations.updateContact(id, name, email, phone);
            if(!updateContact){
                throw new Error(`Contact with id=${id} not found`)
            }
            console.log(updateContact);
            break;
        case "removeById":
            const removeContact = await contactsOperations.removeContact(id);
            console.log(removeContact);
            break;
        default:
            console.log("Unknown action")
    }
}

const arr = hideBin(process.argv);
const {argv} = yargs(arr);

invokeAction(argv)
.then(respons=>console.log(respons))
.catch(err=>console.log(err.message));


