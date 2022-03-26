import { MidaIndicator } from "@reiryoku/mida";
import { RelativeStrengthIndexIndicatorParameters } from "#indicators/rsi/RelativeStrengthIndexIndicatorParameters";

const DEFAULT_PERIODS_LENGTH: number = 14;
const tulind = require("tulind");

export class RelativeStrengthIndexIndicator extends MidaIndicator {
    readonly #periodsLength: number;

    public constructor ({ periodsLength, }: RelativeStrengthIndexIndicatorParameters) {
        super({
            id: "rsi",
            name: "RSI",
            version: "1.0.0",
        });

        this.#periodsLength = periodsLength ?? DEFAULT_PERIODS_LENGTH;
    }

    public async calculate (input: number[]): Promise<number[]> {
        return new Promise((resolve: (value: number[]) => unknown): void => {
            tulind.indicators.rsi.indicator([ ...input, ], [ this.#periodsLength, ], (error: unknown, values: number[]) => {
                if (Array.isArray(values)) {
                    resolve(values);
                }
            });
        });
    }
}
