import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

export type ModalRef = {
    openNew: () => void;
    openEdit: (id: number, identifier: string) => void;
};

type ModalProps = {
    title?: string;
    children: React.ReactNode;
    buttonTitle: string;
    funcButtonTitle: () => void;
};

type ModalState = {
    show: boolean;
    isEdit: boolean;
    id: number;
    identifier: string;
};

const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -30 },
    visible: { opacity: 1, scale: 1, y: 0 },
};

class Modal extends React.Component<ModalProps, ModalState> {
    constructor(props: ModalProps) {
        super(props);
        this.state = this.initialState;
    }

    initialState: ModalState = {
        show: false,
        isEdit: false,
        id: 0,
        identifier: "",
    };

    onOpenNew = () => {
        this.setState({ show: true });
    };

    onOpenEdit = (id: number, identifier: string) => {
        this.setState({ show: true, isEdit: true, id, identifier });
    };

    onClose = () => {
        this.setState(this.initialState);
    }

    render() {
        const { show } = this.state;
        const { children, title, buttonTitle, funcButtonTitle } = this.props;

        return (
            <AnimatePresence>
                {show && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={backdropVariants}
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={modalVariants}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <div className="flex justify-end items-center">
                                <Button variant="outline" onClick={this.onClose}>
                                    &times;
                                </Button>
                            </div>

                            <div className="mt-4">{children}</div>

                            <div className="flex items-center justify-end mt-6">
                                <Button variant="primary" onClick={funcButtonTitle}>
                                    {buttonTitle}
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }
}

export default Modal;
