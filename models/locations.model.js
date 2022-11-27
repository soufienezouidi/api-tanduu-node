const db = require("../models");
const User = db.user;
module.exports = (sequelize, Sequelize) => {
  const Location = sequelize.define("locations", {
    title: {
      type: Sequelize.STRING,
      max: 250,
    },
    distance: {
      type: Sequelize.DOUBLE,
    },
    zip_code: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    longitude: {
      type: Sequelize.DOUBLE,
    },
    latitude: {
      type: Sequelize.DOUBLE,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    is_deleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    services: {
      type: Sequelize.JSON,
    },
    notes: {
      type: Sequelize.STRING,
    },
  });

  return Location;
};
