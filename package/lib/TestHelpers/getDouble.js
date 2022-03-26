"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDouble = void 0;
const getDouble = (classConstructor, params, constructorArgs = []) => {
    const testDouble = class extends classConstructor {
        constructor(...args) {
            super(...args);
        }
    };
    const result = new testDouble(...constructorArgs);
    const methodKeyNames = (Object.keys(params).filter((keyName) => typeof result[keyName] === 'function'));
    return methodKeyNames.reduce((result, keyName) => {
        if (jest.isMockFunction(params[keyName])) {
            result[keyName] = params[keyName];
        }
        else if (typeof params[keyName] === 'function') {
            result[keyName] = jest.fn(params[keyName]);
            return result;
        }
        result[keyName] = jest.fn(() => params[keyName]);
        return result;
    }, result);
};
exports.getDouble = getDouble;
