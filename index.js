import {  getContacts } from "./scripts/services/contacts-services.js";
import { login, logout } from "./scripts/services/sessions-service.js";

login({email: "fabio@mail.com", password:"123456"})

console.log(getContacts())
