import edit from "../assets/edit.svg"
import folder from "../assets/folder.svg"
import { Link } from "react-router-dom"

export default function SideBar() {
    return (
        <aside className="shrink-0 bg-slate-800 w-[100px] flex flex-col items-center pt-10">
            
            <Link to="/">
                <img className="w-10 h-10 mb-10" src={folder} alt="voir toutes les notes" />
            </Link>

            <Link to="/editer">
                <img className="w-10 h-10 mb-10" src={edit} alt="ecrire une note" />
            </Link>


        </aside>
    )
}