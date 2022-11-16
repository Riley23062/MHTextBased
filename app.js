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
    'Jagras',
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
        this.power = Math.random(90) * 9999;
        this.worth = this.power + 50
    }

    imposterStrikes() {
        if (probability(100)) {
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
        if (this.power > monster.power) {
            console.log('Congrats you killed the monster!');
        } else if (this.power < monster.power) {
            console.log('You have fallen');
            gameEnd = true;
        }
    }
}
let hName = 'Greg'
let hPower = Math.random(90) * 9999 +50
let hJob = 'hunter'
let hKills = 0
let hMoney = 0
let player = new Hero(hName, hPower, hJob, hKills, hMoney)
let monstersKilled = 0

let endLoop = false;

function gameStart() {
    //Hunting monsters
    console.clear()
    monster.newMonster();
    console.log(`-----${player.name} goes for a hunt!-----`);
    monster.imposterStrikes()
    console.log(`${monster.name} attacks!!`);
    player.killMonster()
 player.money += Math.floor(monster.worth);
    endLoop = true;
    monstersKilled++

    if (endLoop == true) {
        if (gameEnd == false) {

            function merchant() {
                console.log('-------Hello there! Welcome to my shop, please have a look below-------');
                console.log('gold: ' + player.money);
                console.log('power: '+ Math.floor(player.power));
                let itemsForSale = {
                    armor: "leather",
                    weapon: "sword"
                }
                console.log('armor: ' + itemsForSale.armor + ' cost: 10 gold');
                console.log('weapon: ' + itemsForSale.weapon + ' Grants +30 Power' + ' cost: 30 gold');

                rl.question(`Enter The name of the item you want below, or type none if you don't want any `, (item) => {
                    function buyItem() {
                        if (item == itemsForSale.weapon) {
                            player.power += 30;
                            player.money -= 30
                            console.log('Thanks for your purchase');
                            rl.question(`Next hunt?`, () => {
                                endLoop = false;
                                gameStart()
                            })
                        } else if(item == 'none' || item == 'None'){
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
            merchant()
        }
        if (gameEnd == true) {
            rl.question(`Game Over`, () => {
                rl.close();
            })
        }
    }
}



rl.question(`Begin?`, answer => {
    gameStart()
})