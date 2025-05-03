-- Clean and create database
DROP SCHEMA IF EXISTS audedb CASCADE;
CREATE SCHEMA audedb;

-- Create Enum
DROP TYPE IF EXISTS Role;
CREATE TYPE Role AS ENUM ('CLIENT', 'WORKER', 'ADMIN');

-- CreateTable
CREATE TABLE audedb.user (
    id TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    username TEXT NOT NULL,
    role Role NOT NULL DEFAULT 'CLIENT',
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT user_pkey PRIMARY KEY (id)
);

-- CreateIndex
CREATE UNIQUE INDEX user_email_key ON audedb.user(email);

-- CreateIndex
CREATE UNIQUE INDEX user_username_key ON audedb.user(username);