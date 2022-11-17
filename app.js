const {
    clear
} = require('console');

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
let gameEnd = false;

function probability(n) {
    return Math.random() < n;
}

let names = [
    'Barnos',
    'Gajalaka',
    'Gajau',
    'Gastodon',
    'Girros',
    'Grimalkyne',
    'Kestodon',
    'Mernos',
    'Noios',
    'Raphinos',
    'Rathalos'
];
class Monster {
    constructor(name, power, value) {
        this.name = name;
        this.power = power;
        this.value = value;
    }

    newMonster() {
        this.name = names[Math.floor(Math.random() * names.length)]
        this.power = Math.random(10) * 100;
        this.value = this.power + 50
    }

    imposterStrikes() {
        if (probability(0.002)) {
            this.name = 'Imposter'
            this.power = 696969696969696969696969696969
            console.log('Looking sus!! the imposter strikes!!!!');
        }
    }
}
let monster = new Monster('', 0, 0)



class Hero {
    constructor(name, power, job, kills, money, defense) {
        this.name = name
        this.power = power
        this.job = job
        this.kills = kills
        this.money = money
        this.defense = defense;
    }

    killMonster() {
        if (this.power > monster.power - this.defense) {
            console.log('Congrats you killed the monster!');
        } else if (this.power < monster.power) {
            console.log('You have fallen');
            gameEnd = true;
        }
    }
}
let hName = 'Greg'
let hPower = 30
let hJob = 'hunter'
let hKills = 0
let hMoney = 30
let hDefense = 10
let player = new Hero(hName, hPower, hJob, hKills, hMoney, hDefense)
let monstersKilled = 0

let endLoop = true;

function gameStart() {
    //Hunting monsters
    if (monstersKilled < 1) {
        console.clear()
        console.log('Your first hunt will be a very easy one, your defense will take away some of the monsters power, so you just have to overpower it');
        monster.name = 'Jagras'
        monster.power = 25
        console.log(`-----${player.name} goes for a hunt!-----`);
        monster.imposterStrikes()
        console.log(`${monster.name} attacks!!`);
        player.killMonster()
        player.money += Math.floor(monster.value);
        endLoop = true;
        monstersKilled++
    } else if (monstersKilled < 5 && monstersKilled > 0) {
        console.clear()
        monster.newMonster();
        console.log(`-----${player.name} goes for a hunt!-----`);
        monster.imposterStrikes()
        console.log(`${monster.name} attacks!!`);
        player.killMonster()
        player.money += Math.floor(monster.value);
        endLoop = true;
        monstersKilled++
    } else if (monstersKilled >= 5) {
        console.clear()
        monster.newMonster();
        monster.power += Math.random(140) * 500
        console.log(`-----${player.name} goes for a hunt!-----`);
        monster.imposterStrikes()
        console.log(`${monster.name} attacks!!`);
        player.killMonster()
        player.money += Math.floor(monster.value);
        endLoop = true;
        monstersKilled++
    }

    if (endLoop == true) {
        if (gameEnd == false) {
            //shop function
            function merchant() {
                console.log('-------Hello there! Welcome to my shop, please have a look below-------');
                console.log('gold: ' + player.money);
                console.log('power: ' + Math.floor(player.power));
                //sets what items are for sale 
                let itemsForSale = {
                    armor: {
                        item: 'armor upgrade',
                        defense: 10,
                        price: 30
                    },
                    weapon: {
                        item: 'sword upgrade',
                        power: 30,
                        price: 30
                    }
                }
                //upgrades as the game progresses
                if (monstersKilled >= 5) {
                    itemsForSale.weapon.item = 'Wyrm Slayer'
                    itemsForSale.weapon.power = 80
                    itemsForSale.weapon.price = 90
                } else if (monstersKilled >= 5) {
                    itemsForSale.weapon.item = 'God Eater'
                    itemsForSale.weapon.power = 100
                    itemsForSale.weapon.price = 500
                }
                console.log('armor: ' + itemsForSale.armor.item + ' Grants ' + itemsForSale.armor.defense + ' defense' + ' cost: ' + itemsForSale.armor.price);
                console.log('weapon: ' + itemsForSale.weapon.item + ' Grants ' + itemsForSale.weapon.power + ' power' + ' cost: ' + itemsForSale.weapon.price);
                rl.question(`Enter The name of the item you want below, or type none if you don't want any `, (item) => {
                    //checks which item was purchased
                    function buyItem() {
                        if (item == itemsForSale.weapon.item) {
                            player.power += itemsForSale.weapon.power
                            player.money -= itemsForSale.weapon.price
                            console.log('Thanks for your purchase');
                            rl.question(`Next hunt?`, () => {
                                endLoop = false;
                                gameStart()
                            })
                        } else if (item == itemsForSale.armor.item) {
                            player.power += itemsForSale.armor.defense
                            player.money -= itemsForSale.armor.price
                            console.log('Thanks for your purchase');
                            rl.question(`Next hunt?`, () => {
                                endLoop = false;
                                gameStart()
                            })

                        } else if (item == 'none' || item == 'None') {
                            console.log('Have a nice day! Happy hunting!');
                            rl.question(`Next hunt?`, () => {
                                endLoop = false;
                                gameStart()
                            })
                        } else {
                            rl.question(`Please enter a valid item`, () => {
                                console.clear()
                                merchant()
                            })

                        }
                    }
                    buyItem()
                })
            }
            rl.question(`Enter the shop by hitting enter...`, answer => {
                merchant()
            })
        }
        //ends the game on a game over
        if (gameEnd == true) {
            rl.question(`Game Over`, () => {
                rl.close();
            })
        }
    }
}
//initalizes player name and begins the game
rl.question(`What is your name? `, name => {
    player.name = name;
    rl.question(`Begin? ${player.name}`, () => {
        gameStart()
    })
})