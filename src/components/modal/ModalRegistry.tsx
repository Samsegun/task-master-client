import { useModalStore } from "@/store/useModalStore";
// import CreateTaskModal from "./CreateTaskModal"
import EditProjectModal from "./EditProjectModal";
// import DeleteTaskModal from "./DeleteTaskModal"
// import DeleteMemberModal from "./DeleteMemberModal"
// import EditTaskModal from "./EditTaskModal"
// import CreateProjectModal from "./CreateProjectModal"
// import DeleteProjectModal from "./DeleteProjectModal"
import LeaveProjectModal from "./LeaveProjectModal";

function ModalRegistry() {
    const { type } = useModalStore();

    return (
        <>
            {/* {type === "editProject" && <CreateTaskModal />} */}
            {type === "editProject" && <EditProjectModal />}
            {type === "leaveProject" && <LeaveProjectModal />}
            {/* {type === "editProject" && <DeleteTaskModal />}
            {type === "deleteProject" && <DeleteProjectModal />}
            {type === "createProject" && <CreateProjectModal />}
            {type === "editTask" && <EditTaskModal />}
            {type === "deleteTask" && < DeleteMemberModal/>} */}
        </>
    );
}

export default ModalRegistry;
