export {};

declare global {
    interface String {
        capitalize(): string;
    }
}

String.prototype.capitalize = function () {
    return this
        .charAt(0)
        .toUpperCase()
        .concat(this.slice(1));
};