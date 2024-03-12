import { create } from 'zustand';

type Variable = {
    id: string;
    name: string;
    value: number;
};

export type VariablesStore = {
    variables: Variable[];
};

export const useVariableStore = create((set) => ({
    variables: [],
    addVariable: (variable: Variable) => {
        set(({ variables }: VariablesStore) => ({
            state: { variables: variables.push(variable) },
        }));
    },
    removeVariable: (id: string) => {
        set(({ variables }: VariablesStore) => ({
            variables: variables.filter((variable) => variable.id !== id),
        }));
    },
}));