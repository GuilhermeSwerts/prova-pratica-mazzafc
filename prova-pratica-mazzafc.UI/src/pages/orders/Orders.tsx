import { useEffect, useRef, useState } from 'react';
import { Column } from '../../types/ui/Table';
import { Order, OrderCurrentQuote } from '../../types/orders/Order';
import { FilterSelected } from '../../types/ui/FilterBuilder';
import { FilterBuilder } from '../../components/ui/Filter';
import { GenericTable } from '../../components/ui/Table';
import { TransformData } from '../../utils/tools/TransformData';
import Modal from '../../components/ui/Modal';
import { AllOrders, DeleteOrder, EditOrder, NewOrder, OrderByIdentifier } from '../../services/Order';
import { Alert } from '../../utils/alert/Alert';
import { Buyer } from '../../types/buyers/Buyers';
import { AllBuyers } from '../../services/Buyers';
import { Coin } from '../../types/Coin/Coin';
import { AllCoin } from '../../services/Coin';
import { AllMeats } from '../../services/Meat';
import { Meats } from '../../types/Meat/Meat';
import ModalOrder from './modal/ModalOrder';
import { IOrder, IOrderMeat } from '../../interfaces/Order';
import { GetCurrentQuote } from '../../services/AwesomeApi';
import { AwesomeApi } from '../../types/awesomeApi/AwesomeApi';

