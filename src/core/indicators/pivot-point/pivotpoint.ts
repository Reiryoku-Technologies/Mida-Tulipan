/*
 * Copyright Reiryoku Technologies and its contributors, www.reiryoku.com, www.mida.org
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

import { PivotPointParameters, Type, StandardPivotPoints, FibonacciPivotPoints, Candle } from "#indicators/pivot-point/PivotPointParameters";

const DEFAULT_PIVOT_POINT_TYPE: Type = Type.STANDARD;
const DEFAULT_PRICE = 0;


export class PivotPoint  {

    readonly #type: Type;
    readonly #open: number;
    readonly #high: number;
    readonly #low: number;
    readonly #close: number;

    constructor({type, candle}: PivotPointParameters) {

        this.#type = type ?? DEFAULT_PIVOT_POINT_TYPE;
        this.#open = candle?._open ?? DEFAULT_PRICE;
        this.#high = candle?._high ?? DEFAULT_PRICE;
        this.#low  = candle?._low  ?? DEFAULT_PRICE;
        this.#close = candle?._close ?? DEFAULT_PRICE;
    }

    public async calculate(pivotPointParameters: PivotPointParameters): Promise<StandardPivotPoints | FibonacciPivotPoints> {

        return new Promise((resolve, reject) => {

            try {

                if (
                    pivotPointParameters?.candle!._open! <= 0 || 
                    pivotPointParameters?.candle!._high! <= 0 || 
                    pivotPointParameters?.candle!._low!  <= 0 ||
                    pivotPointParameters?.candle!._close! <= 0 
                   ) {

                    throw new Error("Invalid candle data for pivot point calculation.")
                }


                switch (pivotPointParameters.type) {

                    case Type.STANDARD:
                        return this.CalculateStandard(pivotPointParameters?.candle!)

                    case Type.FIBONACCI:
                        return this.CalculateFibonacci(pivotPointParameters.candle!)
                
                    default:
                        return this.CalculateStandard(pivotPointParameters.candle!)
                }
                
            } catch (error) {
                console.log('An error occured.');
            }
        });

    }

    private CalculateStandard(candle: Candle): StandardPivotPoints {

        const pp = +((candle._high! + candle._low! + candle._close!) / 3).toFixed(4);
        const r1 = +((2 * pp) - candle._low!).toFixed(4);
        const s1 = +((2 * pp) - candle._high!).toFixed(4);

        const r2 = +(pp + (candle._high! - candle._low!)).toFixed(4);
        const s2 = +(pp - (candle._high! - candle._low!)).toFixed(4);

        const r3 = +(candle._high! + 2 * (pp - candle._low!)).toFixed(4);
        const s3 = +(candle._low! - 2 *(candle._high! - pp)).toFixed(4);;


        return new StandardPivotPoints(r1, r2, r3, pp, s1, s2, s3);

    }

    private CalculateFibonacci(candle: Candle): FibonacciPivotPoints {

        const pp = +((candle._high! + candle._low! + candle._close!) / 3).toFixed(4);
        const r1 = +(pp + (candle._high! - candle._low!) * 0.3820).toFixed(4);
        const s1 = +(pp - (candle._high! - candle._low!) * 0.3820).toFixed(4);

        const r2 = +(pp + (candle._high! - candle._low!) * 0.6180).toFixed(4);
        const s2 = +(pp - (candle._high! - candle._low!) * 0.6180).toFixed(4);


        const r3 = +(pp + (candle._high! - candle._low!) * 1.0000).toFixed(4);
        const s3 = +(pp - (candle._high! - candle._low!) * 1.0000).toFixed(4);;


        return new FibonacciPivotPoints(r1, r2, r3, pp, s1, s2, s3);

    }



}