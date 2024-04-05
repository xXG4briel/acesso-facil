CREATE EXTENSION "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  full_name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE,
  birthday DATE NOT NULL,
  identity VARCHAR(14),
  identity_type VARCHAR(1),
  address JSONB,
  company VARCHAR(50)
);