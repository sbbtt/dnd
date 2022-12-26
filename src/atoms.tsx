import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface ITodo {
    id: number;
    text: string;
}
export interface ITodoState {
    [key: string] : ITodo[]
}
export const todoState = atom<ITodoState>({
  key: "todo",
  default: {
    Tasks: [],
    Doing: [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const BoardState = atom<string[]>({
    key: 'boards',
    default: ['Tasks', 'Doing', 'Done'],
    effects_UNSTABLE: [persistAtom],
  });

  export const TrashState = atom<boolean>({
    key: 'trashcan',
    default: false,
  });