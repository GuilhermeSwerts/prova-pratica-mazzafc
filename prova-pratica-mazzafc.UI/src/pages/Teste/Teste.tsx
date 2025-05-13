import * as React from 'react';
import { GetCurrentQuote } from '../../services/AwesomeApi';
import { AwesomeApi } from '../../types/awesomeApi/AwesomeApi';

function Teste() {
    const coins: (keyof AwesomeApi)[] = ['USD', 'EUR'];
    const [data, setData] = React.useState<AwesomeApi>();
    React.useEffect(() => {
        GetCurrentQuote(coins, response => setData(response));
    }, [])
    return (
        <div className="flex flex-col">
            {coins.map(coin => {
                const element = data && data[`${coin}BRL`];
                if (element) {
                    return <span>{element.bid}<br />{element.code}</span>
                }
            })}
        </div>
    );
}

export default Teste;