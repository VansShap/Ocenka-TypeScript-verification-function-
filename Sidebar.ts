import {isObject, isArray, isString} from "./Utils"
import {validateObjectKeyFields, validateValuesOfObjectWithStringValues} from "./ValidateFunction"

const ConfigSidebar: string[] = ["sdbr_CA", "sdbr_admin"];

const SidebarFields: string[] = ["text", "content"];

const SidebarContentFields: string[] = ["text", "action", "tabName"];

function validateSidebarValue(value): boolean {
    console.log("validateSidebarValue");
    if (!isObject(value))
        return false;
    if (!validateObjectKeyFields(value, ConfigSidebar))
        return false;

    for (let i = 0; i < ConfigSidebar.length; i++) {
        let array = value[ ConfigSidebar[i] ];
        if (!isArray(array) || array.length == 0)
            return false;

        let isValidKeyField: boolean = false;
        let isValidValueField : boolean = false;
        for (let i = 0; i < array.length; i++) {
            let object = array[i];

            isValidKeyField = validateObjectKeyFields(object, SidebarFields);

            if (!isValidKeyField)
                return false;

            isValidValueField = validateValuesOfSidebarObject(object);

            if (!isValidValueField)
                return false;
        }
    }
    return true;
}

function validateValuesOfSidebarObject(object): boolean {
    console.log("validateValuesOfSidebarObject");
    return isString(object["text"]) && validateValuesOfSidebarContentObject(object["content"]);
}

function validateValuesOfSidebarContentObject(array): boolean {
    console.log("validateValuesOfSidebarContentObject");
    if (!isArray(array) || array.length == 0)
        return false;

    let isValidKeyField: boolean = false;
    let isValidValueField : boolean = false;

    for (let i = 0; i < array.length; i++) {
        let object = array[i];

        isValidKeyField = validateObjectKeyFields(object, SidebarContentFields);

        console.log(object + " is " + isValidKeyField);

        if (!isValidKeyField)
            return false;

        isValidValueField = validateValuesOfObjectWithStringValues(object);

        if (!isValidValueField)
            return false;
    }
    return true;
}

export {validateSidebarValue};