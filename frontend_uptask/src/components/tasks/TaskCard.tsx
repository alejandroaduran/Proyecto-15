import type { Task } from "@/types/index"

type TaskCardProps = {
    task : Task
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <span>{task.status}</span>
    </div>
  )
}
