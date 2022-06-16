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

export enum Type {
    STANDARD,
    // WOODIE,
    // CAMARILLA,
    // DEMARK,
    FIBONACCI
};


abstract class PivotPoints  {
    _r1?: number;
    _r2?: number;
    _r3?: number;
    _pp?: number;
    _s1?: number;
    _s2?: number;
    _s3?: number;

    constructor(r1: number, r2: number, r3: number, pp: number, s1: number, s2: number, s3: number) {

        this._r1 = r1;
        this._r2 = r2;
        this._r3 = r3;
        this._pp = pp;
        this._s1 = s1;
        this._s2 = s2;
        this._s1 = s3;
    }
}

export class StandardPivotPoints extends PivotPoints {}

export class FibonacciPivotPoints extends PivotPoints {}

export class Candle {
    _open?: number;
    _high?: number;
    _low?: number;
    _close?: number;

    constructor(open: number, high: number, low: number, close: number) {
     
        this._open = open;
        this._high = high;
        this._low = low;
        this._close = close;
    }
}

export type PivotPointParameters = {
    type?: Type;
    candle?: MidaPeriod;
};
