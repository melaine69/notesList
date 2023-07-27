import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useNavigate, useParams } from "react-router-dom"
import { deleteNote } from "../features/notes"

export default function NoteDisplay() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const notes = useSelector(state => state.notes)
    const {id} = useParams()
    const actualNote = notes.list?.find(note => note.id == id)
    
    return (
        // les 3 btn qui permettent de voir les notes, les MAJ et les supprimer
        <div className="p-10">
            <Link to="/"
            className="px-2 py-1 text-slate-800 bg-slate-300 rounded mr-2">Notes
            </Link>
            
            <Link to={`/editer/${id}`}
            className="px-2 py-1 text-slate-800 bg-green-300 rounded mr-2">Mettre à jour
            </Link>

            <button onClick={() => {
                        dispatch(deleteNote(id))
                        navigate("/") // qd on supprime la note, on revient à la page d'accueil
            }}
            className="px-2 py-1 text-slate-800 bg-red-600 rounded mr-2"> Supprimer
            </button>
        
            <p className="text-slate-100 text-4xl mb-2 mt-8">
                {actualNote?.title}</p>
            <p className="text-slate-200 text-xl mb-4">
                {actualNote?.subtitle}</p>
            <p className="text-slate-300">{actualNote?.bodyText}</p>

        </div>
        //on fait apparaître les élements présents dans "mes notes"(SideNotes)
    )
}