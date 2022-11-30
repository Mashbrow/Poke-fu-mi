"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeakness = void 0;
const getWeakness = (type) => {
    switch (type) {
        case "Feu":
            return "Eau";
        case "Eau":
            return "Elec";
        case "Elec":
            return "Roche";
        case "Roche":
            return "Plante";
        case "Plante":
            return "Feu";
    }
};
exports.getWeakness = getWeakness;
//# sourceMappingURL=utils.js.map