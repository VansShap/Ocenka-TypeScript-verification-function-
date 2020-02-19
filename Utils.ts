function isString(value: any): boolean {
    if (typeof value == "string")
        return true;
    else
        return false;
}

function isArray(value: any): boolean {
    if (value instanceof Array) {
        return true;
    }
    else {
        return false;
    }
}

function isObject(value: any): boolean {
    if (value instanceof Object && !(value instanceof Array)) {
        return true;
    }
    else {
        return false;
    }
}

export {isString, isArray, isObject};
