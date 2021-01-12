const axios = require("axios");
const config = require("../config/global.config");

class Axios {
    async getHeroes(offset, limit) {
        try {
            const response = await axios.get(
                `${config.baseUrl}/characters?apikey=${config.publicKey}&ts=${config.ts}&hash=${config.hash}&offset=${offset}&limit=${limit}`
            );
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    async getHeroById(character_id) {
        try {
            const response = await axios.get(
                `${config.baseUrl}/characters/${character_id}?apikey=${config.publicKey}&ts=${config.ts}&hash=${config.hash}`
            );
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}

module.exports = Axios;
