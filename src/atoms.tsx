import { atom, selector } from 'recoil';

interface ITodoState {
    [key: string] : string[]
}
export const todoState = atom<ITodoState>({
    key:'todo',
    default:{
        'Tasks': ['a','d','e','f'],
        Doing: ['b'],
        Done: ['c'],
    }
})
