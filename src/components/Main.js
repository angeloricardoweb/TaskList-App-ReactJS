import React, { Component } from 'react'
import './Main.css'


import Form from './Form';
import Tasks from './Tasks';



export default class Main extends Component {
    state = {
        newTask: '',
        tasks: [],
        index: -1,
    }


    // load localStorage
    componentDidMount() {
        const tasks = JSON.parse(localStorage.getItem('tasks'))
        if (!tasks) return;
        this.setState({ tasks })
    }

    // send to localStorage
    componentDidUpdate(prevProps, prevState) {
        const { tasks } = this.state

        if (tasks === prevState.tasks) return;
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    // sended to localStorage



    handleSubmit = (e) => {
        e.preventDefault()
        const { tasks, index } = this.state
        let { newTask } = this.state;
        newTask = newTask.trim();

        const newTasks = [...tasks]


        if (index === -1) {
            // cria uma nova tarefa e seta o input com vazio
            this.setState({
                tasks: [...newTasks, newTask],
                newTask: ''
            })
        } else {
            newTasks[index] = newTask

            this.setState({
                tasks: [...newTasks],
                index: -1
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            newTask: e.target.value,
        })
    }

    handleEdit = (e, index) => {
        const { tasks } = this.state
        // console.log('edit', index)
        this.setState({
            index: index,
            newTask: tasks[index]
        })
    }

    handleDelete = (e, index) => {
        // console.log('delete', index)
        const { tasks } = this.state
        const newTasks = [...tasks]

        // remove 1 element da index fornecida
        newTasks.splice(index, 1)

        this.setState({
            tasks: [...newTasks],
        })
    }


    render() {
        const { newTask, tasks } = this.state
        
        return (
            <div className="main">
                <h1>Task List</h1>
                <Form
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    newTask={newTask}

                />

                <Tasks

                    handleDelete={this.handleDelete}
                    handleEdit={this.handleEdit}
                    tasks={tasks}
                />
            </div>

        )
    }
}