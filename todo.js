const { log } = require('console');
const fs = require('fs');
const process = require('process');

let input = process.argv.slice(2)

const write = (data) => {
    fs.writeFile('db.json', JSON.stringify(data), (error) => {
        if (error) {
            console.log('An error has occurred ', error);
            return;
        }
    });
}




const add = (item, data) => {
    var str=item.join(" ")
    data.tasks.push(str)
    write(data);
    console.log("Your item has been Successfully Added")
}



const remove = (index, data) => {
    if (data.tasks.length === 0)
    {
        console.log("You Have no Task Pending to delete")
        return
    }
    if (index > data.tasks.length)
    {
        console.log("Item does'nt exist! please 'Node todo.js -view' and try again!")
        return
    }
    console.log()
    index = parseInt(index)
    data.tasks = data.tasks.filter((item, i) => {
        return i != index - 1
    })

    write(data);
    console.log("Your Task has been Successfully Deleted")
}

const update = (index, task, data) => {
    if (data.tasks.length === 0)
    {
        console.log("You Have no Task Pending to Update")
        return
    }
    if (index > data.tasks.length)
    {
        console.log("Item does'nt exist! please 'Node todo.js -view' and try again!")
        return
    }
    var str=task.join(" ")
    index = parseInt(index)
    data.tasks[index - 1] = str
    write(data);
    console.log("Your Task has been Successfully Updated")
}

const view = (data) => {
    if (data.tasks.length === 0)
    {
        console.log("You Have no Task Pending")
        return
    }
    console.log("Your pending tasks are:")
    data.tasks.map((item, index) => {
        console.log(index + 1 + ". " + item)
    })
}
const todo = () => {
    if (process.argv.length === 2) {
        console.log("Welcome to your todo application")
        console.log("Follow this Steps to use your application: ")
        console.log()
        console.log('Type "Node todo.js -view" to  view your current tasks')
        console.log('Type "Node todo.js -add Your-task" to  to add a new task')
        console.log('Type "Node todo.js -remove Your-task-index" to remove a existing task')
        console.log('Type "Node todo.js -update index-number new-task" Your task index" to remove a existing task')

        console.log()
        return
    }
    let mydata
    try{
        mydata= JSON.parse(fs.readFileSync('db.json'))
    }
    catch(e)
    {
        console.log("!Unable to read file")
        return
    }

    switch (input[0]) {
        case "-view":
            view(mydata)
            break
        case "-add":
            add(input.slice(1), mydata)
            break
        case "-delete":
            remove(input[1], mydata)
            break
        case "-update":
            update(input[1], input.slice(2), mydata)
            break
        default:
            console.log("Please write correct options.")
            console.log('Write "Node todo.js" to see the instructions')
    }

}
todo()
