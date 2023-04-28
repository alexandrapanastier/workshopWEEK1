const Wilder = require("../entity/Wilder");
const Skill = require("../entity/Skill");
const dataSource = require("../utils").dataSource;
const Grade = require("../entity/Grade");

module.exports = {
  create: async(req, res) => {
    try {
      await dataSource.getRepository(Wilder).save(req.body);
      res.send("Wilder created");
    } catch (err) {
      console.log(err);
      res.send("Error while creating the Wilder");
    }
  },
  read: async (req, res) => {
    try {
      const grades = await dataSource.getRepository(Grade).find();
      console.log(grades);
      const wilders = await dataSource.getRepository(Wilder).find();
      console.log("wilders", wilders);
      const data = wilders.map((wilder) => {
        const wilderGrades = grades.filter(
          (grade) => grade.wilder.id === wilder.id
        );
        const wilderGradesLean = wilderGrades.map((el) => {
          return { title: el.skill.name, votes: el.grade };
        });
        const result = {
          ...wilder,
          skills: wilderGradesLean,
        };
        console.log(result);
        return result;
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      res.send("error while querying wilders");
    }
  },
  delete: async (req, res) => {
    try {
      await dataSource.getRepository(Wilder).delete(req.params.id);
      res.send("Wilder deleted");
    } catch (err) {
      console.log(err);
      res.send("Error while deleting the wilder");
    }
  },
  update: async (req, res) => {
    try {
      const updateResult = await dataSource
        .getRepository(Wilder)
        .update(req.params.id, req.body);
      res.send(updateResult);
    } catch (err) {
      console.log(err);
      res.send("Error while updating");
    }
  },
  addSkill: async (req, res) => {
    try {
        const wilderToUpdate = await dataSource
        .getRepository(Wilder)
        .findOneBy({name: req.body.wildername});
        console.log(wilderToUpdate);

        const skillToAdd = await dataSource
        .getRepository(Skill)
        .findOneBy({name: req.body.skillname});

        wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];
        await dataSource.getRepository(Wilder).save(wilderToUpdate)
        res.send("Skill added to wilder");

    }catch(error) {
            res.send("Error while creating skill");
    }
  },
};