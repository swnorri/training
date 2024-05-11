import NewTask from "./NewTask";

export default function Tasks({ tasks, addTask, delTask }) {
    return (
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <NewTask addTask={addTask} />
            {tasks.length === 0 && (<p className="text-stone-800 my-4">
                This project has no tasks yet.
            </p>)}
            {tasks.length > 0 && <ul className="p-4 mt-8 rounded-md bg-stone-100">
                {tasks.map((task) => (
                    <li key={task.id} className="flex justify-between my-4">
                        <span>{task.text}</span>
                        <button onClick={() => delTask(task.id)} className="text-stone-700 hover:rext-red-500">Clear</button>
                    </li>
                ))}
            </ul>}
        </section>
    )
}