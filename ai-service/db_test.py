import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Mysql@123",
    database="smart_retail"
)

print("Database Connected Successfully!")

conn.close()