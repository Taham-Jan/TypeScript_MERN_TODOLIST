import { todolist } from '../models/todolistModel';
import { User } from '../models/userModel';

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

export async function fetchLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", { method: "GET" });
    return response.json();
};

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
};

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("/api/users/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export interface LoginCredentials {
    username: string,
    password: string,
};

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("/api/users/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
};

export async function logout() {
    await fetchData("/api/users/logout", { method: "POST" })
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

export async function updateStatus(list: todolist): Promise<todolist> {
    const response = await fetchData("/api/todolist/" + list._id,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                task: list.task,
                priority: list.priority,
                duedate: list.duedate,
                status: list.status
            }),
        });
    return response.json();
}
export async function updateTodoList(listId: string, list: ListInput): Promise<todolist> {
    const response = await fetchData("/api/todolist/" + listId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(list),
        });
    return response.json();
}



export async function deleteTodoList(listid: string) {
    await fetchData("/api/todolist/" + listid, { method: "DELETE" });
}