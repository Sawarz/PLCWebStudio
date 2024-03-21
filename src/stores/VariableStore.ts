import { create } from 'zustand';
import { Type } from '@/types/VariableEnum';

export type Variable = {
    id: string;
    name: string;
    value: boolean | number | string;
    type: Type
};

export type VariablesStore = {
    variables: Variable[];
    addVariable: (variable: Variable) => void;
    removeVariable: (id: string) => void;
    modifyVariable: (variable: Variable) => void;
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
    modifyVariable: (variable: Variable) => {
        set(({ variables }: VariablesStore) => ({
            variables: variables.map((v) => (v.id === variable.id ? variable : v)),
        }));
    }
}));