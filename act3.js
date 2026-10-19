import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function App() {
  // State for the input text
  const [input, setInput] = useState('');

  // State for the list of tasks
  const [tasks, setTasks] = useState([]);

  // Add a new task
  const addTask = () => {
    if (input.trim() === '') {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      name: input,
    };

    setTasks([...tasks, newTask]);
    setInput('');
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Display each task
  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskText}>{item.name}</Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={input}
          onChangeText={setInput}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addTask}
        >
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks yet. Add a task!
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f5f5f5',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },

  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  input: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  addButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginLeft: 8,
    borderRadius: 8,
  },

  addText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },

  taskText: {
    flex: 1,
    fontSize: 17,
  },

  deleteButton: {
    backgroundColor: '#e53935',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },

  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },

  emptyText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 30,
    fontSize: 16,
  },
});