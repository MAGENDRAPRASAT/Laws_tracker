from flask import Flask,request, g
import sqlite3
from mysql.connector import connect
from flask_cors import CORS 

DATABASE = 'database.db'

# Replace with your own database credentials
config = {
    "user": "root",
    "password": "13apr2003",
    "host": "localhost",
    "database": "laws",
}


app = Flask(__name__)
CORS(app) 

@app.route("/", methods=["GET"])
def myapp():
    return "<p>This is to host the react build file</p>"

@app.route("/api/reference/<name>", methods=["GET"])
def sample_api(name):
    if request.method == "GET":
        connection = None
        if name == "mysql":
            connection = connect(**config)
            cursor = connection.cursor()
            
            # create_table_query = """
            #     CREATE TABLE iamtest (
            #         id INT AUTO_INCREMENT PRIMARY KEY,
            #         first_name VARCHAR(50) NOT NULL,
            #         last_name VARCHAR(50) NOT NULL,
            #         hire_date DATE,
            #         salary DECIMAL(10, 2)
            #     )
            #     """
            # cursor.execute(create_table_query)
    
            cursor.execute('''insert into iamtest (first_name, last_name, hire_date, salary) values
                           ('Jane', 'Doe', '2022-01-01', 6000.00);''')
            
            cursor.execute('''insert into iamtest (first_name, last_name, hire_date, salary) values
                           ('Joe', 'Doe', '2022-01-01', 7000.00);''')
            
            cursor.execute('''insert into iamtest (first_name, last_name, hire_date, salary) values
                           ('Jack', 'Doe', '2022-01-01', 8000.00);''')
            
            connection.commit() 
            
            cursor.execute("SELECT * FROM iamtest") 
            
            results = cursor.fetchall()
            
            return [row for row in results]
        else:
            try:
                connection = sqlite3.connect(DATABASE, timeout=10)
                
                # cursor = connection.execute("CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY, name varchar(255));")
                cursor = connection.execute("INSERT INTO category (name) VALUES ('laws'),('rights')")
                connection.commit()

                results = cursor.fetchall()
                response = []
                for row in results:
                    response.append(row)
                    
                return {
                    "success": True,
                    "data": response
                }
            except sqlite3.Error as e:
                print(f"An error occurred: {e}")
                return {
                    "success": False,
                    "error": str(e)
                }
            finally:
                if connection:
                    connection.close()
    
@app.route("/api/category", methods=["GET", "POST", "PUT", "DELETE"])
def category_api():
    if request.method == "GET":
        try:
            connection = sqlite3.connect(DATABASE, timeout=10)
            cursor = connection.execute("SELECT name FROM category")
            results = [row[0] for row in cursor.fetchall()] 
            return {
                "success": True,
                "data": results
            }
        except sqlite3.Error as e:
            print(f"An error occurred: {e}")
            return {
                "success": False,
                "error": str(e)
            }
        finally:
            if connection:
                connection.close()
    
    if request.method == "POST":
        try:
            connection = sqlite3.connect(DATABASE, timeout=10)
            if request.json["bulk_insert"]:
                cursor = connection.executemany("INSERT INTO category (name) VALUES (?)", [(name,) for name in request.json["names"]])
            else:
                cursor = connection.execute("INSERT INTO category (name) VALUES (?)", (request.json["name"],))
            connection.commit()
            return {
                "success": True
            }
        except sqlite3.Error as e:
            print(f"An error occurred: {e}")
            return {
                "success": False,
                "error": str(e)
            }
        finally:
            if connection:
                connection.close()

    if request.method == "PUT":
        try:
            connection = sqlite3.connect(DATABASE, timeout=10)
            if request.json["bulk_update"]:
                cursor = connection.executemany(
                    "UPDATE category SET name = ? WHERE id = ?",
                    [(item["name"], item["id"]) for item in request.json["data"] if "name" in item and "id" in item]
                )
            else:
                cursor = connection.execute("UPDATE category SET name = ? WHERE id = ?", (request.json["name"], request.json["id"]))
            
            connection.commit()
            return {
                "success": True
            }
        except sqlite3.Error as e:
            print(f"An error occurred: {e}")
            return {
                "success": False,
                "error": str(e)
            }
        finally:
            if connection:
                connection.close()

    if request.method == "DELETE":
        try:
            connection = sqlite3.connect(DATABASE, timeout=10)
            if request.json["bulk_delete"]:
                cursor = connection.executemany("DELETE FROM category WHERE id = ?", [(id,) for id in request.json["ids"]])
            else:
                cursor = connection.execute("DELETE FROM category WHERE id = ?", (request.json["id"],))
            connection.commit()
            return {
                "success": True
            }
        except sqlite3.Error as e:
            print(f"An error occurred: {e}")
            return {
                "success": False,
                "error": str(e)
            }
        finally:
            if connection:
                connection.close()
                
