
export enum AccountType {
    Sending = 1,
    Receiving
}

export interface AccountInfo {
    account_number?: number
    account_name: string
    iban: string
    address: string
    amount: number
    type?: AccountType;
}

export interface ApiResponse<T> {
    data: T
    error_message: string
}