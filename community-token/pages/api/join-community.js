export default async function handler(req, res) {
    // MORALIS INIT
    const Moralis = require("moralis/node");
    const serverUrl = process.env.SERVER_URL;
    const appId = process.env.APP_ID;
    const masterKey = process.env.MASTER_KEY;
    await Moralis.start({ serverUrl, appId, masterKey });

    const body = req.body;
    const communityName = body.communityName
    const discordName = body.discordName;
    let response = {
        msg: "processing"
    }

    // QUERY JOINED COMMUNITIES FOR THIS PARTICULAR USER
    const User = Moralis.Object.extend("UserInfo");
    const query = new Moralis.Query(User);
    query.equalTo("EthAddress", body.user);
    let user = await query.first({ useMasterKey: true });
    if (user == null) {
        console.log("no user found, creating a user entry in UserInfo Table")
        user = new User()
        user.set("JoinedCommunities", [communityName])
        user.set("EthAddress", body.user)
        user.set("DiscordName", discordName);
        await user.save()
        response.msg = "user-saved"
    } else {
        console.log("user found, updating JoinedCommunities")
        let joinedCommunities = user.get("JoinedCommunities");
        if (joinedCommunities.includes(communityName)) {
            console.log(`${body.user} is already a member of ${communityName}`)
            response.msg = "already-joined"
        } else {
            joinedCommunities.push(communityName)
            user.set("JoinedCommunities", joinedCommunities)
            await user.save()
            response.msg = "succesfully-joined"
        }
    }
    res.status(200).json(response);
}