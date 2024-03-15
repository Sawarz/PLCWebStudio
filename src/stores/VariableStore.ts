import { create } from 'zustand';

export enum Type {
    Boolean = 'boolean',
    String ='string',
    Int = 'int'
}

export type Variable = {
    id: string;
    name: string;
    value: number;
    type: Type
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