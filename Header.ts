import {validateObjectKeyFields, validateValuesOfObjectWithStringValues} from "./ValidateFunction"
import {isArray} from "./Utils";

const HeaderFields: string[] = ["header_name", "header_tag"];

function validateHeaderValue(value): boolean {
    if (!isArray(value) || value.length == 0)
        return false;

    let isValidKeyField: boolean = false;
    let isValidValueField : boolean = false;

    for (let i = 0; i < value.length; i++) {
        let object = value[i];

        isValidKeyField = validateObjectKeyFields(object, HeaderFields);

        if (!isValidKeyField)
            return false;

        isValidValueField = validateValuesOfObjectWithStringValues(object);

        if (!isValidValueField)
            return false;
    }
    return true;
}

export {validateHeaderValue};
