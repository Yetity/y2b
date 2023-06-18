const { EmbedBuilder } = require("discord.js");
const items = require("../../utils/misc/items/items.json");
const { shopify } = require("../../utils/formatters/beatify");
const errorHandler = require("../../utils/handlers/errorHandler");

module.exports = {
    name: "shop",
    description: "Shop for items that are definitely not overpriced",
    blacklist: true,

    callback: async (client, interaction) => {
        try {
            await interaction.deferReply();
            let reply = ``;

            for (let item in items) {
                reply += `__${items[item].name}__ - ${shopify(
                    items[item].price
                )}\n${items[item].description}\n\n`;
            }

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Shop")
                        .setDescription(reply)
                        .setColor("Fuchsia"),
                ],
            });
        } catch (error) {
            errorHandler(error, client, interaction, EmbedBuilder);
        }
    },
};
