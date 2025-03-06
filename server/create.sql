npx sequelize-cli model:generate --name users --attributes email:string,firstName:string,lastName:string,password:string,role:string,avatar:string
npx sequelize-cli model:generate --name address --attributes user_id:string,name:string,phone:string,address:string


npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo





