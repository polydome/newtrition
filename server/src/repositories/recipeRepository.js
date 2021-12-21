const {getCollection} = require("../util/db");
const {Result} = require("../common/results");
const {ObjectId} = require("mongodb");

async function create(ownerUsername, recipe) {
    const Recipes = await getCollection('recipe');

    await Recipes.insertOne({
        name: recipe.name,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        owner: ownerUsername
    });

    return Result.success();
}

async function findUserRecipes(username) {
    const Recipes = await getCollection('recipe');

    const recipes = await Recipes.find({owner: username}).toArray();

    return Result.success(recipes);
}

async function deleteRecipeById(id) {
    const Recipes = await getCollection('recipe');

    await Recipes.deleteOne({_id: ObjectId(id)});
}

async function getRecipeById(id) {
    const Recipes = await getCollection('recipe');

    return await Recipes.findOne({_id: ObjectId(id)});
}

module.exports = {
    create,
    findUserRecipes,
    deleteRecipeById,
    getRecipeById
}