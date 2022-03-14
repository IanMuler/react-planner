/* eslint-disable react/prop-types */
import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Tasks, CreateTask, CreateIcon, TaskItem, CreateTaskItem, CreateTaskItemDuration, ConfirmTask, TaskItemDuration, Title, CreateTaskInput } from './style'

const TaskList = ({ title, tasks, setTasks }) => {
  const [isCreatingTask, setIsCreatingTask] = React.useState(false)
  const [taskName, setTaskName] = React.useState('')
  const [taskDuration, setTaskDuration] = React.useState('00:30')

  const selectOptions = (
        <>
            <option value="00:15">00:15</option>
            <option value="00:30">00:30</option>
            <option value="00:45">00:45</option>
            <option value="01:00">01:00</option>
            <option value="01:15">01:15</option>
            <option value="01:30">01:30</option>
            <option value="01:45">01:45</option>
            <option value="02:00">02:00</option>
            <option value="02:15">02:15</option>
            <option value="02:30">02:30</option>
            <option value="02:45">02:45</option>
            <option value="03:00">03:00</option>
            <option value="03:15">03:15</option>
            <option value="03:30">03:30</option>
            <option value="03:45">03:45</option>
            <option value="04:00">04:00</option>
            <option value="04:15">04:15</option>
            <option value="04:30">04:30</option>
            <option value="04:45">04:45</option>
            <option value="05:00">05:00</option>
            <option value="05:15">05:15</option>
            <option value="05:30">05:30</option>
            <option value="05:45">05:45</option>
            <option value="06:00">06:00</option>
            <option value="06:15">06:15</option>
            <option value="06:30">06:30</option>
            <option value="06:45">06:45</option>
            <option value="07:00">07:00</option>
            <option value="07:15">07:15</option>
            <option value="07:30">07:30</option>
            <option value="07:45">07:45</option>
            <option value="08:00">08:00</option>
        </>
  )

  const createNewTask = (name, duration) => {
    if (name) {
      if (tasks.some(task => task.text === name)) {
        alert('Task already exists')
      } else {
        setIsCreatingTask(false)
        setTaskName('')
        setTaskDuration('00:30')
        setTasks([...tasks, { id: `${Math.floor(Math.random() * 100000)}`, text: name, duration }])
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      createNewTask(taskName, taskDuration)
    }
  }
  return (
        <Droppable droppableId={`${title.toLowerCase()}-tasks`}>
            {(droppableProvided) => (
                <Tasks
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                    <Title>{title}</Title>
                    <CreateTask onClick={() => setIsCreatingTask(!isCreatingTask)}>
                        <CreateIcon />
                        <span>Add task</span>
                    </CreateTask>
                </div>
                    {isCreatingTask && (
                        <CreateTaskItem>
                            <CreateTaskInput
                                value={taskName}
                                type="text"
                                id="name"
                                name="name"
                                autoComplete="off"
                                placeholder="Write a task"
                                onChange={(e) => {
                                  setTaskName(e.target.value)
                                }}
                                onKeyPress={handleKeyPress}
                            />
                            <CreateTaskItemDuration
                                value={taskDuration}
                                onChange={(e) => {
                                  setTaskDuration(e.target.value)
                                }}
                            >
                                {selectOptions}
                            </CreateTaskItemDuration>
                            <ConfirmTask
                                onClick={() => createNewTask(taskName, taskDuration)}
                            />
                        </CreateTaskItem>
                    )}
                    {tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(draggableProvided) => (
                                <TaskItem
                                    {...draggableProvided.draggableProps}
                                    ref={draggableProvided.innerRef}
                                    {...draggableProvided.dragHandleProps}
                                    assigned={task.assigned}
                                >
                                    <TaskItemDuration>
                                        {task.duration.slice(1)}
                                    </TaskItemDuration>
                                    {task.text}
                                    {draggableProvided.placeholder}
                                </TaskItem>
                            )}
                        </Draggable>
                    ))}
                    {droppableProvided.placeholder}
                </Tasks>
            )}
        </Droppable>
  )
}

export default TaskList
