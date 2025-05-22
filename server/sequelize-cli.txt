npx sequelize-cli model:generate --name users --attributes email:string,firstname:string,lastname:string,password:string,role:string,avatar:string
npx sequelize-cli model:generate --name address --attributes user_id:integer,name:string,phone:string,address:string
npx sequelize-cli model:generate --name categories --attributes name:string
npx sequelize-cli model:generate --name section --attributes name:string
npx sequelize-cli model:generate --name products --attributes name:string,description:string,price:float,stock:integer,image:string,category_id:integer,section_id:integer
npx sequelize-cli model:generate --name product_images --attributes product_id:integer,path:string
npx sequelize-cli model:generate --name product_variant_values --attributes product_id:integer,price:float,old_price:float,stock:integer,sku:string
npx sequelize-cli model:generate --name orders --attributes user_id:integer,total_price:float,status:string
npx sequelize-cli model:generate --name order_details --attributes order_id:integer,product_id:integer,quantity:integer,price:float
npx sequelize-cli model:generate --name reviews --attributes user_id:integer,product_id:integer,rating:integer,comment:string
npx sequelize-cli model:generate --name carts --attributes user_id:integer
npx sequelize-cli model:generate --name cart_items --attributes product_variant_id:integer,cart_id:integer,quantity:integer
npx sequelize-cli model:generate --name variants --attributes name:string
npx sequelize-cli model:generate --name variant_values --attributes name:string,variant_id:integer


npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate::all

SELECT TABLE_NAME, CONSTRAINT_NAME, CONSTRAINT_TYPE
FROM information_schema.TABLE_CONSTRAINTS
WHERE TABLE_SCHEMA = 'ShopApp';





