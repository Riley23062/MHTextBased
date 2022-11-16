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
        if (probability(0.002)) {
            this.name = 'Imposter'
            console.log('Looking sus!! the imposter strikes!!!!');
        }
    }
}
let monster = new Monster('', 0, 0)



class Hero {
    constructor(name, power, job, kills, money) {
        this.name = name
        this.power = power
        this.job = job
        this.kills = kills
        this.money = money
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
let hPower = Math.random(90) * 9999;
let hJob = 'hunter'
let hKills = 0
let hMoney = 0
let player = new Hero(hName, hPower, hJob, hKills, hMoney)

let endLoop = false;
function gameStart(){
    do {
            monster.newMonster();
            console.log(`-----${player.name} goes for a hunt!-----`);
            monster.imposterStrikes()
            console.log(`${monster.name} attacks!!`);
            player.killMonster()
            player.money += monster.worth;
            endLoop = true;
            break;
    } while (endLoop = false);
    
    if (endLoop == true) {
        if (gameEnd == false) {
        rl.question(`Next hunt?`,() => {
            endLoop = false;
            gameStart()
        })
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

