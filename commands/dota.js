const {
    MessageEmbed
} = require('discord.js');
const axios = require('axios');
var SteamID = require('steamid');

const {
    sapi,
} = require('../json/config.json');
const {
    result,
} = require('../json/dota2hero.json');
const {
    gmode,
} = require('../json/dota2gamemode.json');
const {
    lobby,
} = require('../json/dota2lobbytype.json');

module.exports = {
    name: 'dota',
    description: 'Get dota stats',
    args: true,
    execute: async function (client, message, args) {
        axios.get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${sapi}&vanityurl=${args[1]}`).then(response => {
            data = response.data;
            var s64 = data.response.steamid;

            var sid = new SteamID(s64);
            var s32 = sid.getSteam3RenderedID();
            var s32s = s32.slice(5, s32.length - 1);
            //console.log(s32s);

            if (args[0] === "player") {
                axios.get(`https://api.opendota.com/api/players/${s32s}`).then(response => {

                    player = response.data;
                    var crank = player.leaderboard_rank;
                    var rank = player.rank_tier;

                    if (rank != null) {
                        function estimatedMMR(mmr) {
                            if (mmr == 80) {
                                return "5420+";
                            } else {
                                var r1 = mmr.slice(0, 1) - 1;
                                var r2 = mmr.slice(-1)

                                var first = r1 * 5 * 154;
                                var second = r2 * 154;
                                var res = (first + second) - 50;
                                return res;
                            }

                        }
                        if (crank != null) {
                            var rankImage;
                            if (crank >= 1 && crank <= 10) {
                                rankImage = "https://dota2freaks.com/wp-content/uploads/sites/10/2020/02/dota-2-rank-immortal-top-1.png"
                            } else if (crank >= 11 && crank <= 100) {
                                rankImage = "https://dota2freaks.com/wp-content/uploads/sites/10/2020/02/dota-2-rank-immortal-top-100.png"
                            } else if (crank >= 101 && crank <= 5000) {
                                rankImage = "https://dota2freaks.com/wp-content/uploads/sites/10/2020/02/dota-2-rank-immortal-placed.png"
                            } else {
                                rankImage = "https://dota2freaks.com/wp-content/uploads/sites/10/2020/02/dota-2-rank-immortal-placed.png"
                            }

                            const embed = new MessageEmbed()
                                .setColor('#0099FF')
                                .setTitle('DOTA 2 PLAYER LOOKUP')
                                .setThumbnail(rankImage)
                                .addFields({
                                    name: 'Account ID',
                                    value: player.profile.account_id
                                }, {
                                    name: 'Steam ID',
                                    value: player.profile.steamid
                                }, {
                                    name: 'IGN',
                                    value: player.profile.personaname
                                }, {
                                    name: 'Estimated MMR',
                                    value: estimatedMMR(rank)
                                }, {
                                    name: 'Leaderboard Rank',
                                    value: crank
                                }, {
                                    name: 'Country',
                                    value: `\:flag_${player.profile.loccountrycode.toLowerCase()}:`
                                });
                            message.channel.send(embed);
                        } else {
                            var str = rank.toString();
                            var a1 = str.slice(0, 1);
                            var a2 = str.slice(-1)
                            if (a1 == "1") {
                                a1 = "herold";
                            } else if (a1 == "2") {
                                a1 = "guardian";
                            } else if (a1 == "3") {
                                a1 = "crusader";
                            } else if (a1 == "4") {
                                a1 = "archon";
                            } else if (a1 == "5") {
                                a1 = "legend";
                            } else if (a1 == "6") {
                                a1 = "ancient";
                            } else if (a1 == "7") {
                                a1 = "divine";
                            }

                            const embed = new MessageEmbed()
                                .setColor('#0099FF')
                                .setTitle('DOTA 2 PLAYER LOOKUP')
                                .setThumbnail(`https://dota2freaks.com/wp-content/uploads/sites/10/2020/02/dota-2-rank-${a1}-${a2}.png`)
                                .addFields({
                                    name: 'Account ID',
                                    value: player.profile.account_id
                                }, {
                                    name: 'IGN',
                                    value: player.profile.personaname
                                }, {
                                    name: 'Steam ID',
                                    value: player.profile.steamid
                                }, {
                                    name: 'Estimated MMR',
                                    value: estimatedMMR(rank.toString())
                                }, {
                                    name: 'Country',
                                    value: `\:flag_${player.profile.loccountrycode.toLowerCase()}:`
                                });
                            message.channel.send(embed);
                        }
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#0099FF')
                            .setTitle('DOTA 2 PLAYER LOOKUP')
                            .setThumbnail(player.profile.avatarfull)
                            .addFields({
                                name: 'Account ID',
                                value: player.profile.account_id
                            }, {
                                name: 'IGN',
                                value: player.profile.personaname
                            }, {
                                name: 'Steam ID',
                                value: player.profile.steamid
                            }, {
                                name: 'Estimated MMR',
                                value: player.mmr_estimate.estimate
                            }, {
                                name: 'Country',
                                value: `\:flag_${player.profile.loccountrycode.toLowerCase()}:`
                            });
                        message.channel.send(embed);
                    }
                }).catch((e) => {
                    console.log(e)
                    message.channel.send("An error occured. `;help dota` to see how to use.")
                });
            } else if (args[0] == "recentmatch") {
                axios.get(`https://api.opendota.com/api/players/${s32s}/recentMatches`).then(response => {
                    rMatch = response.data;

                    var minutes = Math.floor(rMatch[0].duration / 60);
                    var myDate = new Date(rMatch[0].start_time * 1000);
                    var team;

                    function faction(val) {
                        if (val >= 0 && val <= 127) {
                            team = "Radiant";
                            return "Radiant";
                        } else {
                            return "Dire";
                        }
                    }

                    function isWin(value) {
                        if (team == "Radiant" && value == true) {
                            return "Yes"
                        } else {
                            return "No"
                        }
                    }

                    function leave(valu) {
                        if (valu == 0) {
                            return "Didn't leave";
                        } else if (valu == 1) {
                            return "Left safely";
                        } else if (valu >= 2) {
                            return "Abandoned";
                        } else {
                            return "Can't fetch the data";
                        }
                    }

                    function pSize(va) {
                        if (va == 1) {
                            return "Solo";
                        } else {
                            return va;
                        }
                    }

                    var hero = result.heroes[rMatch[0].hero_id].name
                    var nhero = hero.slice(14);
                    const embed = new MessageEmbed()
                        .setColor('#0099FF')
                        .setTitle(`DOTA 2 ${args[1]} RECENT MATCH`)
                        .setThumbnail(`http://cdn.dota2.com/apps/dota2/images/heroes/${nhero}_sb.png`)
                        .addFields({
                            name: 'Match ID',
                            value: rMatch[0].match_id,
                            inline: true
                        }, {
                            name: 'Faction',
                            value: faction(rMatch[0].player_slot),
                            inline: true
                        }, {
                            name: 'Win?',
                            value: isWin(rMatch[0].radiant_win),
                            inline: true
                        }, {
                            name: 'Duration',
                            value: minutes + " min",
                            inline: true
                        }, {
                            name: 'Game Mode',
                            value: gmode.mode[rMatch[0].game_mode].name,
                            inline: true
                        }, {
                            name: 'Lobby Type',
                            value: lobby.type[rMatch[0].lobby_type].name,
                            inline: true
                        }, {
                            name: 'Kills',
                            value: rMatch[0].kills,
                            inline: true
                        }, {
                            name: 'Deaths',
                            value: rMatch[0].deaths,
                            inline: true
                        }, {
                            name: 'Assists',
                            value: rMatch[0].assists,
                            inline: true
                        }, {
                            name: 'XPM',
                            value: rMatch[0].xp_per_min,
                            inline: true
                        }, {
                            name: 'GPM',
                            value: rMatch[0].gold_per_min,
                            inline: true
                        }, {
                            name: 'Last Hit',
                            value: rMatch[0].last_hits,
                            inline: true
                        }, {
                            name: 'Match Date',
                            value: myDate,
                            inline: true
                        }, {
                            name: 'Leave',
                            value: leave(rMatch[0].leaver_status),
                            inline: true
                        }, {
                            name: 'Party Size',
                            value: pSize(rMatch[0].party_size),
                            inline: true
                        });
                    message.channel.send(embed);
                }).catch((e) => {
                    message.channel.send("**An error occured**")
                });
            }

        }).catch((e) => {
            console.log(e)
            message.channel.send("An error occured. `;help dota` to see how to use.")
        });
    },
};