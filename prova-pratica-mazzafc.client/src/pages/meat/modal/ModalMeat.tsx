import { Input } from "../../../components/ui/Input";
import Modal from "../../../components/ui/Modal";
import Select from "../../../components/ui/Select";
import { IOrigin } from "../../../interfaces/Origin";

type ModalMeatProps = {
    modalRef?: React.Ref<Modal>
    description: string
    setDescription: (text: string) => void;
    origins: IOrigin[]
    setOriginSelected: (id: number) => void;
    onSubmit: () => void;
    originSelected: number
}

export default function ModalMeat({ description, origins, setDescription, setOriginSelected, modalRef, originSelected, onSubmit }: ModalMeatProps) {

    return (
        <Modal
            ref={modalRef}
            buttonTitle="Salvar"
            funcButtonTitle={onSubmit}
            title="Carnes"
        >
            <Input
                label="Descrição da carne"
                type="text"
                placeholder="Descrição da carne"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <Select
                className="w-full"
                label="Origem da carne "
                value={`${originSelected}`}
                onChange={(e) => setOriginSelected(parseInt(e.target.value))}
            >
                {origins.map(origin => (
                    <option value={origin.id}>{origin.name}</option>
                ))}
            </Select>
        </Modal>);
}