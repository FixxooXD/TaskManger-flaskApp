from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from dotenv import load_dotenv
from flask_cors import CORS
import os

# Load .env file
load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
CORS(app) 

mongo = PyMongo(app)
tasks_collection = mongo.db.tasks

print("Connected to DB:", mongo.db)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = []
    for task in tasks_collection.find():
        tasks.append({
            "id": str(task['_id']),
            "title": task['title'],
            "done": task['done']
        })
    return jsonify(tasks), 200

@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()

    if not data or 'title' not in data:
        return jsonify({'error': 'Title is required'}), 400

    new_task = {
        'title': data['title'],
        'done': False
    }

    result = tasks_collection.insert_one(new_task)
    return jsonify({
        'id': str(result.inserted_id),
        'message': 'Task created successfully'
    }), 201

@app.route('/tasks/<id>', methods=['PUT'])
def update_task(id):
    data = request.get_json()
    update_data = {}

    if 'done' in data:
        update_data['done'] = data['done']

    if 'title' in data:
        update_data['title'] = data['title']

    result = tasks_collection.update_one({'_id': ObjectId(id)}, {'$set': update_data})

    if result.matched_count:
        return jsonify({'message': 'Task updated'}), 200

    return jsonify({'error': 'Task not found'}), 404

@app.route('/tasks/<id>', methods=['DELETE'])
def delete_task(id):
    result = tasks_collection.delete_one({'_id': ObjectId(id)})
    if result.deleted_count:
        return jsonify({"message": "Task deleted"}), 200
    else:
        return jsonify({"error": "Task not found"}), 404

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
