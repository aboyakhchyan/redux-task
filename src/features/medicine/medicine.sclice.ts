import axios from "axios";
import { createAppSlice } from "../../app/createAppSlice";
import { IMedicine, InputUser, IState } from "./types";
import { createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";


const initialState: IState = {
    medicine: [],
    searchText: '',
    total: 0
}

const medicine = (state:RootState) => state.medicine.medicine
const text = (state: RootState) => state.medicine.searchText

export const filterByMedicine = createSelector([medicine, text], (medicine: IMedicine[], text: string) => {
    
        return medicine.filter(med => med.name.startsWith(text))
})


export const medicineSlice = createAppSlice({
    name: 'medicine',
    initialState,
    reducers: create => ({
        getMedicines: create.asyncThunk(
            async () => {
                const response = await axios.get(`http://localhost:3004/medicnie`)

                return response.data
            },
            {
                fulfilled: (state, action: PayloadAction<IMedicine[]>) => {
                    state.medicine = action.payload
                }
            }
        ),
        changeText: create.reducer(
            (state, action: PayloadAction<string>) => {
                state.searchText = action.payload
            }
        ),
        changeTotal: create.reducer(
            (state) => {
                state.total = state.medicine.reduce((aggr, med) => med.salary + aggr, 0)
            }
        ),
        addMedicine: create.asyncThunk(
            async (data: InputUser) => {
                const response = await axios.post('http://localhost:3004/medicnie', data)

                return response.data
            },
            {
                fulfilled: (state, action: PayloadAction<IMedicine>) => {
                    state.medicine.push(action.payload)
                } 
            }
        )
    }),
    selectors: {
        searchText: state => state.searchText,
        total: state => state.total
    }
})

export const {searchText, total} = medicineSlice.selectors
export const {getMedicines, changeText, changeTotal, addMedicine} = medicineSlice.actions