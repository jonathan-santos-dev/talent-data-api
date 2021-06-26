export interface IOrgazination {
    name: string
    level: number
    parent?: string
}

export type IOrgazinations = IOrgazination[]