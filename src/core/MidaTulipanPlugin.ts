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

import {
    MidaIndicator,
    MidaPlugin,
    MidaPluginActions,
    GenericObject,
} from "@reiryoku/mida";
import { RelativeStrengthIndexIndicator } from "#indicators/rsi/RelativeStrengthIndexIndicator";
import { SimpleMovingAverageIndicator } from "#indicators/sma/SimpleMovingAverageIndicator";
import { WilliamsRIndicator } from "#indicators/willr/WilliamsRIndicator";
import { WeightedMovingAverageIndicator } from "#indicators/wma/WeightedMovingAverageIndicator";

class MidaTulipanPlugin extends MidaPlugin {
    public constructor () {
        super({
            id: "91788fa4-6410-4479-8e08-9261a474a46f",
            name: "Mida Tulipan",
            description: "A Mida plugin providing technical analysis indicators",
            version: "1.0.0",
        });
    }

    public override install (actions: MidaPluginActions): void {
        actions.addIndicator("RSI", (parameters: GenericObject): MidaIndicator => new RelativeStrengthIndexIndicator(parameters));
        actions.addIndicator("SMA", (parameters: GenericObject): MidaIndicator => new SimpleMovingAverageIndicator(parameters));
        actions.addIndicator("Williams/%R", (parameters: GenericObject): MidaIndicator => new WilliamsRIndicator(parameters));
        actions.addIndicator("WMA", (parameters: GenericObject): MidaIndicator => new WeightedMovingAverageIndicator(parameters));
    }
}

// <public-api>
export { MidaTulipanPlugin };

export { RelativeStrengthIndexIndicator } from "#indicators/rsi/RelativeStrengthIndexIndicator";
export { RelativeStrengthIndexIndicatorParameters } from "#indicators/rsi/RelativeStrengthIndexIndicatorParameters";

export { SimpleMovingAverageIndicator } from "#indicators/sma/SimpleMovingAverageIndicator";
export { SimpleMovingAverageIndicatorParameters } from "#indicators/sma/SimpleMovingAverageIndicatorParameters";

export { WilliamsRIndicator } from "#indicators/willr/WilliamsRIndicator";
export { WilliamsRIndicatorParameters } from "#indicators/willr/WilliamsRIndicatorParameters";

export { WeightedMovingAverageIndicator } from "#indicators/wma/WeightedMovingAverageIndicator";
export { WeightedMovingAverageIndicatorParameters } from "#indicators/wma/WeightedMovingAverageIndicatorParameters";
// </public-api>
