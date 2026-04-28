import type { ProjectRole, Task } from "@/lib/apiTypes";
import type { MemberShape, ProjectStatus } from "@/lib/types";
import { create } from "zustand";

type ModalType =
    | "createTask"
    | "editTask"
    | "deleteTask"
    | "createProject"
    | "editProject"
    | "deleteProject"
    | "leaveProject"
    | "markProject"
    | "addMember"
    | "editProjectMember"
    | "removeProjectMember";

interface ModalData {
    // task modals
    projectId?: string;
    task?: Task["task"];
    projectMembers?: MemberShape[];

    // project modals
    projectName?: string;
    projectStatus?: ProjectStatus;
    projectRole?: ProjectRole;
    projectDescription?: string;

    // member modals
    memberInfo?: MemberShape;
}

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    modalData: ModalData;

    openModal: (type: ModalType, data?: ModalData) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalStore>(set => {
    return {
        type: null,
        isOpen: false,
        modalData: {},
        openModal(type, modalData = {}) {
            set({ type, isOpen: true, modalData });
        },
        closeModal() {
            set({ type: null, isOpen: false, modalData: {} });
        },
    };
});
