CREATE TABLE IF NOT EXISTS account(
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS contact(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    telephone VARCHAR NOT NULL,
    account_id BIGSERIAL NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account(id)
);

INSERT INTO account(email, password)
VALUES ('account@email.com', '$2a$10$keSgAtFnaJrJqadX62tUkuudRKOxKP0Npk/RambuRDXGlKXC0QrAa');

INSERT INTO contact(name, email, address, telephone, account_id)
VALUES ('Steve Jobs', 'jobs@apple.com', 'Cupertino, CA', '1800123456789', 1),
        ('Bill Gates', 'bill@microsoft.com', 'Redmond, WA', '1700123456789', 1),
        ('Larry Page', 'larry@gmail.com', 'Mountain View, CA', '1600123456789', 1),
        ('Jawed Karim', 'jawed@youtube.com', 'Menlo Park, CA', '1500123456789', 1),
        ('Mark Zuckerberg', 'mark@facebook.com', 'Menlo Park, CA', '1400123456789', 1),
        ('Dick Costolo', 'dick@twitter.com', 'San Francisco, CA', '1300123456789', 1),
        ('Emmett Shear', 'emmett@twitch.com', 'San Francisco, CA', '1200123456789', 1),
        ('Gabe Newell', 'gaben@valve.com', 'Seattle, WA', '1100123456789', 1);