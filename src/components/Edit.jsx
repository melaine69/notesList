import { nanoid } from "nanoid"
import { useState, useEffect } from "react"
import { addNotesFromUser, editNote } from "../features/notes"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"


export default function Edit() {

    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes)

    const [inputsStates, setInputsStates] = useState({
        title: "",
        subtitle: "",
        bodyText: "",
    })// au démarrage les input sont vides

    const [showValidation, setShowValidation] = useState({
        title: false,
        subtitle: false,
        bodyText: false,
    })
    const { id } = useParams()

// qd on modifie une note déjà créée, il ft que les éléments soient affichés dans les inputs
    useEffect(() => {
        if (id && notes.list) {
            setInputsStates({
                title: notes.list.find(note => note.id === id).title,
                subtitle: notes.list.find(note => note.id === id).subtitle,
                bodyText: notes.list.find(note => note.id === id).bodyText,

            })
        } else {
            setInputsStates({
                title: "",
                subtitle: "",
                bodyText: "",
            })// on remet à zéro (inputs vides) lorsqu l'on click sur editer
        }

    }, [id])// on execute cette modif que quand l'id change

    function handleSubmit(e) {
        e.preventDefault()

        if (Object.values(inputsStates).every(value => value)) {
            setShowValidation({
                title: false,
                subtitle: false,
                bodyText: false,
            })

        if(id && notes.list) {
            dispatch(editNote({...inputsStates, id}))
        // on remplace les notes de bases par les notes modifiés

      } else {
            dispatch(addNotesFromUser({ ...inputsStates, id: nanoid(8) }))
            setInputsStates({
                title: "",
                subtitle: "",
                bodyText: "",
             }) 
            } // comme ts mes inputs sont vides, j'ajoute grâce a addNotesFromUser la nouvelle note, comportant un titre, un sous-titre et un contenu
        } else {
            for (const [key, value] of Object.entries(inputsStates)) {
                if (value.length === 0) {
                    setShowValidation(state => ({ ...state, [key]: true}))
                } else {
                    setShowValidation(state => ({ ...state, [key]: false }))
                }
            }
        }
    }


    //const edit = useSelector(state => state.notes)
    return (
        <div className="w-full p-10">
            <p className="text-slate-100 text-xl mb-4">Ajouter une note</p>
            <form onSubmit={handleSubmit}>
                <label  htmlFor="title" className="mb-2 block text-slate-100">
                    Le titre
                </label>
                <input
                    type="text"
                    onChange={e => setInputsStates({
                        ...inputsStates,
                        title: e.target.value
                    })}
                    id="title"
                    value={inputsStates.title}
                    className="p-2 text-md block w-full rounded bg-slate-200" />
                
                {showValidation.title && (
                    <p className="text-red-400 mb-2">Veuillez renseignez un titre...</p>
                )}


                <label htmlFor="subtitle" className="mb-2 block text-slate-100 mt-4">
                    Le sous-titre
                </label>
                <input
                    type="text"
                    onChange={e => setInputsStates({
                        ...inputsStates,
                        subtitle: e.target.value
                    })}
                    id="subtitle"
                    value={inputsStates.subtitle}
                    className="p-2 text-md block w-full rounded bg-slate-200" />
                {showValidation.subtitle && (
                    <p className="text-red-400 mb-2">Veuillez renseigner un sous-titre...</p>
                )}


                <label htmlFor="bodyText" className="mb-2 block text-slate-100 mt-4">
                    Contenu de la note
                </label>
                <textarea
                    spellCheck="false" // pour éviter qu"il y est des surlignés rouge sur le navigateur dur à la correction des mots
                    id="bodyText"
                    onChange={e => setInputsStates({
                        ...inputsStates,
                        bodyText: e.target.value
                    })}
                    value={inputsStates.bodyText}
                    className="w-full min-h-[300px] p-2 rounded bg-slate-200">
                </textarea>
                {showValidation.bodyText && (
                    <p className="text-red-400 mb-2">Veuillez écrire du contenu...</p>
                )}


                <button className="mt-4 px-3 py-1 bg-slate-100 rounded">
                    Enregistrer
                </button>
            </form>
        </div>
    )
}