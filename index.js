import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
const PORT = 5111;

app.all("/", (req, res) => {
  /**
   * Logging req and reponse to see what is stored
   */
  // console.log("Request: ", req);
  // console.log("Response: ",res);
  res.send("I'm Up");
});

/**
 * CRUD operations of TODO using methods:
 * POST, GET, PUT/PATCH, DELETE
 */
const todos = [
  {
    id: "1",
    title: "Task 1",
    completed: false,
  },
  {
    id: "2",
    title: "Task 2",
    completed: true,
  },
];

//READ
app.get("/todos", (req, res) => {
  res.json(todos);
});

//CREATE
app.post("/todos", (req,res) => {
    const newTodo = req.body;
    todos.push(newTodo);
    res.json("new Todo added");
});

//UPDATE
app.put("/todos/:id", (req,res) => {
    const updatedTodo = req.body;
    const updatedTodoId = todos.findIndex(td => td.id === req.params.id);

    if(updatedTodoId!== -1){
        todos[updatedTodoId] = {
            id: req.params.id,
            ...updatedTodo,
        }
    }
    res.json({
        message: "Todo updated successfully"
    });
});

//DELETE
app.delete("/todos/:id", (req,res) => {
    const todoId = req.params.id;

    if(updatedTodoId!== -1){
        todos.splice(todoId,1)
    }
     res.json({
        message: "Todo deleted successfully"
    });
});

app.listen(PORT, () => {
  console.log(`Server  listening on ${PORT}`);
});
