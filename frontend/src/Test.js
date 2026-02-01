"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
Object.defineProperty(String.prototype, "capitalize", {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});
// A function can describe the shape of the object it expects as a
// parameter using object destructuring. Default values can also be provided
function sayHello(_a) {
    var firstName = _a.firstName, lastName = _a.lastName, _b = _a.middleName, middleName = _b === void 0 ? "" : _b;
    // Object destructuring along with passing a default value
    // Allows to avoid checking property "middleName" for "undefined"
    console.log("Hello, ".concat(firstName.capitalize(), " ").concat(lastName.capitalize(), " ").concat(middleName.capitalize()));
}
var name1 = {
    firstName: "john",
    lastName: "doe",
    middleName: "kevin",
};
var name2 = {
    firstName: "john",
    lastName: "doe",
};
sayHello(name1);
sayHello(name2);
