addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {return true}
    ,

    upgrades: {
        11: {
            title: "Doublifier",
            description: "Double your point gain.",
            cost: new Decimal(1)
        },
        12: {
            title: "Doublifier 2: The Sequel",
            description: "Double your point gain... again",
            cost: new Decimal(2)
        },
        13: {
            title: "Doublifier 3: The Points Strike Back",
            description: "Double your point gain... yet again",
            cost: new Decimal(3)
        },
        14: {
            title: "Doublifier 4: Running Out Of Names",
            description: "Double your point gain... you get it by now",
            cost: new Decimal(4)
        },
        15: {
            title: "Finally, some novelty",
            description: "Boosts point gain via prestige points",
            cost: new Decimal(16),
            effect() {
                return player['p'].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect('p', 15))+"x" }, // Add formatting to the effect
        },
    },
})
