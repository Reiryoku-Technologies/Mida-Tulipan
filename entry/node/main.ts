import { MidaIndicator } from "@reiryoku/mida";
import { RelativeStrengthIndexIndicator } from "#indicators/rsi/RelativeStrengthIndexIndicator";

module.exports = require("!/plugin.mida");

const rsi: MidaIndicator = new RelativeStrengthIndexIndicator({
    periodsLength: 14,
});

(async (): Promise<void> => {
    console.log(await rsi.next([
        4,
        2,
        2,
        3,
        5,
        2,
        4,
        3,
        4,
        3,
        6,
        6,
        7,
        7,
    ]));
    console.log(await rsi.next([ 8, 9, ]));
})();
