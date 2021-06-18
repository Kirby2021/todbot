const fs = require('fs');

module.exports = {
    name: 'restock',
    description: 'Restock account',
    args: true,
    execute: async function (client, message, args) {
        if (!message.author.id == '348489801407922196') return message.channel.send("I'm sorry, but you can't do restock because I don't know who you are!");
        if (args[0] == "nord") {
            fs.readFile('./json/nord.json', 'utf-8', function(err, data) {
                if (err) throw err
            
                var arrayOfObjects = JSON.parse(data)
                arrayOfObjects.nord.push({
                    email: args[1],
                    password: args[2],
                    exp: args[3]
                })
            
                fs.writeFile('./json/nord.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                    if (err) throw err
                })
            })
        }
        else if (args[0] == "vyper") {
            fs.readFile('./json/vyper.json', 'utf-8', function(err, data) {
                if (err) throw err
            
                var arrayOfObjects = JSON.parse(data)
                arrayOfObjects.vyper.push({
                    email: args[1],
                    password: args[2],
                    exp: args[3]
                })
            
                fs.writeFile('./json/vyper.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                    if (err) throw err
                })
            })
        }
        else if (args[0] == "hma") {
            fs.readFile('./json/hma.json', 'utf-8', function(err, data) {
                if (err) throw err
            
                var arrayOfObjects = JSON.parse(data)
                arrayOfObjects.hma.push({
                    email: args[1],
                    password: args[2],
                    exp: args[3]
                })
            
                fs.writeFile('./json/hma.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                    if (err) throw err
                })
            })
        }
        else if (args[0] == "ipvanish") {
            fs.readFile('./json/ipvanish.json', 'utf-8', function(err, data) {
                if (err) throw err
            
                var arrayOfObjects = JSON.parse(data)
                arrayOfObjects.ipvanish.push({
                    email: args[1],
                    password: args[2],
                    exp: args[3]
                })
            
                fs.writeFile('./json/ipvanish.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                    if (err) throw err
                })
            })
        }
        else if (args[0] == "windscribe") {
            fs.readFile('./json/windscribe.json', 'utf-8', function(err, data) {
                if (err) throw err
            
                var arrayOfObjects = JSON.parse(data)
                arrayOfObjects.windscribe.push({
                    email: args[1],
                    password: args[2],
                    exp: args[3]
                })
            
                fs.writeFile('./json/windscribe.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                    if (err) throw err
                })
            })
        }

        /* GAMING */

        else if (args[0] == "origin") {
            fs.readFile('./json/origin.json', 'utf-8', function(err, data) {
                if (err) throw err
            
                var arrayOfObjects = JSON.parse(data)
                arrayOfObjects.origin.push({
                    email: args[1],
                    password: args[2],
                    spec: args[3]
                })
            
                fs.writeFile('./json/origin.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                    if (err) throw err
                })
            })
        }
        else if (args[0] == "steam") {
            fs.readFile('./json/steam.json', 'utf-8', function(err, data) {
                if (err) throw err
            
                var arrayOfObjects = JSON.parse(data)
                arrayOfObjects.steam.push({
                    email: args[1],
                    password: args[2],
                    spec: args[3]
                })
            
                fs.writeFile('./json/steam.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                    if (err) throw err
                })
            })
        }
        else if (args[0] == "uplay") {
            fs.readFile('./json/uplay.json', 'utf-8', function(err, data) {
                if (err) throw err
            
                var arrayOfObjects = JSON.parse(data)
                arrayOfObjects.uplay.push({
                    email: args[1],
                    password: args[2],
                    spec: args[3]
                })
            
                fs.writeFile('./json/uplay.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                    if (err) throw err
                })
            })
        }
        else if (args[0] == "minecraft") {
            fs.readFile('./json/minecraft.json', 'utf-8', function(err, data) {
                if (err) throw err
            
                var arrayOfObjects = JSON.parse(data)
                arrayOfObjects.minecraft.push({
                    email: args[1],
                    password: args[2],
                    spec: args[3]
                })
            
                fs.writeFile('./json/minecraft.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                    if (err) throw err
                })
            })
        }

        /* STREAMING */

        else if (args[0] == "disneyplus") {
            fs.readFile('./json/disneyplus.json', 'utf-8', function(err, data) {
                if (err) throw err
            
                var arrayOfObjects = JSON.parse(data)
                arrayOfObjects.disneyplus.push({
                    email: args[1],
                    password: args[2],
                    exp: args[3]
                })
            
                fs.writeFile('./json/disneyplus.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                    if (err) throw err
                })
            })
        }
        else if (args[0] == "hulu") {
            fs.readFile('./json/hulu.json', 'utf-8', function(err, data) {
                if (err) throw err
            
                var arrayOfObjects = JSON.parse(data)
                arrayOfObjects.hulu.push({
                    email: args[1],
                    password: args[2],
                    exp: args[3]
                })
            
                fs.writeFile('./json/hulu.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                    if (err) throw err
                })
            })
        }
        else if (args[0] == "netflix") {
            fs.readFile('./json/netflix.json', 'utf-8', function(err, data) {
                if (err) throw err
            
                var arrayOfObjects = JSON.parse(data)
                arrayOfObjects.netflix.push({
                    email: args[1],
                    password: args[2],
                    exp: args[3]
                })
            
                fs.writeFile('./json/netflix.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                    if (err) throw err
                })
            })
        }
        else if (args[0] == "crunchyroll") {
            fs.readFile('./json/crunchyroll.json', 'utf-8', function(err, data) {
                if (err) throw err
            
                var arrayOfObjects = JSON.parse(data)
                arrayOfObjects.crunchyroll.push({
                    email: args[1],
                    password: args[2],
                    exp: args[3]
                })
            
                fs.writeFile('./json/crunchyroll.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                    if (err) throw err
                })
            })
        }
        else if (args[0] == "pornhub") {
            fs.readFile('./json/pornhub.json', 'utf-8', function(err, data) {
                if (err) throw err
            
                var arrayOfObjects = JSON.parse(data)
                arrayOfObjects.pornhub.push({
                    email: args[1],
                    password: args[2],
                    exp: args[3]
                })
            
                fs.writeFile('./json/pornhub.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                    if (err) throw err
                })
            })
        }

        /* ETC */

        else if (args[0] == "meganz") {
            fs.readFile('./json/meganz.json', 'utf-8', function(err, data) {
                if (err) throw err
            
                var arrayOfObjects = JSON.parse(data)
                arrayOfObjects.meganz.push({
                    email: args[1],
                    password: args[2],
                    detail: args[3]
                })
            
                fs.writeFile('./json/meganz.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                    if (err) throw err
                })
            })
        }
    },
};