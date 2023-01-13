//initalize node modules
const {
    clear
} = require('console');

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
//loop and gameEnd variables
//used for transitioning scenes 
let gameEnd = false;
let endLoop = false;

//probability function used for all random chance events
function probability(n) {
    return Math.random() < n;
}

//takes a min and max and choose a random number between the two of them
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
//monster names array, add to it if you want
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
    'Rathalos',
    'Jagras'
];
//sets up the monster object used in combat
class Monster {
    constructor(name, power, value) {
        this.name = name;
        this.power = power;
        this.value = value;
        this.hp
        this.armor
    }
    //creates a new monster when the function is called
    //always edit the values in here when you want to balance patch
    newMonster() {
        this.name = names[Math.floor(Math.random() * names.length)]
        this.hp = randomNumber(100, 300);
        this.armor = randomNumber(0, 30);
        this.power = randomNumber(25, 40);
        this.value = this.power;
    }
}
//initalizes the monster object with default values
let monster = new Monster('', 0, 0, 0, 0)


//creates the player object
//all parameters are logged in here
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
        console.log('Your hp is ' + this.hp);
        if (monster.hp > 0 && this.hp > 0) {
            //allows the user to pick between two options by typing one into the console
            //each option uses random chance events to determine whether or not something will happen
            //it loops without actually being a loop
            //loops mess with rl.question and aren't needed to achieve our desired effect 
            rl.question(`Would you like to Attack or Defend? `, response => {
                //attacking only has 1 random chance event
                //critical hits should be rare
                if (response.toLowerCase() == 'attack') {
                    console.log(`You attack the ${monster.name}`);
                    let criticalHit = false;
                    if (probability(0.10)) {
                        criticalHit = true
                    }

                    if (!criticalHit) {
                        monster.hp -= this.power - monster.armor
                        console.log(`${monster.name} retaliates`);
                        this.hp -= monster.power - this.defense
                    } else if (criticalHit) {
                        console.log(`CRITICAL HIT!`);
                        monster.hp -= this.power
                        console.log(`${monster.name} retaliates`);
                        this.hp -= monster.power - this.defense
                    }
                    rl.question(`Next Turn?`, () => {
                        console.clear()
                        this.combat()
                    })

                } else if (response.toLowerCase() == 'defend') {
                    //this uses if statements to determine if a random event will occur
                    //add or edit these to make combat more enthralling
                    console.log(`You enter a ready stance anticipating the ${monster.name}'s next move`);
                    let parry = false;
                    if (probability(0.35)) {
                        parry = true
                    }
                    if (probability(0.50)) {
                        console.log(`You narrowly escape the ${monster.name}'s attack`);
                    } else if (parry) {
                        console.log(`You send ${monster.name}'s attack right back at it!!`);
                        monster.hp -= monster.power - monster.armor
                    } else if (probability(0.40)) {
                        //hp should always stack, unlless it's with a potion
                        console.log('You manage to find time to recover some strength and enhance your body with magic');
                        console.log('+20 hp');
                        this.hp += 20;
                    } else {
                        console.log(`${monster.name} attacks`);
                        this.hp -= monster.power - this.defense + 20
                    }
                    //makes it so that you don't have a long line for each turn
                    rl.question(`Next Turn?`, () => {
                        console.clear()
                        this.combat()
                    })
                } else {
                    rl.question(`Please enter a valid action`, () => {
                        console.clear()
                        this.combat()
                    })

                }

            })
            //checks who dies first
            //monster will always die first
        } else if (monster.hp <= 0) {
            console.log(`${monster.name} has been hunted`);
            player.money += Math.floor(monster.value);
            endLoop = true;
            this.monstersKilled++
            postFight()
        } else if (player.hp <= 0) {
            rl.question(`Game Over`, () => {
                rl.close();
            })
        }
    }
}
//variables for our Hero
let hName = ''
let hPower = 40
let hKills = 0
let hMoney = 30
let hDefense = 15
let hHp = 100
//new hero creation
let player = new Hero(hName, hHp, hPower, hKills, hMoney, hDefense, 1, 1, 0)
//tracker for the monsters killed, will eventually have an object that'll save game data

//game loop variables
let turns = 0;
let storyEvent1 = false;

