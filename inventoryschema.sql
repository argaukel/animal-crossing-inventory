DROP DATABASE IF EXISTS inventory_ACNH;
CREATE DATABASE inventory_ACNH;

USE inventory_ACNH;

CREATE TABLE trades(
    id INT NOT NULL AUTO_INCREMENT,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(45) NOT NULL,
    invt_quantity INT default 0,
    sold_quantity INT default 0,
    bells BOOLEAN NOT NULL,
    average_bells INT default 0,
    nmt BOOLEAN NOT NULL,
    average_nmt INT default 0,
    sent_taylor BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);