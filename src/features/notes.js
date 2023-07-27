import {createSlice} from "@reduxjs/toolkit"

const initialState = ({
    list: undefined

})

export const notes = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNotesFromAPI: (state, action)  => {
            state.list = action.payload
        },
        addNotesFromUser: (state, action)  => {
            state.list.push(action.payload)
        },
        editNote: (state, action)  => {
            const noteToEditIndex = state.list.findIndex(note => 
            note.id === action.payload.id)

            state.list[noteToEditIndex] = action.payload
        },
        deleteNote: (state, action)  => {
           state.list = state.list.filter(note => note.id !== action.payload)
        },

    }
})

//thunk
export function getNotesFromAPI(action) {
    return function(dispatch, getState){
        fetch("/data/notes.json")
        .then(resp => resp.json())
        .then(data => dispatch(addNotesFromAPI(data.notes)) )
    }
}

export const {addNotesFromAPI, addNotesFromUser, editNote, deleteNote} = notes.actions

export default notes.reducer