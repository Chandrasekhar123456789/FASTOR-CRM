const jwt = require('jsonwebtoken');
const { Employee } = require('../models');

const jwtSecret = process.env.JWT_SECRET || 'default_secret_change_me';

async function protect(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing or malformed authorization header' });
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, jwtSecret);
    const user = await Employee.findByPk(payload.id);
    if (!user) return res.status(401).json({ error: 'Token user not found' });
    req.user = { id: user.id, email: user.email, name: user.name };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token', details: err.message });
  }
}

module.exports = { protect, jwtSecret };
