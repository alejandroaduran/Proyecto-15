import { useLocation, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getTaskById } from "@/api/TaskAPI"
import EditTaskModal from "./EditTaskModal"


export default function EditTaskData() {

    const params = useParams()
    const projectId = params.projectId!
    //console.log("Project ID:", projectId)
    const location = useLocation()
    //console.log("Current location:", location)
    const queryParams = new URLSearchParams(location.search)
    //console.log("Query parameters:", queryParams.toString())
    const taskId = queryParams.get('EditTask')
    //console.log("Task ID to edit:", taskId)

    // Here you would typically use the taskId to fetch the task data
    const { data } = useQuery({
        queryKey: ['task', taskId],
        enabled: !!taskId,
        queryFn: async () => {
            if (!taskId) throw new Error("taskId is null");
            return getTaskById({ projectId, taskId });
        }
    })

    if (data) return <EditTaskModal />
}
