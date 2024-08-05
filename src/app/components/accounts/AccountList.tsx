import {useEffect, useState} from "react";
import {AccountInfo, AccountType} from "@/models/models";
import {accountService} from "@/services/account.service";
import {Button, message, Space, Table} from "antd"
import AccountModal from "@/app/components/accounts/AccountModal";
import AccountFormModal from "@/app/components/accounts/AccountForm";



export function AuthorsListComponent() {
    const [accounts, setAccounts] = useState<AccountInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedAccount, setSelectedAccount] = useState<AccountInfo | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    let counter:number = 1
    const columns = [
        {
            title: 'Nr',
            dataIndex: 'Nr',
            render: (_: any, record: AccountInfo) => (
             <p>{counter++}</p>
            ),
        },
        {
            title: 'Account Number',
            dataIndex: 'account_number',
            key: 'account_number',
        },
        {
            title: 'Name',
            dataIndex: 'account_name',
            key: 'account_name',
        },
        {
            title: 'Iban',
            dataIndex: 'iban',
            key: 'iban',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type: AccountType) => (type === AccountType.Sending ? 'Sending' : 'Receiving'),
            // this is not correct but i am leaving it form simplicity
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: AccountInfo) => (
                <Button type="primary" onClick={() => showModal(record)}>
                    View Details
                </Button>
            ),
        },
    ];

    const showModal = (account: AccountInfo) => {
        setSelectedAccount(account);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setSelectedAccount(null);
        setIsModalVisible(false);
    };


    useEffect(() => {
        loadAuthors();
    }, []);

    const loadAuthors = async () => {
        try {
            const data = await accountService.getAllAccounts();
            setAccounts(data);
            setLoading(false);
        } catch (error:any) {
            messageApi.error(error.message)
            setLoading(false);
        }
    };

    const handleCreateAccount = async (newAccount: AccountInfo)=> {
        try {
            const data = await accountService.createAccount(newAccount);
            setAccounts((prevAccounts) => [...prevAccounts, data]);
        } catch (error) {
          throw error;
        }

    };

    return (
        <div>
            {contextHolder}
            <div className="flex justify-between w-full items-center mb-4">
                <h1 className="text-3xl font-bold">Account List</h1>
                <Button
                    type="primary"
                    onClick={() => setIsCreateModalVisible(true)}
                >
                    Create New Account
                </Button>
            </div>

            <Table loading={loading} dataSource={accounts} columns={columns} />
            <AccountModal
                visible={isModalVisible}
                onClose={handleCloseModal}
                account={selectedAccount}
            />
            <AccountFormModal
                visible={isCreateModalVisible}
                onClose={() => setIsCreateModalVisible(false)}
                onCreate={handleCreateAccount}
            />
        </div>
    );
}