import {AccountInfo, ApiResponse} from "@/models/models";
import axios from "axios";
class AccountService {

    private HOST = process.env.NEXT_PUBLIC_API_URL;
    private API_URL = `${this.HOST}/v1/api/account-info`;

    async getAllAccounts(): Promise<AccountInfo[]> {
        try {
            const response = await axios.get<ApiResponse<AccountInfo[]>>(this.API_URL);
            return response.data.data;
        } catch (error) {
            throw new Error('Error fetching accounts');
        }
    }

    async getAccountById(id: number): Promise<AccountInfo> {
        try {
            const response = await axios.get<ApiResponse<AccountInfo>>(`${this.API_URL}/${id}`);
            return response.data.data;
        } catch (error) {
            throw new Error(`Error fetching account with ID ${id}`);
        }
    }

    async createAccount(author: AccountInfo): Promise<AccountInfo> {
        try {
            const response = await axios.post<ApiResponse<AccountInfo>>(this.API_URL, author);
            return response.data.data;
        } catch (error) {
            throw new Error('Error creating account');
        }
    }

}

export const accountService = new AccountService();