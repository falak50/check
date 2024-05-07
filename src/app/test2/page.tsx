"use client"
import React from 'react'

export default function page() {
    let data: any = 42;
    data = 'Hello from data';
    let userId: string | number;
    function userIdDataType(id: string | number) {
        console.log(id)
    }

    userIdDataType('123'); // no error
    userIdDataType(123); // no error

    let user1: { userName: string; userId: number };
    // let user2 : {userName: string; userId: number }
    user1 = { userName: 'falak', userId: 12 };
    //   user1 = { userName: 'anis', userId: 101 };

    type Todo = {
        id: number;
        title: string;
        description?: string;
        priority: "low" | "medium" | "high";
        completed: boolean;
    };
    // interface Todo {
    //     id: number;
    //     title: string;
    //     description?: string;
    //     priority: "low" | "medium" | "high";
    //     completed: boolean;
    // }
    const sampleTodos: Todo[] = [
        { id: 1, title: "Learn TypeScript", description: "Study TypeScript documentation", priority: "high", completed: false },
        { id: 2, title: "Build a React app", description: "Create a new project and start coding", priority: "medium", completed: false },
        { id: 3, title: "Deploy the app", description: "Prepare the app for deployment", priority: "low", completed: true }
    ];
    // Example 1



    interface Demo {
        id: number;
        name: string;
    }

    let demo1: Demo;
    demo1 = {
        id: 2,
        name: 'demo1'
    };

    const demos: Demo[] = [];
    function addDemo(demop: Demo) {
        console.log('demo  ', demop)
        demos.push(demop);
    }

    addDemo(demo1)

    console.log(sampleTodos);

    enum Color {
        Red = 'red',
        Green = 'green',
        Blue = 'blue',
    }
    console.log('color', Color)

    let selectedColor: Color = Color.Green;
    console.log('selectedColor  ', selectedColor);


    // function 

    function add(a: number, b: number): number {
        return a + b;
    }

    const result: number = add(5, 3);

    console.log("function ", result);

    return (
        <div>
            <h1>demo id :{demo1.id}</h1>
            <h1>demo {demo1.name}</h1>
            <ul>
                {/* {sampleTodos.map(todo => (

                    <div key={todo.id} className='flex'>
                        <li className='mx-2'>{todo.id}</li>
                        <li className='mx-2'>{todo.title}</li>
                    </div>

                ))} */}



                {
                    sampleTodos.map((todo) => {
                        console.log(todo.id)
                        return <div
                            key={todo.id}
                        >{todo.title} :  {todo.id}</div>
                    })
                }


            </ul>

            <h1>hello</h1>
            <h1>{data}</h1>
            <h1>id {user1.userId}  name: {user1.userName}</h1>
            {/* <button oncli></button> */}
        </div>
    )
}
