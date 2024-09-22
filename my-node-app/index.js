const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'borrowing',
  port: 80
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/reserve', (req, res) => {
  const { fullName, email } = req.body;
  
  if (fullName && email) {
    connection.query('INSERT INTO reservations (fullName, email) VALUES (?, ?)', [fullName, email], (err, results) => {
      if (err) {
        console.error('Error inserting data: ' + err.stack);
        res.status(500).json({ message: 'Error inserting data' });
        return;
      }
      res.status(200).json({ message: 'Data inserted successfully', id: results.insertId });
    });
  } else {
    res.status(400).json({ message: 'Invalid data' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.post('/reserve', (req, res) => {
    const { fullName, email } = req.body;
  
    if (fullName && email) {
      connection.query('INSERT INTO reservations (fullName, email) VALUES (?, ?)', [fullName, email], (err, results) => {
        if (err) {
          console.error('Error inserting data: ' + err.stack);
          res.status(500).json({ message: 'Error inserting data' });
          return;
        }
  
        // อัพเดตสถานะหนังสือเป็น 'จองแล้ว'
        connection.query('UPDATE books SET status = "จองแล้ว" WHERE id = 1', (err) => { // ตรวจสอบว่า id ตรงกับหนังสือที่ต้องการ
          if (err) {
            console.error('Error updating book status: ' + err.stack);
            res.status(500).json({ message: 'Error updating book status' });
            return;
          }
          res.status(200).json({ message: 'Reservation successful and book status updated', id: results.insertId });
        });
      });
    } else {
      res.status(400).json({ message: 'Invalid data' });
    }
  });
  

app.get('/book-status/:id', (req, res) => {
    const bookId = req.params.id;
    connection.query('SELECT status FROM books WHERE id = ?', [bookId], (err, results) => {
      if (err) {
        console.error('Error fetching book status: ' + err.stack);
        res.status(500).json({ message: 'Error fetching book status' });
        return;
      }
      res.status(200).json({ status: results[0].status });
    });
});

app.post('/unlock-book/:id', (req, res) => {
    const bookId = req.params.id;
    connection.query('UPDATE books SET status = "ว่าง" WHERE id = ?', [bookId], (err) => {
      if (err) {
        console.error('Error updating book status: ' + err.stack);
        res.status(500).json({ message: 'Error unlocking book' });
        return;
      }
      res.status(200).json({ message: 'Book unlocked' });
    });
  });