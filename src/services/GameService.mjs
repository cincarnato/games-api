import GameModel from "../models/GameModel.mjs";

export const createGame = async (payload) => {
    let game = new GameModel(payload)
    await game.save()
    return game
}


export const updateGame = async (id, payload) => {
    const game = await GameModel.findById(id)
    game.name = payload.name;
    game.company = payload.company;
    game.price = payload.price;
    game.description = payload.description;
    game.coverImage = payload.coverImage;
    game.releaseDate = payload.releaseDate;
    await game.save();
    return game
}


export const deleteGame = async (id) => {
    return GameModel.deleteOne({ _id: id });
}


export const findGameById = async (id) => {
    return GameModel.findById(id)
}


export const fetchGames = async () => {
    return GameModel.find()
}
