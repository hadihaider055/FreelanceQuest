CREATE SCHEMA IF NOT EXISTS "JobSchema";

CREATE TABLE JobSchema.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price INT NOT NULL CHECK (price >= 0),
    location VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    posted_by UUID NOT NULL REFERENCES UserSchema.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );



