import {isObject, isString, isArray} from "./Utils";
import {validateObjectKeyFields, validateValuesOfObjectWithStringValues} from "./ValidateFunction";

const ConfigModel: string[] = ["mdl_modelName", "mdl_secondModelName"];

const ModelFields: string[] = ["name", "title", "columns", "layouts"];
const ModelAdditionalFields: string[] = ["commands", "tasks"];

const ModelColumnFields: string[] = ["name", "title",  "type", "model"];// additional field "model" (if type = "link")

const ModelLayoutFields: string[] = ["all", "view"];
const ModelAdditionalLayoutFields: string[] = ["add", "edit"];

function validateModelValue(value): boolean {
    console.log("validateModelValue");
    if (!isObject(value))
        return false;
    if (!validateObjectKeyFields(value, ConfigModel))
        return false;

    for (let i = 0; i < ConfigModel.length; i++) {
        let object = value[ ConfigModel[i] ];
        if (!isObject(object))
            return false;

        let isValidKeyField: boolean = false;
        let isValidValueField : boolean = false;

        isValidKeyField = validateObjectKeyFields(object, ModelFields, ModelAdditionalFields);

        if (!isValidKeyField)
            return false;

        isValidValueField = validateValuesOfModelObject(object);

        if (!isValidValueField)
            return false;
    }
    return true;
}

function validateValuesOfModelObject(object): boolean {
    console.log("validateValuesOfModelObject");
    let isValidName: boolean = isString(object["name"]);
    let isValidTitle: boolean = isString(object["title"]);
    let isValidColumns: boolean = validateValuesOfModelColumnsObject(object["columns"]);
    let isValidLayouts: boolean;
    if (isValidColumns)
        isValidLayouts = validateValuesOfModelLayoutObject(object["layouts"], getNamesFromColumns(object["columns"]));
    let isValidCommands: boolean = true;
    let isValidTasks: boolean = true;

    if (object["commands"] != undefined)
        isValidCommands = validateValuesOfModelCommandsObject(object["commands"]);
    if (object["tasks"] != undefined)
        isValidTasks = validateValuesOfModelTasksObject(object["tasks"]);

    return isValidName && isValidTitle && isValidColumns && isValidLayouts && isValidCommands && isValidTasks;
}

function getNamesFromColumns(array): string[] {
    let arrNames: string[];

    for (let i = 0; i < array.length; i++) {
        let object = array[i];
        arrNames.push(object["name"]);
    }
    return arrNames;
}

function validateValuesOfModelLayoutObject(object, arrStr: string[]): boolean {
    console.log("validateValuesOfModelLayoutObject");
    if (!isObject(object))
        return false;

    let isValidKeyField: boolean = false;
    let isValidValueField : boolean = false;

    isValidKeyField = validateObjectKeyFields(object, ModelLayoutFields, ModelAdditionalFields);

    console.log(object + " is " + isValidKeyField);

    if (!isValidKeyField)
        return false;

    isValidValueField = validateValuesOfModelLayoutFields(object, arrStr);

    if (!isValidValueField)
        return false;

    return true;
}

function validateValuesOfModelLayoutFields(object, arrStr: string[]): boolean {

    for (let key in object) {
        if (!isStringArray(object[key], arrStr))
            return false;
    }
}

function isStringArray(array, arrStr: string[]):boolean {
    console.log("isStringArray");
    if (!isArray(array))
        return false;

    console.log("Array: " + array);
    for (let i = 0; i < array.length; i++) {
        let field: number = arrStr.indexOf(array[i]);
        if (field != -1)
            return false;
    }
    return true;
}

function validateValuesOfModelColumnsObject(array): boolean {
    console.log("validateValuesOfModelColumnsObject");
    if (!isArray(array) || array.length == 0)
        return false;

    let isValidKeyField: boolean = false;
    let isValidValueField : boolean = false;

    for (let i = 0; i < array.length; i++) {
        let object = array[i];

        isValidKeyField = validateValuesOfModelColumnsKeys(object, ModelColumnFields);

        console.log(object + " is " + isValidKeyField);

        if (!isValidKeyField)
            return false;

        isValidValueField = validateValuesOfObjectWithStringValues(object);

        if (!isValidValueField)
            return false;
    }
    return true;
}

function validateValuesOfModelColumnsKeys(object, arrKeyFields: string[]): boolean {
    console.log("validateValuesOfModelColumnsKeys");
    if (!isObject(object))
        return false;

    let counter: number = 0;
    let keys: string[] = Object.keys(object);

    if (keys.indexOf("model") != -1) {
        let type: string = object["type"];
        let model: string = object["model"];
        if (type !== "link" || (ConfigModel.indexOf(model)) == -1 ) {
            return false;
        }
    }

    console.log("Array of keys: " + keys);
    for (let i = 0; i < keys.length; i++) {
        let field: number = arrKeyFields.indexOf(keys[i]);
        if (field != -1)
            counter++;
    }
    console.log("KEY FIELDS ARRAY LENGTH: " + arrKeyFields.length + "  OBJECT KEYS LENGTH: " + keys.length + " COUNTER: " + counter);

    if ( counter == keys.length && counter == arrKeyFields.length) {
        return true;
    }
    else {
        return false;
    }
}

function validateValuesOfModelCommandsObject(object): boolean {
    return true;
}

function validateValuesOfModelTasksObject(object): boolean {
    return true;
}

export {validateModelValue};