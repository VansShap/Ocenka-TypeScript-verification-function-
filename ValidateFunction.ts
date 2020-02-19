import {isArray, isObject, isString} from "./Utils";
import {validateHeaderValue} from "./Header";
import {validateSidebarValue} from "./Sidebar";
import {validateModelValue} from "./Model";

const ConfigFields: string[] = ["header", "sidebar", "model"];

function validate(global: object): boolean {

    let isValidConfigFields: boolean = validateObjectKeyFields(global, ConfigFields);

    if (isValidConfigFields) {
        let isValidHeaderValue: boolean = validateHeaderValue(global["header"]);
        let isValidSidebarValue: boolean = validateSidebarValue(global["sidebar"]);
        let isValidModelValue: boolean = validateModelValue(global["model"]);
        return isValidHeaderValue && isValidSidebarValue && isValidModelValue;
    }
    else
        return false;
}

function validateObjectKeyFields(object, arrKeyFields: string[], notRequiredFields: string[] = undefined): boolean {
    if (!isObject(object))
        return false;

    let counter: number = 0;
    let addCounter: number = 0;
    let keys: string[] = Object.keys(object);

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
    if ( (counter + addCounter) == keys.length && counter == arrKeyFields.length) {
        return true;
    }
    else {
        return false;
    }
}

function validateValuesOfObjectWithStringValues(object): boolean {
    for (let key in object) {
        if (!isString(object[key]))
            return false;
    }
    return true;
}

export {validate, validateObjectKeyFields, validateValuesOfObjectWithStringValues};
