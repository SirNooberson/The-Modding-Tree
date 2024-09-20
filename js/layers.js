addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00FFFF",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p',25)) mult = mult.times(3)
        if (hasUpgrade('p',32)) mult = mult.times(2)
        if (hasUpgrade('r',11)) mult = mult.times(2)
        if (hasUpgrade('r',21)) mult = mult.times(1.431546345641234)
        mult = mult.times(challengeEffect('r',11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the f
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {return true}
    ,
    passiveGeneration() { return (hasUpgrade("p", 23)?0.05:0)  },
    branches: ['r',1],
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
            effectDisplay() { return format(upgradeEffect('p', 15)) + "x"}, // Add formatting to the effect
        },
        16: {
            title: "Selfboost",
            description: "Points boost themselves",
            cost: new Decimal(64),
            effect() {
                return player.points.add(1).log(3).add(1).pow(1.6)
            },
            effectDisplay() { return format( upgradeEffect('p', 16)) + "x"}, // Add formatting to the effect
        },
        21: {
          title: "Mysterious point source",
          description: "Gain MORE points",
          cost: new Decimal(1024),
        },
        22: {
            title: "biggernumbers()",
            description: "Read title",
            cost: new Decimal(3000),
          },
        23: {
            title: "Useless Prestiging",
            description: "Gain 5% of pending prestige points per second",
            cost: new Decimal(6969),
        },
        24: {
            title: "Doublifier 5: This Again",
            description: "bruh.mp3",
            cost: new Decimal(42069),
        },
        25: {
            title: "Prestigious Amplifier",
            description: "Let's mix things up, shall we? 3x prestige point gain",
            cost: new Decimal(42069),
        },
        26: {
            title: "Doublifier 6: Once More",
            description: "bruh.mp3",
            cost: new Decimal(42069),
        },
        31: {
            title: "Doublifier 7: It's About Time",
            description: "bruh.mp4",
            cost: new Decimal(1000000),
        },
        32: {
            title: "Impossible?",
            description: "Double prestige point gain cuz why not",
            cost: new Decimal(1e24),
        },
    },
})

addLayer("r", {
    name: "rebirth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "FFFFFF",
    requires: new Decimal(1e10), // Can be a function that takes requirement increases into account
    resource: "rebirth points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for rebirth points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {return true}
    ,
    upgrades: {
      11: {
        title: "Doublifier ω: STOP IT!",
        description: "why u do dis to me. oh by the way x2 points and prestige points",
        cost: new Decimal(1)
          },
      21: {
        title: "Prestige Powah",
        description: "Do people even read these?",
        cost: new Decimal(1)
      },
      22: {
        title: "Rebirth Multiplier",
        description: "Finally, rebirth points are useful!",
        cost: new Decimal(2),
        effect() {
            return player['r'].points.add(2).pow(0.5)
        },
        effectDisplay() { return format( upgradeEffect('r', 22)) + "x"}, // Add formatting to the effect
      }
    },

    challenges: {
        11: {
            name: "HERE COMES A NEW CHALLENGER",
            challengeDescription: "Divide point gain by 180",
            canComplete: function() {return player.points.gte(1e9)},
            onEnter: function() {doReset(this.layer)},
            rewardEffect() {return 1.6},
        
            
        },
        etc

    }
    
})
