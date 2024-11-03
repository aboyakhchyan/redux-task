

export interface IMedicine {
    id: string | number
    name: string
    salary: number
    imageUrl: string
}

export interface IState {
    medicine: IMedicine[]
    searchText: string
    total: number
}

export type InputUser = Omit<IMedicine, 'id'>