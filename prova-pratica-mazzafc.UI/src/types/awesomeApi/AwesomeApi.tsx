
export type USDBRL = AwesomeBase;
export type EURBRL = AwesomeBase;

export type AwesomeBase = {
    bid: string;
    code: string;
}

export type AwesomeApi = {
    USDBRL: USDBRL;
    EURBRL: EURBRL;
    BRLBRL: {
        bid: '1';
        code: 'BRL';
    };
};