function gameStart() {
    //Hunting monsters
    //diffculty scales 
    //story progression follows player.monstersKilled
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
    } else if (player.monstersKilled < 5 && player.monstersKilled > 0) {
        //story event 1
        //balance the boss to make it challengeing and fun 
        if (player.monstersKilled == 4) {
            console.clear()
            console.log("You approach the den of a beast unlike any other you've seen.");
            console.log("As you approach it's wings unfurl in grandiose fashion");
            console.log("The legendary monster SkyBreaker approaches!!!!!!!");
            monster.name = 'SkyBreaker'
            monster.power = 50
            monster.hp = 300
            monster.armor = 0
            monster.value = 100
            storyEvent1 = true;
            player.combat()
        } else {
            console.clear()
            monster.newMonster();
            console.log(`-----${player.name} goes for a hunt!-----`);
            console.log(`${monster.name} attacks!!`);
            player.combat()
        }
        //raises the monsters stats to scale with the player
    } else if (player.monstersKilled >= 5) {
        console.clear()
        monster.newMonster();
        monster.power += randomNumber(10, 60)
        console.log(`-----${player.name} goes for a hunt!-----`);
        console.log(`${monster.name} attacks!!`);
        player.combat()
        player.monstersKilled++
    }

}

//everything that happens after a hunt
//include merchant, story scenes, and will include save states
function postFight() {

    if (endLoop == true) {
        if (gameEnd == false) {
            //only active after the first story event
            if (player.monstersKilled == 5) {
                console.log("You deliver the monster's head to the guild, suprised as ever they promote you to elite rank");
                console.log("Your max hp increases by 100 and your weapon and armor improve");
                hHp += 100
                player.power += 60
                player.defense += 20
            }
            //resets player hp
            player.hp = hHp;
            //shop function
            function merchant() {
                console.log('-------Hello there! Welcome to my shop, please have a look below-------');
                console.log('gold: ' + player.money);
                console.log('power: ' + Math.floor(player.power));
                console.log('defense: ' + Math.floor(player.defense));
                //sets what items are for sale 
                //scales with the player's purchases
                let itemsForSale = {
                    armor: {
                        item: 'armor upgrade',
                        defense: 10,
                        price: 30 * player.dUpgrade
                    },
                    weapon: {
                        item: 'weapon upgrade',
                        power: 30,
                        price: 30 * player.wUpgrade
                    }
                }
                console.log(itemsForSale.armor.item + ' Grants ' + itemsForSale.armor.defense + ' defense' + ' cost: ' + itemsForSale.armor.price);
                console.log(itemsForSale.weapon.item + ' Grants ' + itemsForSale.weapon.power + ' power' + ' cost: ' + itemsForSale.weapon.price);
                rl.question(`Enter The name of the item you want below, or type leave to exit the shop `, (item) => {
                    //checks which item was purchased
                    //if the player doesn't have enough money they can't buy any "Sorry link I don't give credit"
                    //works fine, but will need to build on it when items are added
                    function buyItem() {
                        if (item.toLowerCase() == itemsForSale.weapon.item) {
                            if (itemsForSale.weapon.price > player.money) {
                                rl.question(`Merchant: Sorry bud you ain't got enough money`, () => {
                                    console.clear()
                                    merchant()
                                })
                            } else {
                                player.power += itemsForSale.weapon.power
                                player.money -= itemsForSale.weapon.price
                                player.wUpgrade++
                                console.log('Thanks for your purchase');
                                console.clear()
                                merchant()
                            }
                        } else if (item.toLowerCase() == itemsForSale.armor.item) {
                            if (itemsForSale.armor.price > player.money) {
                                rl.question(`Merchant: Sorry bud you ain't got enough money`, () => {
                                    console.clear()
                                    merchant()
                                })
                            } else {
                                player.defense += itemsForSale.armor.defense
                                player.money -= itemsForSale.armor.price
                                player.dUpgrade++
                                console.log('Thanks for your purchase');
                                console.clear()
                                merchant()
                            }
                        } else if (item.toLowerCase() == 'leave') {
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
//disclaimer is to prevent a lawsuit
console.log("DISCLAIMER: Monster Hunter and all associated products are owned by Capcom this a fan project that merely uses the monster's names");
rl.question(`What is your name? `, name => {
    player.name = name;
    rl.question(`Begin? ${player.name}`, () => {
        gameStart()
    })
})