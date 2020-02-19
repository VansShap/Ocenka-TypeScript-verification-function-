import {isObject, isString, isArray} from "./Utils";
import {validateObjectKeyFields, validateValuesOfObjectWithStringValues} from "./ValidateFunction";

const ConfigModel: string[] = ["mdl_modelName", "mdl_secondModelName"];

const ModelFields: string[] = ["name", "title", "columns", "layouts"];
const ModelAdditionalFields: string[] = ["commands", "tasks"];

const ModelColumnFields: string[] = ["name", "title",  "type", "model"];// additional field "model" (if type = "link")

const ModelLayoutFields: string[] = ["all", "view"];
const ModelAdditionalLayoutFields: string[] = ["add", "edit"];

function validateModelValue(value): boolean {
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
    let isValidName: boolean = isString(object["name"]);
    let isValidTitle: boolean = isString(object["title"]);
    let isValidColumns: boolean = validateValueOfColumnsField(object["columns"]);
    let isValidLayouts: boolean;
    if (isValidColumns)
        isValidLayouts = validateValueOfLayoutField(object["layouts"], getNamesFromColumns(object["columns"]));
    let isValidCommands: boolean = true;
    let isValidTasks: boolean = true;

    if (object["commands"] != undefined)
        isValidCommands = validateValueOfCommandsField(object["commands"]);
    if (object["tasks"] != undefined)
        isValidTasks = validateValueOfTasksField(object["tasks"]);

    return isValidName && isValidTitle && isValidColumns && isValidLayouts && isValidCommands && isValidTasks;
}

//get array of Columns "names"
function getNamesFromColumns(array): string[] {
    let arrNames: string[] = [];

    for (let i = 0; i < array.length; i++) {
        let object = array[i];
        arrNames.push(object["name"]);
    }
    return arrNames;
}

//check "columns" field value
function validateValueOfColumnsField(array): boolean {
    if (!isArray(array) || array.length == 0)
        return false;

    let isValidKeyField: boolean = false;
    let isValidValueField : boolean = false;

    for (let i = 0; i < array.length; i++) {
        let object = array[i];

        isValidKeyField = validateKeysOfColumnsValue(object, ModelColumnFields);

        if (!isValidKeyField)
            return false;

        isValidValueField = validateValuesOfObjectWithStringValues(object);

        if (!isValidValueField)
            return false;
    }
    return true;
}

//check key fields in object is stored by field "columns"
function validateKeysOfColumnsValue(object, arrKeyFields: string[]): boolean {
    if (!isObject(object))
        return false;

    let counter: number = 0;
    let keys: string[] = Object.keys(object);
    let keyFieldsArrayLength: number = arrKeyFields.length;

    if (keys.indexOf("model") != -1) {
        let type: string = object["type"];
        let model: string = object["model"];
        if (type !== "link" || (ConfigModel.indexOf(model)) == -1 ) {
            return false;
        }
    }
    else {
        keyFieldsArrayLength--;
    }

    for (let i = 0; i < keys.length; i++) {
        let field: number = arrKeyFields.indexOf(keys[i]);
        if (field != -1)
            counter++;
    }

    if ( counter == keys.length && counter == keyFieldsArrayLength) {
        return true;
    }
    else {
        return false;
    }
}

//check "layouts" field value
function validateValueOfLayoutField(object, arrStr: string[]): boolean {
    if (!isObject(object))
        return false;

    let isValidKeyField: boolean = false;
    let isValidValueField : boolean = false;

    isValidKeyField = validateObjectKeyFields(object, ModelLayoutFields, ModelAdditionalLayoutFields);

    if (!isValidKeyField)
        return false;

    isValidValueField = validateValuesOfLayoutObject(object, arrStr);

    if (!isValidValueField)
        return false;

    return true;
}

//check values are stored in "layouts" fields (all, view, add, edit)
function validateValuesOfLayoutObject(object, arrStr: string[]): boolean {
    for (let key in object) {
        if (!isStringArray(object[key], arrStr))
            return false;
    }
    return true;
}

//check strings are stored in fields "all, view, add, edit"
function isStringArray(array, arrStr: string[]):boolean {
    if (!isArray(array) || array.length == 0)
        return false;

    for (let i = 0; i < array.length; i++) {
        let field: number = arrStr.indexOf(array[i]);
        if (field == -1)
            return false;
    }
    return true;
}

//check "commands" field value
function validateValueOfCommandsField(object): boolean {
    return true;
}

//check "tasks" field value
function validateValueOfTasksField(object): boolean {
    return true;
}

export {validateModelValue};
