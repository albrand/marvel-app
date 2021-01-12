function getRoutes(express, service) {
    const router = express.Router();

    router.get("/heroes", async (req, res) => {
        const { statuscode, data, errors } = await service.getHeroes(req);
        res.status(statuscode).json(data ? data : { errors });
    });

    router.get("/heroes/:hero_id", async (req, res) => {
        const { statuscode, data, errors } = await service.getHeroById(req);
        res.status(statuscode).json(data ? data : { errors });
    });

    return router;
}

module.exports = getRoutes;
