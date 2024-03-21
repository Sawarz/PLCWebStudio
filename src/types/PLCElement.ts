import { ElementType } from "@/types/ElementEnum";

export type PLCElement = {
    on: boolean,
    id: string,
    type: ElementType,
    variableName?: string
};