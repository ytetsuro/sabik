/// <reference types="jest" />
declare type Constructor<T> = new (...args: any[]) => T;
declare type FilterFlags<Base, Condition extends Function> = {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};
declare type AllowedNames<Base, Condition extends Function> = FilterFlags<Base, Condition>[keyof Base];
declare type MethodPick<T, K extends keyof T> = {
    [P in K]: T[P] extends (...args: any[]) => any ? T[P] | ReturnType<T[P]> | jest.Mock<ReturnType<T[P]>, Parameters<T[P]>> : never;
};
declare type MockableMethod<Base> = MethodPick<Base, AllowedNames<Base, (...args: any[]) => any>>;
export declare const getDouble: <T, Y extends Constructor<T>>(classConstructor: Y, params: Partial<MockableMethod<T>>, constructorArgs?: [] | ConstructorParameters<Y>) => T;
export {};