function Orders() {
    const modalRef = useRef<Modal>(null);

    const [currentQuote, setCurrentQuote] = useState<AwesomeApi>();

    const [orders, setOrders] = useState<OrderCurrentQuote[]>([]);
    const [filters, setFilters] = useState<FilterSelected[]>([])

    const [buyers, setBuyers] = useState<Buyer[]>([]);
    const [coins, setCoins] = useState<Coin[]>([]);
    const [meats, setMeats] = useState<Meats[]>([]);

    const [buyerSelected, setBuyerSelected] = useState(0);
    const [coinSelected, setCoinSelected] = useState<Coin | null>(null);
    const [meatsSelecteds, setMeatsSelecteds] = useState<Meats[]>([]);

    const [meatModalSelected, setMeatModalSelected] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);

    const GetValueCurrentQuote = (total: number, coin: keyof AwesomeApi, currentsQuotes: AwesomeApi | null) => {
        if (!currentsQuotes)
            return 'R$ ' + (total).toFixed(2)

        var current = currentsQuotes[coin] ? currentsQuotes[coin] : {
            bid: '1',
            code: 'BRL'
        }

        return 'R$ ' + (total * parseFloat(current.bid)).toFixed(2)
    }

    const onLoadPage = (currentsQuotes: AwesomeApi | null = null) => {
        if (!currentsQuotes)
            currentsQuotes = currentQuote || null

        const encodedFilters = encodeURIComponent(JSON.stringify(filters));
        const params = `filters=${encodedFilters}`;
        AllOrders(params, response => {
            debugger
            var data: OrderCurrentQuote[] = response.map(order => ({
                buyerId: order.buyerId,
                buyerName: order.buyerName,
                dtRegister: order.dtRegister,
                meats: order.meats,
                prefixCoin: order.prefixCoin,
                quantity: order.quantity,
                quantityTotal: order.quantityTotal,
                typeCoin: order.typeCoin,
                total: order.total,
                totalCurrentQuote: GetValueCurrentQuote(parseFloat(order.total.split(' ')[1]), `${order.typeCoin}BRL` as keyof AwesomeApi, currentsQuotes),
                typeCoinId: order.typeCoinId,
                identifier: order.identifier
            }))


            setOrders(data);
        })
    }

    const columns: Column<OrderCurrentQuote>[] = [
        { header: "Nome Comprador", accessor: "buyerName" },
        { header: "Moeda", accessor: "typeCoin" },
        { header: "Total", accessor: "total" },
        { header: "Total Na Cotação Atual (BRL)", accessor: "totalCurrentQuote" },
        { header: "Data Cadastro", accessor: "dtRegister" },
        { header: "Quantidade de produtos", accessor: "quantityTotal" },
        { header: "Quantidade de tipo de carne", accessor: "quantity" },
    ];

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [coinsRes, buyersRes, meatsRes] = await Promise.all([
                    new Promise<Coin[]>(resolve => AllCoin(resolve)),
                    new Promise<Buyer[]>(resolve => AllBuyers("", resolve)),
                    new Promise<Meats[]>(resolve => AllMeats("", resolve))
                ]);

                setCoins(coinsRes);
                var foreignCurrencies = coinsRes
                    .filter(x => x.name != "BRL")
                    .map(x => x.name);

                setBuyers(buyersRes);
                setMeats(meatsRes);

                GetCurrentQuote(foreignCurrencies, response => {
                    setCurrentQuote(response);
                    onLoadPage(response);
                });
            } catch (error) {
                Alert('Erro ao buscar os dados', '', false);
            }
        };

        fetchAll();
    }, []);

    const handleDelete = (key: string) => {
        DeleteOrder(key, () => {
            onLoadPage();
            Alert("Sucesso!", "Item excluido com sucesso!");
        });
    }

    const onSelectedMeat = (meat: Meats) => {
        if (meatsSelecteds.find(x => x.id === meat.id)) {
            Alert('Atenção', 'Carne já adicionada na lista', false, false, true);
            return;
        }
        setMeatsSelecteds(prevState => [...prevState, meat]);
        setMeatModalSelected(0);
        setQuantity(0);
        setPrice(0);
    }

    const handleSubmit = () => {
        if (!buyerSelected) {
            Alert('Atenção', 'Informe um comprador', false, false, true);
            return;
        }
        if (!coinSelected) {
            Alert('Atenção', 'Informe uma moeda', false, false, true);
            return;
        }
        if (!meatsSelecteds || meatsSelecteds.length == 0) {
            Alert('Atenção', 'Informe pelo menos 1 carne', false, false, true);
            return;
        }

        const orderMeat: IOrderMeat[] = meatsSelecteds.map(meat => {
            return {
                id: meat.id,
                price: parseFloat(meat.price?.split(' ')[1] ?? "0"),
                quantity: meat.quantity ?? 0
            }
        })

        const data: IOrder = {
            identifier: "00000000-0000-0000-0000-000000000000",
            buyerId: buyerSelected,
            typeCoinId: coinSelected?.id ?? 0,
            meatOrigins: orderMeat
        }
        NewOrder(data, () => {
            onLoadPage();
            modalRef.current?.onClose();
            setBuyerSelected(0)
            setCoinSelected(null)
            setMeatsSelecteds([])
            Alert('Pedido cadastrado com sucesso!');
        })
    }

    const handleOpenEdit = (identifier: string) => {
        OrderByIdentifier(identifier, response => {
            setBuyerSelected(response.buyerId);
            setCoinSelected(coins.find(x => x.id == response.typeCoinId) ?? null);
            setMeatsSelecteds(response.meats);
            modalRef.current?.onOpenEdit(identifier)
        });
    }

    const handleEditOrder = (identifier: string) => {
        if (!buyerSelected) {
            Alert('Atenção', 'Informe um comprador', false, false, true);
            return;
        }
        if (!coinSelected) {
            Alert('Atenção', 'Informe uma moeda', false, false, true);
            return;
        }
        if (!meatsSelecteds || meatsSelecteds.length == 0) {
            Alert('Atenção', 'Informe pelo menos 1 carne', false, false, true);
            return;
        }

        const orderMeat: IOrderMeat[] = meatsSelecteds.map(meat => {
            return {
                id: meat.id,
                price: parseFloat(`${meat.price}`?.includes(' ') ? `${meat.price}`?.split(' ')[1] ?? "0" : `${meat.price ?? 0}`),
                quantity: meat.quantity ?? 0
            }
        })

        const data: IOrder = {
            identifier: identifier,
            buyerId: buyerSelected,
            typeCoinId: coinSelected?.id ?? 0,
            meatOrigins: orderMeat
        }
        EditOrder(data, identifier, () => {
            onLoadPage();
            modalRef.current?.onClose()
            Alert('Pedido editado com sucesso!');
        });
    }

    const transformedData = TransformData(orders, ["buyerName", "typeCoin", "quantityTotal", "quantity", "dtRegister"]);
    return (
        <div className="p-4">
            <ModalOrder
                price={price}
                quantity={quantity}
                setPrice={setPrice}
                setQuantity={setQuantity}
                meatModalSelected={meatModalSelected}
                setMeatModalSelected={setMeatModalSelected}
                modalRef={modalRef}
                buyers={buyers}
                coins={coins}
                meats={meats}
                buyerSelected={buyerSelected}
                setBuyerSelected={setBuyerSelected}
                coinSelected={coinSelected}
                setCoinSelected={id => setCoinSelected(coins.find(x => x.id === id) ?? null)}
                meatSelected={meatsSelecteds}
                handleDelete={id => setMeatsSelecteds(meatsSelecteds.filter(x => x.id != id))}
                setMeatSelected={meat => onSelectedMeat(meat)}
                onSubmit={() => handleSubmit()}
                onEdit={(identifier) => handleEditOrder(identifier)}
            />
            <FilterBuilder
                filters={filters}
                setFilters={setFilters}
                onFilter={() => onLoadPage()}
                onNewItem={() => modalRef.current?.onOpenNew()}
                transformDataKeys={transformedData}
                columns={columns.map(meat => ({ key: meat.accessor, name: meat.header }))}
            />
            <GenericTable
                data={orders}
                columns={columns}
                keyField="identifier"
                enableActions
                onEdit={(key) => handleOpenEdit(`${key}`)}
                onDelete={(key) => handleDelete(String(key))}
            />
        </div>
    );
}

export default Orders;