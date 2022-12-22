import { atom, selector } from 'recoil';
export interface ITodo {
    id: number;
    text: string;
}
interface ITodoState {
    [key: string] : ITodo[]
}
export const todoState = atom<ITodoState>({
    key:'todo',
    default:{
        'Tasks': [],
        Doing: [],
        Done: [],
    }
})
