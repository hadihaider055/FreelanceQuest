CREATE SCHEMA IF NOT EXISTS "ProposalSchema";

CREATE TABLE ProposalSchema.proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cover_letter TEXT NOT NULL,
    price INT NOT NULL CHECK (price >= 0),
    user_id UUID NOT NULL REFERENCES UserSchema.users(id),
    job_id UUID NOT NULL REFERENCES JobSchema.jobs(id),
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );



