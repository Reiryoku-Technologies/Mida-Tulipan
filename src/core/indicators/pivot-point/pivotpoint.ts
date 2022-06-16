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

import { MidaPeriod } from '@reiryoku/mida';
import { PivotPointParameters, Type, StandardPivotPoints, FibonacciPivotPoints } from "#indicators/pivot-point/PivotPointParameters";

const DEFAULT_PIVOT_POINT_TYPE: Type = Type.STANDARD;
const DEFAULT_PRICE = 0;


export class PivotPoint {

    readonly #type: Type;
    readonly #open: number;
    readonly #high: number;
    readonly #low: number;
    readonly #close: number;

    constructor({type, candle}: PivotPointParameters) {


        this.#type = type ?? DEFAULT_PIVOT_POINT_TYPE;
        this.#open = candle?.open ?? DEFAULT_PRICE;
        this.#high = candle?.high ?? DEFAULT_PRICE;
        this.#low  = candle?.low  ?? DEFAULT_PRICE;
        this.#close = candle?.close ?? DEFAULT_PRICE;
    }

    public async calculate(pivotPointParameters: PivotPointParameters): Promise<StandardPivotPoints | FibonacciPivotPoints> {

        return new Promise((resolve, reject) => {

            try {

                if (
                    pivotPointParameters?.candle!.open! <= 0 || 
                    pivotPointParameters?.candle!.high! <= 0 || 
                    pivotPointParameters?.candle!.low!  <= 0 ||
                    pivotPointParameters?.candle!.close! <= 0 
                   ) {

                    throw new Error("Invalid candle data for pivot point calculation.")
                }


                switch (pivotPointParameters.type) {

                    case Type.STANDARD:
                        resolve(this.CalculateStandard(pivotPointParameters?.candle!));
                        break;

                    case Type.FIBONACCI:
                        resolve(this.CalculateFibonacci(pivotPointParameters.candle!));
                        break;
                
                    default:
                        resolve(this.CalculateStandard(pivotPointParameters.candle!));
                        break;
                }
                
            } catch (error) {
                console.log('An error occured.');
                reject(error);
            }
        });

    }

    private CalculateStandard(candle: MidaPeriod): StandardPivotPoints {

        const pp = +((candle.high! + candle.low! + candle.close!) / 3).toFixed(4);
        const r1 = +((2 * pp) - candle.low!).toFixed(4);
        const s1 = +((2 * pp) - candle.high!).toFixed(4);

        const r2 = +(pp + (candle.high! - candle.low!)).toFixed(4);
        const s2 = +(pp - (candle.high! - candle.low!)).toFixed(4);

        const r3 = +(candle.high! + 2 * (pp - candle.low!)).toFixed(4);
        const s3 = +(candle.low! - 2 *(candle.high! - pp)).toFixed(4);;


        return new StandardPivotPoints(r1, r2, r3, pp, s1, s2, s3);

    }

    private CalculateFibonacci(candle: MidaPeriod): FibonacciPivotPoints {

        const pp = +((candle.high! + candle.low! + candle.close!) / 3).toFixed(4);
        const r1 = +(pp + (candle.high! - candle.low!) * 0.3820).toFixed(4);
        const s1 = +(pp - (candle.high! - candle.low!) * 0.3820).toFixed(4);

        const r2 = +(pp + (candle.high! - candle.low!) * 0.6180).toFixed(4);
        const s2 = +(pp - (candle.high! - candle.low!) * 0.6180).toFixed(4);


        const r3 = +(pp + (candle.high! - candle.low!) * 1.0000).toFixed(4);
        const s3 = +(pp - (candle.high! - candle.low!) * 1.0000).toFixed(4);;


        return new FibonacciPivotPoints(r1, r2, r3, pp, s1, s2, s3);

    }



}