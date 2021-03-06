//Require modules

const discord = require("discord.js");
const axios = require("axios")
const client = require("../haseul").client;

//Functions

handle = (message) => {
    let args = message.content.trim().split(" ");

    //Handle commands

    if (args.length < 1) return;
    switch (args[0].toLowerCase()) {

        case ".yt":
            message.channel.startTyping();
            query(args.slice(1).join(" ")).then(response => {
                message.channel.send(response);
                message.channel.stopTyping();
            }).catch(error => {
                console.error(error);
                message.channel.stopTyping();
            })


    }
}

query = (query) => {
    return new Promise((resolve, reject) => {
        if (!query) {
            resolve("\\⚠ Please provide a query to search for!");
            return;
        }
        axios.get(`https://www.youtube.com/results?search_query=${encodeURI(query)}`).then(response => {
            let search = response.data.match(/<div class="yt-lockup-content"><h3 class="yt-lockup-title "><a href="\/watch\?v=([^&"]+)/i)
            if (!search) {
                console.error("Something went wrong requesting a Youtube search.");
                return;
            }
            let video_id = search[1];
            resolve(`https://youtu.be/${video_id}`);
        }).catch(error => {
            reject(error);
        })
    })
}

module.exports = {
    handle: handle,
    query: query
}
