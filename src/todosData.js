import uuid from "react-uuid"

const todosData = [
    {
        id: uuid(),
        text: "HackerRank Interview Prep Kit",
        dateAndTime: new Date().toLocaleString(),
        completed: true
    },
    {
        id: uuid(),
        text: "“Learn DS & Algorithms” course from Programiz",
        dateAndTime: new Date().toLocaleString(),
        completed: false
    },
    {
        id: uuid(),
        text: "Watch React Hooks video ",
        dateAndTime: new Date().toLocaleString(),
        completed: false
    },
    {
        id: uuid(),
        text: "Watch Material UI video",
        dateAndTime: new Date().toLocaleString(),
        completed: false
    },
    {
        id: 5,
        text: "Read React Docs",
        dateAndTime: new Date().toLocaleString(),
        completed: false
    }
]

export default todosData