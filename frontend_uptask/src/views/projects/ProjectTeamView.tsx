import { Link, useNavigate, useParams } from "react-router-dom"


export default function ProjectTeamView() {
    const params = useParams()
    const projectId = params.projectId!
    const navigate = useNavigate()

    return (
        <>
            <h1 className='text-5xl font-black'>Administrate Team</h1>
            <p className='text-2xl font-light text-gray-500 mt-5'>manage this project's team</p>
            <nav className='my-5 flex gap-3'>
                <button
                    type='button'
                    className=' bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
                    onClick={() => navigate(location.pathname + "?addMember=true")}
                >
                    Add member
                </button>
                <Link
                    to={`/projects/${projectId}`}
                    className=' bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'

                >
                    Back to Project
                </Link>
            </nav>
        </>)
}
