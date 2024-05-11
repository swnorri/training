import { useState } from 'react';
import SideBar from "./components/SideBar";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from './components/SelectedProject.jsx';


function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    setProjectState((prevState) => {
      const newTask ={
        text : text,
        projectId: prevState.selectedProjectId,
        id : Math.random()
      }
      return {
        ...prevState,
        tasks : [...prevState.tasks, newTask]
      }
    })
  }
  function handleDeleteTask(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          (item) => item.id !== id
        )
      }
    });
  }
  function handleStartAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    });
  }
  function handleSelectProject(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    });
  }
  function handleCancelAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    });
  }
  function handleDeleteProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (item) => item.id !== prevState.selectedProjectId
        )
      }
    });
  }
  function handleAddProject(newData) {
    setProjectState(prevState => {
      const newProject = {
        ...newData,
        id: Math.random()
      }
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }
  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);
  let content;

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
  }
  else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  else {
    content = <SelectedProject
      project={selectedProject}
      deleteProject={handleDeleteProject}
      tasks={projectState.tasks}
      addTask={handleAddTask}
      delTask={handleDeleteTask}
    />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        selectedProjectId={projectState.selectedProjectId}
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        projects={projectState.projects} />
      {content}
    </main>
  );
}

export default App;
