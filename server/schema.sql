DROP DATABASE IF EXISTS bugtracker;

CREATE DATABASE bugtracker;

\c bugtracker;

CREATE TABLE
  account (
    account_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    hash_pass VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    join_date DATE NOT NULL DEFAULT CURRENT_DATE,
    last_edited timestamptz NOT NULL DEFAULT now ()
  );

CREATE TABLE
  token (
    token_id SERIAL PRIMARY KEY,
    account_id INTEGER,
    refresh_token VARCHAR(255) UNIQUE,
    creation_date timestamptz NOT NULL DEFAULT now (),
    CONSTRAINT fk_account FOREIGN KEY (account_id) REFERENCES account (account_id) ON DELETE CASCADE
  );

CREATE TABLE
  project (
    project_id SERIAL PRIMARY KEY,
    account_id INTEGER,
    name VARCHAR(255),
    description TEXT,
    creation_date DATE NOT NULL DEFAULT CURRENT_DATE,
    last_edited timestamptz NOT NULL DEFAULT now (),
    CONSTRAINT fk_account FOREIGN KEY (account_id) REFERENCES account (account_id) ON DELETE CASCADE
  );

CREATE TABLE
  priority (
    priority_id SERIAL PRIMARY KEY,
    name TEXT,
    order_number SMALLINT
  );

INSERT INTO
  priority (name, order_number)
VALUES
  ('Low', 0),
  ('Medium', 1),
  ('High', 2);

CREATE TABLE
  status (
    status_id SERIAL PRIMARY KEY,
    name TEXT,
    order_number SMALLINT,
    color TEXT,
    marks_completed BOOLEAN DEFAULT false
  );

INSERT INTO
  status (name, order_number, color, marks_completed)
VALUES
  ('Open', 0, 'blue', false),
  ('In Progress', 1, 'purple', false),
  ('Testing', 2, 'orange', false),
  ('Closed', 3, 'green', true);

CREATE TABLE
  bug (
    bug_id SERIAL PRIMARY KEY,
    project_id INTEGER,
    name VARCHAR(255),
    description TEXT,
    location TEXT,
    priority_id SMALLINT NOT NULL,
    status_id SMALLINT NOT NULL,
    creation_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE,
    completion_date DATE,
    last_edited timestamptz NOT NULL DEFAULT now (),
    CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES project (project_id) ON DELETE CASCADE,
    CONSTRAINT fk_priority FOREIGN KEY (priority_id) REFERENCES priority (priority_id) ON DELETE SET NULL,
    CONSTRAINT fk_status FOREIGN KEY (status_id) REFERENCES status (status_id) ON DELETE SET NULL
  );

CREATE TABLE
  comment (
    comment_id SERIAL PRIMARY KEY,
    bug_id INTEGER,
    description TEXT,
    creation_date DATE NOT NULL DEFAULT CURRENT_DATE,
    last_edited timestamptz NOT NULL DEFAULT now (),
    CONSTRAINT fk_bug FOREIGN KEY (bug_id) REFERENCES bug (bug_id) ON DELETE CASCADE
  );
