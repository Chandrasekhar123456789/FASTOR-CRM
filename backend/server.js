const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const enquiryRoutes = require('./routes/enquiries');
const employeeRoutes = require('./routes/employee')

const app = express();



const path = require('path');

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'client')));

// Handle all routes and return index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static('client'));


app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/employees', employeeRoutes);

app.get('/', (req, res) => res.json({ ok: true, msg: 'Fastor CRM API is up' }));

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
  }
})();
