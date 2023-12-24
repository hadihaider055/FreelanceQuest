CREATE SCHEMA IF NOT EXISTS "UserSchema";

CREATE TABLE UserSchema.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    title VARCHAR(128),
    description VARCHAR(128),
    languages VARCHAR(128),
    hourlyRate INTEGER,
    profileImage VARCHAR(128),
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );



