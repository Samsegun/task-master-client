import { useModalStore } from "@/store/useModalStore";
import AddMemberModal from "./AddMemberModal";
import CreateTaskModal from "./CreateTaskModal";
import DeleteMemberModal from "./DeleteMemberModal";
import DeleteProjectModal from "./DeleteProjectModal";
import DeleteTaskModal from "./DeleteTaskModal";
import EditMemberModal from "./EditMemberModal";
import EditProjectModal from "./EditProjectModal";
import EditTaskModal from "./EditTaskModal";
import LeaveProjectModal from "./LeaveProjectModal";
import MarkProject from "./MarkProject";

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
            {type === "markProject" && <MarkProject />}
            {type === "addMember" && <AddMemberModal />}
            {type === "editProjectMember" && <EditMemberModal />}
            {type === "removeProjectMember" && <DeleteMemberModal />}
        </>
    );
}

export default ModalRegistry;
