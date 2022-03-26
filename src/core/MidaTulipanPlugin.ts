import { MidaPlugin, MidaPluginActions } from "@reiryoku/mida";
import { RelativeStrengthIndexIndicator } from "#indicators/rsi/RelativeStrengthIndexIndicator";
import { SimpleMovingAverageIndicator } from "#indicators/sma/SimpleMovingAverageIndicator";

export class MidaTulipanPlugin extends MidaPlugin {
    public constructor () {
        super({
            id: "mida-tulipan",
            name: "Mida Tulipan",
            description: "This plugin does nothing",
            version: "1.0.0",
        });
    }

    public override install (actions: MidaPluginActions): void {
        actions.addIndicator("RSI", RelativeStrengthIndexIndicator);
        actions.addIndicator("SMA", SimpleMovingAverageIndicator);
    }
}
