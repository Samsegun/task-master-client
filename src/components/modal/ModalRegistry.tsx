import { useModalStore } from "@/store/useModalStore";
import CreateTaskModal from "./CreateTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import EditProjectModal from "./EditProjectModal";
// import DeleteMemberModal from "./DeleteMemberModal"
import EditTaskModal from "./EditTaskModal";
// import CreateProjectModal from "./CreateProjectModal"
import DeleteProjectModal from "./DeleteProjectModal";
import LeaveProjectModal from "./LeaveProjectModal";

function ModalRegistry() {
    const { type } = useModalStore();

    return (
        <>
            {type === "createTask" && <CreateTaskModal />}
            {type === "editProject" && <EditProjectModal />}
            {type === "leaveProject" && <LeaveProjectModal />}
            {type === "editTask" && <EditTaskModal />}
            {type === "deleteTask" && <DeleteTaskModal />}
            {type === "deleteProject" && <DeleteProjectModal />}
            {/* {type === "editProject" && <DeleteTaskModal />}
            {type === "createProject" && <CreateProjectModal />}
            {type === "deleteTask" && < DeleteMemberModal/>} */}
        </>
    );
}

export default ModalRegistry;
