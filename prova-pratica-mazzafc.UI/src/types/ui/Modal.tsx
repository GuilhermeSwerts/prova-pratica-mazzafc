export type ModalRef = {
    openNew: () => void;
    openEdit: (id: number, identifier: string) => void;
};