const dataSource = require('../utils').dataSource;
const Grade = require('../entity/Grade');
const Wilder = require('../entity/Wilder');
const Skill = require('../entity/Skill');

module.exports = {
    create : async (req, res) => {
        try {
            const wilderFromDb = await dataSource.getRepository(Wilder).findOneBy({name: req.body.wilder});
            console.log("wilderFromDb", wilderFromDb);

            const skillFromDb = await dataSource.getRepository(Skill).findOneBy({name: req.body.skill});
            console.log("skillFromDb", skillFromDb);

            await dataSource.getRepository(Grade).save({
                grade : req.body.grade,
                wilder : wilderFromDb,
                skill : skillFromDb
                });
            res.send("Grade created");
        } catch (error) {
            res.send("Failed to create Grade");
            console.error(error);
        }
    },

    read : async (req, res) => {
        try {
            const grades = await dataSource.getRepository(Grade).find();
            res.send(grades);
        } catch (error) {
            res.send("Failed to retrieve Grades");
        }
    }

}