import * as React from 'react';
import Modal from '../../../components/ui/Modal';
import SearchableSelect from '../../../components/ui/SearchableSelect';
import { Buyer } from '../../../types/buyers/Buyers';
import { OptionType } from '../../../types/ui/SearchableSelect';
import { Coin } from '../../../types/Coin/Coin';
import { Meats } from '../../../types/Meat/Meat';
import ModalOrderMeat from './ModalOrderMeat';
import { GenericTable } from '../../../components/ui/Table';
import { Column } from '../../../types/ui/Table';
import Button from '../../../components/ui/Button';
import { FaPlus } from 'react-icons/fa';
import { maskValue } from '../../../utils/mask';

type MoalOrderProps = {
    modalRef?: React.Ref<Modal>
    onSubmit: () => void;
    onEdit: (identifier: string) => void;

    setBuyerSelected: (id: number) => void;
    buyerSelected: number;
    buyers: Buyer[]

    setCoinSelected: (id: number) => void;
    coinSelected: Coin | null;
    coins: Coin[];

    setMeatSelected: (meat: Meats) => void;
    meatSelected: Meats[];
    meats: Meats[];

    meatModalSelected: number;
    setMeatModalSelected: (id: number) => void;
    price: number
    quantity: number
    setPrice: (value: number) => void;
    setQuantity: (value: number) => void;
    handleDelete: (id: number) => void;
}

function ModalOrder(
    { meats,
        meatSelected,
        setMeatSelected,
        modalRef,
        onSubmit,
        onEdit,
        setBuyerSelected,
        buyerSelected,
        buyers,
        coins,
        setCoinSelected,
        coinSelected = null,
        meatModalSelected,
        setMeatModalSelected,
        price,
        quantity,
        setPrice,
        setQuantity,
        handleDelete
    }: MoalOrderProps) {

    const modalOrderMeatRef = React.useRef<Modal>(null)

    const buyerOptions: OptionType[] = buyers.map(buyer => ({
        label: buyer.name,
        value: `${buyer.id}`,
    }));

    const coinOptions: OptionType[] = coins.map(buyer => ({
        label: buyer.name,
        value: `${buyer.id}`,
    }));

    const columns: Column<Meats>[] = [
        { header: "Carne", accessor: "name" },
        { header: "Quantidade", accessor: "quantity" },
        { header: "Preço", accessor: "price" },
    ];

    const total = meatSelected.reduce((acc, item) => {
        const priceStr = `${item.price}`.includes(' ') ? `${item.price}`.split(' ')[1] : item?.price;
        const price = priceStr ? parseFloat(priceStr) : 0;
        return acc + (item.quantity || 0) * price;
    }, 0);

    return (
        <Modal
            ref={modalRef}
            buttonTitle="Salvar"
            funcNewItem={onSubmit}
            funcEditItem={onEdit}
        >

            <ModalOrderMeat
                modalRef={modalOrderMeatRef}
                coinSelected={coinSelected}
                meats={meats}
                onSubmit={(meat) => { setMeatSelected(meat); modalOrderMeatRef.current?.onClose() }}
                meatModalSelected={meatModalSelected}
                quantity={quantity}
                price={price}
                setMeatModalSelected={setMeatModalSelected}
                setQuantity={setQuantity}
                setPrice={setPrice}
            />
            <SearchableSelect
                label="Selecione um Comprador"
                onChange={(value) => setBuyerSelected(parseInt(value))}
                value={`${buyerSelected == 0 ? "" : buyerSelected}`}
                options={buyerOptions}
                className="w-full"
            />
            <SearchableSelect
                label="Selecione uma Moeda"
                onChange={(value) => { console.log(value); setCoinSelected(parseInt(value)) }}
                value={`${coinSelected ? coinSelected.id : ""}`}
                options={coinOptions}
                className="w-full"
            />
            <div className="m-5">
                <Button disabled={!coinSelected || !buyerSelected} onClick={() => modalOrderMeatRef.current?.onOpenNew()} className='w-full flex items-center justify-center'><FaPlus /> Adicionar Carne </Button>
            </div>
            <GenericTable
                data={meatSelected}
                columns={columns}
                keyField="id"
                enableActions
                disabledEdit
                onEdit={(key) => (`${key}`)}
                onDelete={(key) => handleDelete(parseInt(`${key}`))}
            />
            {coinSelected && <div className="mt-5 flex items-center justify-end">
                <h1>Total: {maskValue(total,coinSelected?.prefix)}</h1>
            </div>}
        </Modal>
    );
}

export default ModalOrder;