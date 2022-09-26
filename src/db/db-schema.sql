CREATE TABLE products
(
    productId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(200) NOT NULL,
    price DECIMAL(18,2)
)

CREATE TABLE users (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(200) NOT NULL,
    name VARCHAR(200),
    password VARCHAR(200) NOT NULL,


    UNIQUE email (email)
)


CREATE TABLE orders
(
    orderId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    creationDate DATE,
    deliverDate DATE,
    status VARCHAR(100),
    orderType VARCHAR(100),

    CONSTRAINT fk_orders_users FOREIGN KEY (userId)
    REFERENCES users(userId)
)

CREATE TABLE orderDetails
(
    detailId INT PRIMARY KEY AUTO_INCREMENT,
    orderId INT NOT NULL,
    productId INT NOT NULL,
    CONSTRAINT fk_orderDetails_user FOREIGN KEY (orderId)
    REFERENCES orders(orderId),
    
    CONSTRAINT fk_orderDetails_product FOREIGN KEY (productId)
    REFERENCES products(productId)
)