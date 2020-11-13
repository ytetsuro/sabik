/* eslint-disable */
type Constructor<T> = new (...args: any[]) => T;

type FilterFlags<Base, Condition extends Function> = {
    [Key in keyof Base]: 
        Base[Key] extends Condition ? Key : never
};

type AllowedNames<Base, Condition extends Function> = 
        FilterFlags<Base, Condition>[keyof Base];

type MethodPick<T, K extends keyof T> = {
    [P in K]: 
        T[P] extends (...args: any[]) => any ? T[P]|ReturnType<T[P]>|jest.Mock<ReturnType<T[P]>, Parameters<T[P]>> : never ;
}

type MockableMethod<Base> = 
        MethodPick<Base, AllowedNames<Base, (...args: any[]) => any>>;

export const getDouble = <T, Y extends Constructor<T>>(
    classConstructor: Y,
    params: Partial<MockableMethod<T>>,
    constructorArgs: ConstructorParameters<Y>|[] = [],
): T => {
    const testDouble = class extends (<any>classConstructor) {
        constructor(...args: any[]) {
            super(...args);
        }
    };
    const result = new testDouble(...constructorArgs);

    const methodKeyNames = <AllowedNames<T, (...args: any[]) => any>[]>Object.keys(params)
        .filter(keyName => typeof result[keyName] === 'function');

    return <T>methodKeyNames.reduce((result, keyName) => {
        if (jest.isMockFunction(params[keyName])) {
            result[(<string>keyName)] = params[keyName];
        } else if (typeof params[keyName] === 'function') {
            result[(<string>keyName)] = jest.fn(<any>params[keyName]);
            return result;
        }

        result[(<string>keyName)] = jest.fn(() => params[keyName]);
        return result;
    }, result);
};