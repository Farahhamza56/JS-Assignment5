import { Sequelize } from "sequelize";

const sequelize = new Sequelize('task5', 'root', 'root', {
  port:"3306",
  host: 'localhost',
  dialect:"mysql"
});

export const connectDB=async()=>{
    try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}

export const syncDB=async()=>{
    try {
  await sequelize.sync();
  console.log('sync successfully');
} catch (error) {
  console.error('error', error);
}
}
export default sequelize;
