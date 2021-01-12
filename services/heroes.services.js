class Heroes {
    constructor(marvelApi) {
        this.marvelApi = marvelApi;
    }

    callSucces(response) {
        return {
            statuscode: 200,
            data: response,
            errors: null,
        };
    }

    callError(errors, statuscode) {
        return {
            statuscode,
            data: null,
            errors,
        };
    }

    async getHeroes(req) {
        if (req.query?.limit <= 0) {
            return this.callError('Limit must be higher than 0.');
        }
        try {
            const response = await this.marvelApi.getHeroes(req.query.offset, req.query.limit);
            return this.callSucces(response.data);
        } catch (error) {
            console.error(error);
            return this.callError(error.message);
        }
    }

    async getHeroById(req) {
        try {
            const response = await this.marvelApi.getHeroById(req.params.hero_id);
            return this.callSucces(response);
        } catch (error) {
            console.error(error);
            return this.callError(error.message);
        }
    }

    getHeroesById(req) {
        return this.callSucces("worked");
    }
}

module.exports = Heroes;
