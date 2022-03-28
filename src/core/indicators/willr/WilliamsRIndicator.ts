/*
 * Copyright Reiryoku Technologies and its contributors, https://www.reiryoku.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
*/

import { MidaIndicator } from "@reiryoku/mida";
import { WilliamsRIndicatorParameters } from "#indicators/willr/WilliamsRIndicatorParameters";

const DEFAULT_PERIODS_LENGTH: number = 14;
const tulind = require("tulind");

export class WilliamsRIndicator extends MidaIndicator {
    readonly #periodsLength: number;

    public constructor ({ periodsLength, }: WilliamsRIndicatorParameters) {
        super({
            name: "Williams %R",
            version: "1.0.0",
        });

        this.#periodsLength = periodsLength ?? DEFAULT_PERIODS_LENGTH;
    }

    public override async calculate (input: number[][]): Promise<number[]> {
        return new Promise((resolve: (value: number[]) => void): void => {
            tulind.indicators.willr.indicator([
                [ ...input[0], ], // H
                [ ...input[1], ], // L
                [ ...input[2], ], // C
            ], [ this.#periodsLength, ], (error: unknown, values: number[][]) => {
                if (Array.isArray(values)) {
                    resolve(values[0]);
                }
            });
        });
    }
}
