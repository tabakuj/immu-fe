import {useEffect, useState} from "react";
import {AccountInfo, AccountType} from "@/models/models";
import {accountService} from "@/services/account.service";
import {Button, Table} from "antd"
import {LoadingComponent} from "@/app/components/Loading";
import AccountModal from "@/app/components/accounts/accountModal";
import AccountFormModal from "@/app/components/accounts/accountForm";



export function AuthorsListComponent() {
    const [accounts, setAccounts] = useState<AccountInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedAccount, setSelectedAccount] = useState<AccountInfo | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

    const columns = [
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
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    // todo handle error with toster and not close the model in case of error
    const handleCreateAccount = async (newAccount: AccountInfo) => {
        try {
            const data = await accountService.createAccount(newAccount);
            setAccounts((prevAccounts) => [...prevAccounts, data]);
        } catch (error) {
            console.error(error);
        }

    };

    if (loading) {
        return <LoadingComponent/>;
    }


    return (
        <div>
            <h1>Account List</h1>
            <Button
                type="primary"
                onClick={() => setIsCreateModalVisible(true)}
                style={{ marginBottom: '20px' }}
            >
                Create New Account
            </Button>
            <Table dataSource={accounts} columns={columns} />
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