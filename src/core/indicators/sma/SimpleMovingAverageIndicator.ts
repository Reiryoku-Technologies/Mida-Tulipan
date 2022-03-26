import { MidaIndicator } from "@reiryoku/mida";
import { SimpleMovingAverageIndicatorIndicatorParameters } from "#indicators/sma/SimpleMovingAverageIndicatorParameters";

const DEFAULT_PERIODS_LENGTH: number = 50;
const tulind = require("tulind");

export class SimpleMovingAverageIndicator extends MidaIndicator {
    readonly #periodsLength: number;

    public constructor ({ periodsLength, }: SimpleMovingAverageIndicatorIndicatorParameters) {
        super({
            id: "sma",
            name: "SMA",
            version: "1.0.0",
        });

        this.#periodsLength = periodsLength ?? DEFAULT_PERIODS_LENGTH;
    }

    public async calculate (input: number[]): Promise<number[]> {
        return new Promise((resolve: (value: number[]) => unknown): void => {
            tulind.indicators.sma.indicator([ ...input, ], [ this.#periodsLength, ], (error: unknown, values: number[]) => {
                if (Array.isArray(values)) {
                    resolve(values);
                }
            });
        });
    }
}
