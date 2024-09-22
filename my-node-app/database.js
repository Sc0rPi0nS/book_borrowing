// const mysql = require('mysql2');

// // สร้างการเชื่อมต่อกับฐานข้อมูล
// const connection = mysql.createConnection({
//   host: 'localhost',       // ชื่อโฮสต์ของฐานข้อมูล MySQL
//   user: 'root',            // ชื่อผู้ใช้งานฐานข้อมูล MySQL
//   password: '123456', // รหัสผ่านของผู้ใช้งาน
//   database: 'book_borowing'  // ชื่อฐานข้อมูลที่ต้องการเชื่อมต่อ
// });

// // เช็คการเชื่อมต่อ
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL: ' + err.stack);
//     return;
//   }
//   console.log('Connected to MySQL as id ' + connection.threadId);
// });

// // ส่งออกการเชื่อมต่อเพื่อให้ไฟล์อื่นใช้ได้
// module.exports = connection;