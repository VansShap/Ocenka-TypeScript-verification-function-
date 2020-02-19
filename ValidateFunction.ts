import {isArray, isObject, isString} from "./Utils";
import {validateHeaderValue} from "./Header";
import {validateSidebarValue} from "./Sidebar";
import {validateModelValue} from "./Model";

const ConfigFields: string[] = ["header", "sidebar", "model"];

function validate(global: object): boolean {

    let isValidConfigFields: boolean = validateObjectKeyFields(global, ConfigFields);

    if (isValidConfigFields) {
        //let isValidHeaderValue: boolean = validateHeaderValue(global["header"]);
        //let isValidSidebarValue: boolean = validateSidebarValue(global["sidebar"]);
        let isValidModelValue: boolean = validateModelValue(global["model"]);
        console.log(isValidModelValue);
        return isValidModelValue;
    }
    else
        return false;
}

function validateObjectKeyFields(object, arrKeyFields: string[], notRequiredFields: string[] = undefined): boolean {
    console.log("validateObjectKeyFields");
    if (!isObject(object))
        return false;

    let counter: number = 0;
    let addCounter: number = 0;
    let keys: string[] = Object.keys(object);

    console.log("Array of keys: " + keys);
    for (let i = 0; i < keys.length; i++) {
        let field: number = arrKeyFields.indexOf(keys[i]);
        if (field != -1)
            counter++;
        else
            if ((typeof  notRequiredFields) !== "undefined") {
            field = notRequiredFields.indexOf(keys[i]);
            if (field != -1)
                addCounter++;
        }
    }
    console.log("KEY FIELDS ARRAY LENGTH: " + arrKeyFields.length + "  OBJECT KEYS LENGTH: " + keys.length + " COUNTER: " + counter + " AddCOUNTER: " + addCounter);

    if ( (counter + addCounter) == keys.length && counter == arrKeyFields.length) {
        return true;
    }
    else {
        return false;
    }
}

function validateValuesOfObjectWithStringValues(object): boolean {
    console.log("validateValuesOfObjectWithStringValues");
    for (let key in object) {
        console.log(object + " has valid field" + key + " - " + isString(object[key]));
        if (!isString(object[key]))
            return false;
    }
    return true;
}

export {validate, validateObjectKeyFields, validateValuesOfObjectWithStringValues};