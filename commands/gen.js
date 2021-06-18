const {
    MessageEmbed
} = require('discord.js');
const fs = require('fs');

//vpn
const {nord} = require('../json/nord.json')
const {vyper} = require('../json/vyper.json')
const {hma} = require('../json/hma.json')
const {ipvanish} = require('../json/ipvanish.json')
const {windscribe} = require('../json/windscribe.json')

//gaming
const {origin} = require('../json/origin.json')
const {steam} = require('../json/steam.json')
const {uplay} = require('../json/uplay.json')
const {minecraft} = require('../json/minecraft.json')

//streaming
const {disneyplus} = require('../json/disneyplus.json')
const {hulu} = require('../json/hulu.json')
const {netflix} = require('../json/netflix.json')
const {crunchyroll} = require('../json/crunchyroll.json')
const {pornhub} = require('../json/pornhub.json')

//etc
const {meganz} = require('../json/meganz.json')

module.exports = {
    name: 'gen',
    description: 'Account gen',
    args: true,
    execute: async function (client, message, args) {
        if (!message.member.roles.cache.has('770007064004657163')) return message.channel.send("You don't have Gen role!");
        
        if(args[0] == "stock"){
            //vpn
            var snordvpn = nord.length;
            var svypervpn = vyper.length;
            var shmavpn = hma.length;
            var sipvanishvpn = ipvanish.length;
            var swindscribe = windscribe.length;

            //gaming
            var sorigin = origin.length;
            var ssteam = steam.length;
            var suplay = uplay.length;
            var sminecraft = minecraft.length;

            //streaming
            var sdisneyplus = disneyplus.length;
            var shulu = hulu.length;
            var snetflix = netflix.length;
            var scrunchyroll = crunchyroll.length;
            var spornhub = pornhub.length;

            //etc
            var smeganz = meganz.length;

            const embed = new MessageEmbed()
                .setColor('#0099FF')
                .setTitle('ACCOUNT STOCK')
                .addFields({
                    name: 'VPN',
                    value: `Nord VPN have **` + snordvpn + `** stock\nVyperVPN have **` + svypervpn + `** stock\nHideMyAss VPN have **` + shmavpn + `** stock\nIPVanish VPN have **` + sipvanishvpn + `** stock\nWindscribe have **` + swindscribe + `** stock`
                },{
                    name: 'Gaming',
                    value: `Origin have **` + sorigin + `** stock\nSteam have **` + ssteam + `** stock\nUplay have **` + suplay + `** stock\nMinecraft have **` + sminecraft + `** stock`
                },{
                    name: 'Streaming',
                    value: `Disney Plus have **` + sdisneyplus + `** stock\nHulu have **` + shulu + `** stock\nNetflix have **` + snetflix + `** stock\nCrunchyroll have **` + scrunchyroll + `** stock\nPornhub have **` + spornhub + `** stock`
                },{
                    name: 'Etc',
                    value: `Mega.nz have **` + smeganz + `** stock`
                });
            message.channel.send(embed)
        }
        else if (args[0] == "nord") {
            fs.readFile('./json/nord.json', 'utf-8', function (err, data) {
                if (err) throw err
                var arrayOfObjects = JSON.parse(data)
                var length = arrayOfObjects.nord.length;
                if (length == 0) return message.channel.send("I don't have any account right now :cry:")

                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle('NORDVPN ACCOUNT GENERATED!')
                    .addFields({
                        name: 'Email or Username',
                        value: arrayOfObjects.nord[length - 1].email
                    }, {
                        name: 'Password',
                        value: arrayOfObjects.nord[length - 1].password
                    }, {
                        name: 'Expiration Date',
                        value: arrayOfObjects.nord[length - 1].exp
                    });
                message.author.send(embed).catch(() => {
                    message.reply(`I can't send to your DM. Please make sure your privacy setting "Allow direct messages from server member" is enabled`)
                    setInterval(function () {
                        process.exit();
                    }, 3000)
                })
                setInterval(function () {
                    arrayOfObjects.nord.pop()
                    fs.writeFile('./json/nord.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                        if (err) throw err
                    })
                }, 5000)
            })
            setInterval(function () {
                process.exit();
            }, 10000)

        } else if (args[0] == "vypervpn") {
            fs.readFile('./json/vyper.json', 'utf-8', function (err, data) {
                if (err) throw err
                var arrayOfObjects = JSON.parse(data)
                var length = arrayOfObjects.vyper.length;
                if (length == 0) return message.channel.send("I don't have any account right now :cry:")

                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle('VYPERVPN ACCOUNT GENERATED!')
                    .addFields({
                        name: 'Email or Username',
                        value: arrayOfObjects.vyper[length - 1].email
                    }, {
                        name: 'Password',
                        value: arrayOfObjects.vyper[length - 1].password
                    }, {
                        name: 'Expiration Date',
                        value: arrayOfObjects.vyper[length - 1].exp
                    });
                    message.author.send(embed).catch(() => {
                        message.reply(`I can't send to your DM. Please make sure your privacy setting "Allow direct messages from server member" is enabled`)
                        setInterval(function () {
                            process.exit();
                        }, 3000)
                    })
                    setInterval(function () {
                        arrayOfObjects.vyper.pop()
                        fs.writeFile('./json/vyper.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                            if (err) throw err
                        })
                    }, 5000)
            })
            setInterval(function () {
                process.exit();
            }, 10000)

        } else if (args[0] == "hma") {
            fs.readFile('./json/hma.json', 'utf-8', function (err, data) {
                if (err) throw err
                var arrayOfObjects = JSON.parse(data)
                var length = arrayOfObjects.hma.length;
                if (length == 0) return message.channel.send("I don't have any account right now :cry:")

                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle('HMA ACCOUNT GENERATED!')
                    .addFields({
                        name: 'Email or Username',
                        value: arrayOfObjects.hma[length - 1].email
                    }, {
                        name: 'Password',
                        value: arrayOfObjects.hma[length - 1].password
                    }, {
                        name: 'Expiration Date',
                        value: arrayOfObjects.hma[length - 1].exp
                    });
                    message.author.send(embed).catch(() => {
                        message.reply(`I can't send to your DM. Please make sure your privacy setting "Allow direct messages from server member" is enabled`)
                        setInterval(function () {
                            process.exit();
                        }, 3000)
                    })
                    setInterval(function () {
                        arrayOfObjects.hma.pop()
                        fs.writeFile('./json/hma.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                            if (err) throw err
                        })
                    }, 5000)
            })
            setInterval(function () {
                process.exit();
            }, 10000)

        } else if (args[0] == "ipvanish") {
            fs.readFile('./json/ipvanish.json', 'utf-8', function (err, data) {
                if (err) throw err
                var arrayOfObjects = JSON.parse(data)
                var length = arrayOfObjects.ipvanish.length;
                if (length == 0) return message.channel.send("I don't have any account right now :cry:")

                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle('IPVANISH VPN ACCOUNT GENERATED!')
                    .addFields({
                        name: 'Email or Username',
                        value: arrayOfObjects.ipvanish[length - 1].email
                    }, {
                        name: 'Password',
                        value: arrayOfObjects.ipvanish[length - 1].password
                    }, {
                        name: 'Expiration Date',
                        value: arrayOfObjects.ipvanish[length - 1].exp
                    });
                    message.author.send(embed).catch(() => {
                        message.reply(`I can't send to your DM. Please make sure your privacy setting "Allow direct messages from server member" is enabled`)
                        setInterval(function () {
                            process.exit();
                        }, 3000)
                    })
                    setInterval(function () {
                        arrayOfObjects.ipvanish.pop()
                        fs.writeFile('./json/ipvanish.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                            if (err) throw err
                        })
                    }, 5000)
            })
            setInterval(function () {
                process.exit();
            }, 10000)

        } else if (args[0] == "windscribe") {
            fs.readFile('./json/windscribe.json', 'utf-8', function (err, data) {
                if (err) throw err
                var arrayOfObjects = JSON.parse(data)
                var length = arrayOfObjects.windscribe.length;
                if (length == 0) return message.channel.send("I don't have any account right now :cry:")

                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle('WINDSCRIBE VPN ACCOUNT GENERATED!')
                    .addFields({
                        name: 'Email or Username',
                        value: arrayOfObjects.windscribe[length - 1].email
                    }, {
                        name: 'Password',
                        value: arrayOfObjects.windscribe[length - 1].password
                    }, {
                        name: 'Expiration Date',
                        value: arrayOfObjects.windscribe[length - 1].exp
                    });
                    message.author.send(embed).catch(() => {
                        message.reply(`I can't send to your DM. Please make sure your privacy setting "Allow direct messages from server member" is enabled`)
                        setInterval(function () {
                            process.exit();
                        }, 3000)
                    })
                    setInterval(function () {
                        arrayOfObjects.windscribe.pop()
                        fs.writeFile('./json/windscribe.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                            if (err) throw err
                        })
                    }, 5000)
            })
            setInterval(function () {
                process.exit();
            }, 10000)

        }

        /* GAMING */
        else if (args[0] == "origin") {
            fs.readFile('./json/origin.json', 'utf-8', function (err, data) {
                if (err) throw err
                var arrayOfObjects = JSON.parse(data)
                var length = arrayOfObjects.origin.length;
                if (length == 0) return message.channel.send("I don't have any account right now :cry:")

                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle('ORIGIN ACCOUNT GENERATED!')
                    .addFields({
                        name: 'Email or Username',
                        value: arrayOfObjects.origin[length - 1].email
                    }, {
                        name: 'Password',
                        value: arrayOfObjects.origin[length - 1].password
                    }, {
                        name: 'Specification or Game List',
                        value: arrayOfObjects.origin[length - 1].spec
                    });
                    message.author.send(embed).catch(() => {
                        message.reply(`I can't send to your DM. Please make sure your privacy setting "Allow direct messages from server member" is enabled`)
                        setInterval(function () {
                            process.exit();
                        }, 3000)
                    })
                    setInterval(function () {
                        arrayOfObjects.origin.pop()
                        fs.writeFile('./json/origin.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                            if (err) throw err
                        })
                    }, 5000)
            })
            setInterval(function () {
                process.exit();
            }, 10000)

        } else if (args[0] == "steam") {
            fs.readFile('./json/steam.json', 'utf-8', function (err, data) {
                if (err) throw err
                var arrayOfObjects = JSON.parse(data)
                var length = arrayOfObjects.steam.length;
                if (length == 0) return message.channel.send("I don't have any account right now :cry:")

                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle('STEAM ACCOUNT GENERATED!')
                    .addFields({
                        name: 'Email or Username',
                        value: arrayOfObjects.steam[length - 1].email
                    }, {
                        name: 'Password',
                        value: arrayOfObjects.steam[length - 1].password
                    }, {
                        name: 'Specification or Game List',
                        value: arrayOfObjects.steam[length - 1].spec
                    });
                    message.author.send(embed).catch(() => {
                        message.reply(`I can't send to your DM. Please make sure your privacy setting "Allow direct messages from server member" is enabled`)
                        setInterval(function () {
                            process.exit();
                        }, 3000)
                    })
                    setInterval(function () {
                        arrayOfObjects.steam.pop()
                        fs.writeFile('./json/steam.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                            if (err) throw err
                        })
                    }, 5000)
            })
            setInterval(function () {
                process.exit();
            }, 10000)

        } else if (args[0] == "uplay") {
            fs.readFile('./json/uplay.json', 'utf-8', function (err, data) {
                if (err) throw err
                var arrayOfObjects = JSON.parse(data)
                var length = arrayOfObjects.uplay.length;
                if (length == 0) return message.channel.send("I don't have any account right now :cry:")

                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle('UPLAY ACCOUNT GENERATED!')
                    .addFields({
                        name: 'Email or Username',
                        value: arrayOfObjects.uplay[length - 1].email
                    }, {
                        name: 'Password',
                        value: arrayOfObjects.uplay[length - 1].password
                    }, {
                        name: 'Specification or Game List',
                        value: arrayOfObjects.uplay[length - 1].spec
                    });
                    message.author.send(embed).catch(() => {
                        message.reply(`I can't send to your DM. Please make sure your privacy setting "Allow direct messages from server member" is enabled`)
                        setInterval(function () {
                            process.exit();
                        }, 3000)
                    })
                    setInterval(function () {
                        arrayOfObjects.uplay.pop()
                        fs.writeFile('./json/uplay.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                            if (err) throw err
                        })
                    }, 5000)
            })
            setInterval(function () {
                process.exit();
            }, 10000)

        } else if (args[0] == "minecraft") {
            fs.readFile('./json/minecraft.json', 'utf-8', function (err, data) {
                if (err) throw err
                var arrayOfObjects = JSON.parse(data)
                var length = arrayOfObjects.minecraft.length;
                if (length == 0) return message.channel.send("I don't have any account right now :cry:")

                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle('MINECRAFT ACCOUNT GENERATED!')
                    .addFields({
                        name: 'Email or Username',
                        value: arrayOfObjects.minecraft[length - 1].email
                    }, {
                        name: 'Password',
                        value: arrayOfObjects.minecraft[length - 1].password
                    }, {
                        name: 'Specification or Game List',
                        value: arrayOfObjects.minecraft[length - 1].spec
                    });
                    message.author.send(embed).catch(() => {
                        message.reply(`I can't send to your DM. Please make sure your privacy setting "Allow direct messages from server member" is enabled`)
                        setInterval(function () {
                            process.exit();
                        }, 3000)
                    })
                    setInterval(function () {
                        arrayOfObjects.minecraft.pop()
                        fs.writeFile('./json/minecraft.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                            if (err) throw err
                        })
                    }, 5000)
            })
            setInterval(function () {
                process.exit();
            }, 10000)

        }

        /* STREAMING */
        else if (args[0] == "disneyplus") {
            fs.readFile('./json/disneyplus.json', 'utf-8', function (err, data) {
                if (err) throw err
                var arrayOfObjects = JSON.parse(data)
                var length = arrayOfObjects.disneyplus.length;
                if (length == 0) return message.channel.send("I don't have any account right now :cry:")

                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle('DISNEY+ ACCOUNT GENERATED!')
                    .addFields({
                        name: 'Email or Username',
                        value: arrayOfObjects.disneyplus[length - 1].email
                    }, {
                        name: 'Password',
                        value: arrayOfObjects.disneyplus[length - 1].password
                    }, {
                        name: 'Expiration Date',
                        value: arrayOfObjects.disneyplus[length - 1].exp
                    });
                    message.author.send(embed).catch(() => {
                        message.reply(`I can't send to your DM. Please make sure your privacy setting "Allow direct messages from server member" is enabled`)
                        setInterval(function () {
                            process.exit();
                        }, 3000)
                    })
                    setInterval(function () {
                        arrayOfObjects.disneyplus.pop()
                        fs.writeFile('./json/disneyplus.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                            if (err) throw err
                        })
                    }, 5000)
            })
            setInterval(function () {
                process.exit();
            }, 10000)

        } else if (args[0] == "hulu") {
            fs.readFile('./json/hulu.json', 'utf-8', function (err, data) {
                if (err) throw err
                var arrayOfObjects = JSON.parse(data)
                var length = arrayOfObjects.hulu.length;
                if (length == 0) return message.channel.send("I don't have any account right now :cry:")

                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle('HULU ACCOUNT GENERATED!')
                    .addFields({
                        name: 'Email or Username',
                        value: arrayOfObjects.hulu[length - 1].email
                    }, {
                        name: 'Password',
                        value: arrayOfObjects.hulu[length - 1].password
                    }, {
                        name: 'Expiration Date',
                        value: arrayOfObjects.hulu[length - 1].exp
                    });
                    message.author.send(embed).catch(() => {
                        message.reply(`I can't send to your DM. Please make sure your privacy setting "Allow direct messages from server member" is enabled`)
                        setInterval(function () {
                            process.exit();
                        }, 3000)
                    })
                    setInterval(function () {
                        arrayOfObjects.hulu.pop()
                        fs.writeFile('./json/hulu.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                            if (err) throw err
                        })
                    }, 5000)
            })
            setInterval(function () {
                process.exit();
            }, 10000)

        } else if (args[0] == "netflix") {
            fs.readFile('./json/netflix.json', 'utf-8', function (err, data) {
                if (err) throw err
                var arrayOfObjects = JSON.parse(data)
                var length = arrayOfObjects.netflix.length;
                if (length == 0) return message.channel.send("I don't have any account right now :cry:")

                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle('NETFLIX ACCOUNT GENERATED!')
                    .addFields({
                        name: 'Email or Username',
                        value: arrayOfObjects.netflix[length - 1].email
                    }, {
                        name: 'Password',
                        value: arrayOfObjects.netflix[length - 1].password
                    }, {
                        name: 'Expiration Date',
                        value: arrayOfObjects.netflix[length - 1].exp
                    });
                    message.author.send(embed).catch(() => {
                        message.reply(`I can't send to your DM. Please make sure your privacy setting "Allow direct messages from server member" is enabled`)
                        setInterval(function () {
                            process.exit();
                        }, 3000)
                    })
                    setInterval(function () {
                        arrayOfObjects.netflix.pop()
                        fs.writeFile('./json/netflix.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                            if (err) throw err
                        })
                    }, 5000)
            })
            setInterval(function () {
                process.exit();
            }, 10000)

        } else if (args[0] == "crunchyroll") {
            fs.readFile('./json/crunchyroll.json', 'utf-8', function (err, data) {
                if (err) throw err
                var arrayOfObjects = JSON.parse(data)
                var length = arrayOfObjects.crunchyroll.length;
                if (length == 0) return message.channel.send("I don't have any account right now :cry:")

                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle('CRUNCHYROLL ACCOUNT GENERATED!')
                    .addFields({
                        name: 'Email or Username',
                        value: arrayOfObjects.crunchyroll[length - 1].email
                    }, {
                        name: 'Password',
                        value: arrayOfObjects.crunchyroll[length - 1].password
                    }, {
                        name: 'Expiration Date',
                        value: arrayOfObjects.crunchyroll[length - 1].exp
                    });
                    message.author.send(embed).catch(() => {
                        message.reply(`I can't send to your DM. Please make sure your privacy setting "Allow direct messages from server member" is enabled`)
                        setInterval(function () {
                            process.exit();
                        }, 3000)
                    })
                    setInterval(function () {
                        arrayOfObjects.crunchyroll.pop()
                        fs.writeFile('./json/crunchyroll.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                            if (err) throw err
                        })
                    }, 5000)
            })
            setInterval(function () {
                process.exit();
            }, 10000)

        } else if (args[0] == "pornhub") {
            fs.readFile('./json/pornhub.json', 'utf-8', function (err, data) {
                if (err) throw err
                var arrayOfObjects = JSON.parse(data)
                var length = arrayOfObjects.pornhub.length;
                if (length == 0) return message.channel.send("I don't have any account right now :cry:")

                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle('PORNHUB ACCOUNT GENERATED!')
                    .addFields({
                        name: 'Email or Username',
                        value: arrayOfObjects.pornhub[length - 1].email
                    }, {
                        name: 'Password',
                        value: arrayOfObjects.pornhub[length - 1].password
                    }, {
                        name: 'Expiration Date',
                        value: arrayOfObjects.pornhub[length - 1].exp
                    });
                    message.author.send(embed).catch(() => {
                        message.reply(`I can't send to your DM. Please make sure your privacy setting "Allow direct messages from server member" is enabled`)
                        setInterval(function () {
                            process.exit();
                        }, 3000)
                    })
                    setInterval(function () {
                        arrayOfObjects.pornhub.pop()
                        fs.writeFile('./json/pornhub.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                            if (err) throw err
                        })
                    }, 5000)
            })
            setInterval(function () {
                process.exit();
            }, 10000)

        }

        /* ETC */
        else if (args[0] == "meganz") {
            fs.readFile('./json/meganz.json', 'utf-8', function (err, data) {
                if (err) throw err
                var arrayOfObjects = JSON.parse(data)
                var length = arrayOfObjects.meganz.length;
                if (length == 0) return message.channel.send("I don't have any account right now :cry:")

                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle('MEGA.NZ ACCOUNT GENERATED!')
                    .addFields({
                        name: 'Email or Username',
                        value: arrayOfObjects.meganz[length - 1].email
                    }, {
                        name: 'Password',
                        value: arrayOfObjects.meganz[length - 1].password
                    }, {
                        name: 'Detail',
                        value: arrayOfObjects.meganz[length - 1].detail
                    });
                    message.author.send(embed).catch(() => {
                        message.reply(`I can't send to your DM. Please make sure your privacy setting "Allow direct messages from server member" is enabled`)
                        setInterval(function () {
                            process.exit();
                        }, 3000)
                    })
                    setInterval(function () {
                        arrayOfObjects.meganz.pop()
                        fs.writeFile('./json/meganz.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                            if (err) throw err
                        })
                    }, 5000)
            })
            setInterval(function () {
                process.exit();
            }, 10000)

        }

    },
};