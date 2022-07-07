// const yargs = require("yargs");
// const {hideBin} = require("yargs/helpers");

const contactsOperations = require('./contacts');

const invokeAction = async({action, id, data})=>{
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
            const newContact = await contactsOperations.addContact(data);
            console.log(newContact);
            break;
        case "updateById":
            const updateContact = await contactsOperations.updateContact(id, data);
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

const argv = require('yargs').argv;
// const arr = hideBin(process.argv);
// const {argv} = yargs(arr);

invokeAction(argv);



// invokeAction({action:"list"});

// const id = "7";

// invokeAction({action:"getById", id});

// const newContactData = {
//     name: 'Anna Kucherenko',
//     email: 'anna@gmail.com',
//     phone: '(073) 206-2525'
// }

// invokeAction({action:"add", data:newContactData});

// const updateId = "7274d648-9a1e-4f9a-b8da-fb4c420a52e5";

// const updateContact = {
//     name: 'Anna Kucherenko',
//     email: 'ann123@gmail.com',
//     phone: '(073) 206-2525'
// }

// invokeAction({action:"updateById", id:updateId,  data:updateContact});

// const removeId = "10";

// invokeAction({action:"removeById", id:removeId});