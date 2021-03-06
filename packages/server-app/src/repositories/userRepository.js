const {ResourceError, Result} = require("../common/results");
const {getCollection} = require("../util/db");

async function create(username, password) {
    const Users = await getCollection('users');
    const existingUser = await Users.findOne({username});

    if (existingUser)
        return Result.failure(ResourceError.ALREADY_EXISTS);

    await Users.insertOne({
        username,
        password
    });

    return Result.success();
}

async function findByUsername(username) {
    const Users = await getCollection('users');

    const user = await Users.findOne({username});

    if (!user)
        return Result.failure(ResourceError.NOT_EXISTS);

    return Result.success(user);
}

module.exports = {
    create: create,
    findByUsername: findByUsername
};