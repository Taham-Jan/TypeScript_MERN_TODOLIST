import { todolist } from '../models/todolistModel';

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response
    }
    else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
};

export async function fetchTodoList(): Promise<todolist[]> {
    const response = await fetchData("/api/todolist", { method: "GET" });
    return response.json();
}


export interface ListInput {
    task?: string,
    priority?: [],
    duedate?: Date | string,
    status: boolean,
}
export async function createTodoList(list: ListInput): Promise<todolist> {
    const response = await fetchData("/api/todolist",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(list),
        });
    return response.json();
}

export async function updateTodoList(list: todolist): Promise<todolist> {
    const response = await fetchData("/api/todolist/" + list._id,
    {
     method:"PATCH",
     headers:{
        "Content-Type": "application/json",
     },
     body:JSON.stringify({
        task:list.task,
        priority: list.priority,
        duedate: list.duedate,
        status: list.status
    }),    
    });
    return response.json();
}

// export async function updateStatus(listid: string, status:string): Promise<todolist> {
//     const response = await fetchData("/api/todolist/" + listid,
//     {
//      method:"PATCH",
//      headers:{
//         "Content-Type": "application/json",
//      },
//      body:JSON.stringify({status}),    
//     });
//     return response.json();
// }

export async function deleteTodoList(listid: string) {
    await fetchData("/api/todolist/" + listid, { method: "DELETE" });
}