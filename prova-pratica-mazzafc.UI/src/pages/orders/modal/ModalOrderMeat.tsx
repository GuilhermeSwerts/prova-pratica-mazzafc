import * as React from 'react';
import Modal from '../../../components/ui/Modal';
import { OptionType } from '../../../types/ui/SearchableSelect';
import { Meats } from '../../../types/Meat/Meat';
import SearchableSelect from '../../../components/ui/SearchableSelect';
import { Input, InputPrice } from '../../../components/ui/Input';
import { Coin } from '../../../types/Coin/Coin';
import Button from '../../../components/ui/Button';
import { FaPlus } from 'react-icons/fa';
import { Alert } from '../../../utils/alert/Alert';
import { maskValue } from '../../../utils/mask';

type ModalOrderMeatProps = {
    modalRef?: React.Ref<Modal>
    onSubmit: (meat: Meats) => void;
    meats: Meats[];
    coinSelected: Coin | null;
    quantity: number
    price: number;
    meatModalSelected: number;
    setMeatModalSelected: (id: number) => void;
    setQuantity: (value: number) => void;
    setPrice: (value: number) => void;
}

function ModalOrderMeat({ meatModalSelected, onSubmit, modalRef, meats, coinSelected, price, quantity, setMeatModalSelected, setPrice, setQuantity }: ModalOrderMeatProps) {
    const meatOptions: OptionType[] = meats.map(meat => ({
        label: meat.name,
        value: `${meat.id}`,
    }));

    const handleSubmit = () => {

        if (!meatModalSelected) {
            Alert('Atenção', 'Informe a carne', false, false, true);
            return;
        }
        if (!price) {
            Alert('Atenção', 'Informe o valor', false, false, true);
            return;
        }
        if (!quantity) {
            Alert('Atenção', 'Informe a quantidade', false, false, true);
            return;
        }

        const meat: Meats = {
            id: meatModalSelected,
            price: maskValue(price,coinSelected?.prefix ?? ""),
            quantity: quantity,
            dtRegister: "",
            identifier: "",
            name: meatOptions.find(x => x.value == `${meatModalSelected}`)?.label ?? "",
            origin: "",
            originId: 0
        }

        onSubmit(meat);
    }

    return (
        <Modal
            ref={modalRef}
            buttonTitle="Salvar"
            funcNewItem={() => { }}
            funcEditItem={() => { }}
            title="Carnes"
            hiddenButton
        >
            <SearchableSelect
                label="Selecione uma Carne"
                onChange={(value) => setMeatModalSelected(parseInt(value))}
                value={`${meatModalSelected ? meatModalSelected : ""}`}
                options={meatOptions}
                className="w-full"
            />
            <InputPrice
                label='Digite o valor'
                prefix={coinSelected?.prefix ?? ""}
                onChangeValue={value => {
                    setPrice(value)
                }}
                value={price}
            />
            <Input
                label="Quantidade"
                type="number"
                min={1}
                placeholder="Quantidade"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <div className="m-5">
                <Button onClick={handleSubmit} className='w-full flex items-center justify-center'><FaPlus /> Adicionar</Button>
            </div>
        </Modal>
    );
}

export default ModalOrderMeat;