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

import {
    MidaIndicator,
    MidaPlugin,
    MidaPluginActions,
    GenericObject,
} from "@reiryoku/mida";
import { Ema, } from "#indicators/ema/Ema";
import { Rsi, } from "#indicators/rsi/Rsi";
import { Sma, } from "#indicators/sma/Sma";
import { WilliamsR, } from "#indicators/willr/WilliamsR";
import { Wma, } from "#indicators/wma/Wma";

const pluginId: string = "91788fa4-6410-4479-8e08-9261a474a46f";
const pluginVersion: string = "2.1.0";

class TulipanPlugin extends MidaPlugin {
    public constructor () {
        super({
            id: pluginId,
            name: "Mida Tulipan",
            description: "A Mida plugin providing technical analysis indicators",
            version: pluginVersion,
        });
    }

    public override install (actions: MidaPluginActions): void {
        actions.addIndicator("EMA", (parameters: GenericObject): MidaIndicator => new Ema(parameters));
        actions.addIndicator("RSI", (parameters: GenericObject): MidaIndicator => new Rsi(parameters));
        actions.addIndicator("SMA", (parameters: GenericObject): MidaIndicator => new Sma(parameters));
        actions.addIndicator("Williams/%R", (parameters: GenericObject): MidaIndicator => new WilliamsR(parameters));
        actions.addIndicator("WMA", (parameters: GenericObject): MidaIndicator => new Wma(parameters));
    }
}

// <public-api>
export { pluginId, pluginVersion, };

export { TulipanPlugin, };

export { Ema, } from "#indicators/ema/Ema";
export { EmaParameters, } from "#indicators/ema/EmaParameters";

export { Rsi, } from "#indicators/rsi/Rsi";
export { RsiParameters, } from "#indicators/rsi/RsiParameters";

export { Sma, } from "#indicators/sma/Sma";
export { SmaParameters, } from "#indicators/sma/SmaParameters";

export { WilliamsR, } from "#indicators/willr/WilliamsR";
export { WilliamsRParameters, } from "#indicators/willr/WilliamsRParameters";

export { Wma, } from "#indicators/wma/Wma";
export { WmaParameters, } from "#indicators/wma/WmaParameters";
// </public-api>
