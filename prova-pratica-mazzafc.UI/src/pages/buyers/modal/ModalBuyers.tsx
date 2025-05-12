import { Input } from "../../../components/ui/Input";
import Modal from "../../../components/ui/Modal";
import SearchableSelect from "../../../components/ui/SearchableSelect";
import Select from "../../../components/ui/Select";
import { OptionType } from '../../../types/ui/SearchableSelect'

type ModalBuyerProps = {
    modalRef?: React.Ref<Modal>
    onSubmit: () => void;
    onEdit: (identifier: string) => void;
    name: string;
    setName: (value: string) => void;
    document: string
    setDocument: (value: string) => void;
    state: string
    setState: (value: string) => void;
    city: string
    setCity: (value: string) => void;
    citys: string[];
    states: string[];
}

export default function ModalBuyer({ citys = [], states = [], city, document, name, setCity, setDocument, setName, setState, state, modalRef, onSubmit, onEdit }: ModalBuyerProps) {

    const stateOptions: OptionType[] = states.map(name => ({
        label: name,
        value: name,
    }));

    const cityOptions: OptionType[] = citys.map(name => ({
        label: name,
        value: name,
    }));

    function formatCpfCnpj(value: string): string {
        const digits = value.replace(/\D/g, '');

        if (digits.length <= 11) {
            return digits
                .replace(/^(\d{3})(\d)/, '$1.$2')
                .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
                .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
                .slice(0, 14);
        } else {
            return digits
                .replace(/^(\d{2})(\d)/, '$1.$2')
                .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
                .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
                .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5')
                .slice(0, 18);
        }
    }


    return (
        <Modal
            ref={modalRef}
            buttonTitle="Salvar"
            funcNewItem={onSubmit}
            funcEditItem={onEdit}
            title="Carnes"
        >
            <Input
                label="Nome do comprador "
                type="text"
                placeholder="Nome do comprador "
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                label="CPF ou CNPJ"
                type="text"
                placeholder="CPF ou CNPJ"
                value={formatCpfCnpj(document)}
                onChange={(e) => setDocument(e.target.value)}
            />
            <SearchableSelect
                label="Selecione uma Cidade"
                onChange={(value) => setState(value)}
                value={`${state}`}
                options={stateOptions}
                className="w-full"
            />
            <SearchableSelect
                label="Selecione um Estado"
                onChange={(value) => setCity(value)}
                value={`${city}`}
                options={cityOptions}
                className="w-full"
            />
        </Modal>);
}