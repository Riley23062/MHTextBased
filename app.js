const {
    clear
} = require('console');

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
let gameEnd = false;
let endLoop = false;

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
        this.hp
        this.armor
    }

    newMonster() {
        this.name = names[Math.floor(Math.random() * names.length)]
        this.hp = Math.random(10) * 100;
        this.armor = Math.random(0) * 29
        this.power = Math.random(10) * 100;
        this.value = this.power + 10;
    }
}
let monster = new Monster('', 0, 0)



class Hero {
    constructor(name, hp, power, kills, money, defense, wUpgrade, dUpgrade, monstersKilled) {
        this.name = name;
        this.hp = hp;
        this.power = power;
        this.kills = kills;
        this.money = money;
        this.defense = defense;
        this.wUpgrade = wUpgrade;
        this.dUpgrade = dUpgrade;
        this.monstersKilled = monstersKilled;
    }

   //used during monster hunts to initiate combat 
    combat() {
        if(monster.hp > 0){
            rl.question(`Would you like to Attack, Defend, or try and capture the monster? `, response => {
                if(response.toLowerCase() == 'attack'){
                    console.log(`You attack the ${monster.name}`);
                        let criticalHit = false;
                        if(probability(0.10)){
                            criticalHit = true
                        }
    
                        if(!criticalHit){
                            monster.hp -= this.power - monster.armor
                            console.log(`${monster.name} retaliates`);
                            this.hp -= monster.power - this.defense
                            this.combat()
                        } else if(criticalHit){
                            console.log(`CRITICAL HIT!`);
                            monster.hp -= this.power
                            console.log(`${monster.name} retaliates`);
                            this.hp -= monster.power - this.defense
                            this.combat()
                        }

                } else if (response.toLowerCase() == 'defend'){
                    console.log(`You enter a ready stance anticipating the ${monster.name}'s next move`);
                    let parry = false;
                    if(probability(0.10)){
                        parry = true
                    }
                    if(probability(0.40)){
                        console.log(`You narrowly escape the ${monster.name}'s attack`);
                    } else if(parry){
                        console.log(`You send ${monster.name}'s attack right back at it!!`);
                        monster.hp -= monster.power - monster.armor 
                    } else { 
                        this.defense += 10
                        console.log(`${monster.name} attacks`);
                        this.hp -= monster.power - this.defense
                    }
                    this.combat()
                }else {
                    rl.question(`Please enter a valid action`, () => {
                        console.clear()
                        this.combat()
                    })

                }
    
            })
        
        } else if(monster.hp <= 0) {
            console.log(`${monster.name} has been hunted`);
            player.money += Math.floor(monster.value);
            endLoop = true;
            postFight()
        } else if(player.hp <0){
            rl.question(`Game Over`, () => {
                rl.close();
            })
        }
        }
    }
//variables for our Hero
let hName = 'Greg'
let hPower = 30
let hKills = 0
let hMoney = 30
let hDefense = 10
let hHp = 100
//new hero creation
let player = new Hero(hName, hHp, hPower, hKills, hMoney, hDefense, 1, 1, 0)
//tracker for the monsters killed, will eventually have an object that'll save game data

//game
let turns = 0;
function gameStart() {
    player.hp = 100;
    //Hunting monsters
    if (player.monstersKilled < 1) {
        console.clear()
        console.log('Your first hunt will be a very easy one, your defense will take away some of the monsters power, so you just have to overpower it');
        monster.name = 'Jagras'
        monster.power = 25
        monster.value = 10
        monster.armor = 0
        monster.hp = 60
        console.log(`-----${player.name} goes for a hunt!-----`);
        console.log(`${monster.name} attacks!!`);
        player.combat()
        player.monstersKilled++
    } else if (player.monstersKilled < 5 && player.monstersKilled > 0) {
        console.clear()
        monster.newMonster();
        console.log(`-----${player.name} goes for a hunt!-----`);
        console.log(`${monster.name} attacks!!`);
        player.combat()
        player.monstersKilled++
    } else if (player.monstersKilled >= 5) {
        console.clear()
        monster.newMonster();
        monster.power += Math.random(140) * 500
        console.log(`-----${player.name} goes for a hunt!-----`);
        console.log(`${monster.name} attacks!!`);
        player.combat()
        player.monstersKilled++
    }

}


function postFight(){

    if (endLoop == true) {
        if (gameEnd == false) {
            //resets player hp
            player.hp = 100;
            //shop function
            function merchant() {
                console.log('-------Hello there! Welcome to my shop, please have a look below-------');
                console.log('gold: ' + player.money);
                console.log('power: ' + Math.floor(player.power));
                console.log('defense: ' + Math.floor(player.defense));
                //sets what items are for sale 
                let itemsForSale = {
                    armor: {
                        item: 'armor upgrade',
                        defense: 10 * player.dUpgrade,
                        price: 30 * player.dUpgrade
                    },
                    weapon: {
                        item: 'sword upgrade',
                        power: 30 * player.wUpgrade,
                        price: 30 * player.wUpgrade
                    }
                }
                console.log('armor: ' + itemsForSale.armor.item + ' Grants ' + itemsForSale.armor.defense + ' defense' + ' cost: ' + itemsForSale.armor.price);
                console.log('weapon: ' + itemsForSale.weapon.item + ' Grants ' + itemsForSale.weapon.power + ' power' + ' cost: ' + itemsForSale.weapon.price);
                rl.question(`Enter The name of the item you want below, or type none if you don't want any `, (item) => {
                    //checks which item was purchased
                    function buyItem() {
                        if (item.toLowerCase() == itemsForSale.weapon.item) {
                            player.power += itemsForSale.weapon.power
                            player.money -= itemsForSale.weapon.price
                            player.wUpgrade++
                            console.log('Thanks for your purchase');
                            rl.question(`Next hunt?`, () => {
                                endLoop = false;
                                gameStart()
                            })
                        } else if (item.toLowerCase() == itemsForSale.armor.item) {
                            player.defense += itemsForSale.armor.defense
                            player.money -= itemsForSale.armor.price
                            player.dUpgrade++
                            console.log('Thanks for your purchase');
                            rl.question(`Next hunt?`, () => {
                                endLoop = false;
                                gameStart()
                            })
    
                        } else if (item.toLowerCase() == 'none') {
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
    }

}



//initalizes player name and begins the game
rl.question(`What is your name? `, name => {
    player.name = name;
    rl.question(`Begin? ${player.name}`, () => {
        gameStart()
    })
})