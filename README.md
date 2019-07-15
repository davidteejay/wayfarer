# wayfarer

A Bus Booking App

[![Build Status](https://travis-ci.org/davidteejay/wayfarer.svg?branch=develop)](https://travis-ci.org/davidteejay/wayfarer)
[![Coverage Status](https://coveralls.io/repos/github/davidteejay/wayfarer/badge.svg)](https://coveralls.io/github/davidteejay/wayfarer)
[![Maintainability](https://api.codeclimate.com/v1/badges/16aebe82d8a8aef99adb/maintainability)](https://codeclimate.com/github/davidteejay/wayfarer/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/16aebe82d8a8aef99adb/test_coverage)](https://codeclimate.com/github/davidteejay/wayfarer/test_coverage)

---

This project is an API for a bus booking application

## Installing / Getting Started

```bash
git clone http://github.com/davidteejay/wayfarer.git
cd wayfarer
npm install
npm run dev
```

The above code will start the project in a development server.

### Initial Configuration

To configure the project:

- Create a new postgres database, and run the `./db.sql` SQL script
- Create a `.env` file and add `PGHOST`, `PGUSER`, `PGDATABASE`, `PGPASSWORD`, `PGPORT`, `PORT`, `JWT_SECRET`

## Links

- Project Homepage: [https://way-farer-api.herokuapp.com](https://way-farer-api.herokuapp.com)
- Repository: [https://github.com/davidteejay/wayfarer.git](https://github.com/davidteejay/wayfarer.git)
