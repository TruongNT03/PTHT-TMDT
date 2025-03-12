npx sequelize-cli model:generate --name users --attributes email:string,firstName:string,lastName:string,password:string,role:string,avatar:string
npx sequelize-cli model:generate --name address --attributes userId:integer,name:string,phone:string,address:string
npx sequelize-cli model:generate --name categories --attributes name:string
npx sequelize-cli model:generate --name subCategories --attributes name:string,categoryId:integer
npx sequelize-cli model:generate --name section --attributes name:string
npx sequelize-cli model:generate --name products --attributes name:string,description:string,price:float,stock:integer,image:string,subCategoryId:integer,sectionId:integer
npx sequelize-cli model:generate --name orders --attributes userId:integer,totalPrice:float,status:string
npx sequelize-cli model:generate --name orderDetails --attributes orderId:integer,productId:integer,quantity:integer,price:float
npx sequelize-cli model:generate --name reviews --attributes userId:integer,productId:integer,rating:integer,comment:string
npx sequelize-cli model:generate --name carts --attributes userId:integer
npx sequelize-cli model:generate --name cartItemsId --attributes productId:integer,cartId:integer,quantity:integer


npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo

SELECT TABLE_NAME, CONSTRAINT_NAME, CONSTRAINT_TYPE
FROM information_schema.TABLE_CONSTRAINTS
WHERE TABLE_SCHEMA = 'ShopApp';





