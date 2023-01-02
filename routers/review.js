const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
const {Owner} = require('../models');
const {Guest} = require('../models');

