'use strict';

const express = require('express');
const path = require('path');
const config = require('../config/config');

const router = express.Router();
const staticDir = path.join(__dirname, '..', config.staticDir);

/**
 * Serve index.html for all Angular client-side routes so that direct URL
 * access and browser refresh work correctly in production.
 *
 * Routes mirror the Angular router definition in src/app/app.routes.ts.
 * Add new top-level routes here whenever they are added to app.routes.ts.
 */
const ANGULAR_ROUTES = [
  '/',
  '/callback',
  '/dashboard',
  '/children',
  '/children/*',
  '/members',
  '/members/*',
  '/funds',
  '/funds/*',
  '/classes',
  '/classes/*',
  '/events',
  '/events/*',
  '/documents',
  '/documents/*',
];

const sendIndex = (req, res) => res.sendFile(path.join(staticDir, 'index.html'));

ANGULAR_ROUTES.forEach(route => router.get(route, sendIndex));

module.exports = router;
