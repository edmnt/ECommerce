import { sequelize } from "../../../utils/database.js";
beforeAll(async () => {
  await sequelize.sync();
});

beforeEach(async()=>{
  await sequelize.sync({ force: true })
});

afterAll(async () => {
  await sequelize.close();
});
