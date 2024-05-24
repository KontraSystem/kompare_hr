"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduceObjectArray = void 0;
const reduceObjectArray = (array) => {
    return array
        .map((item) => item.value)
        .reduce((prev, current) => prev + current, 0);
};
exports.reduceObjectArray = reduceObjectArray;
//# sourceMappingURL=helper.js.map