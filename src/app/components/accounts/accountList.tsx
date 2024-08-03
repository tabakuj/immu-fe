import {useEffect, useState} from "react";
import {AccountInfo, AccountType} from "@/models/models";
import {accountService} from "@/services/account.service";
import {Button, Table} from "antd"
import {LoadingComponent} from "@/app/components/Loading";
import AccountModal from "@/app/components/accounts/accountModal";



export function AuthorsListComponent() {
    const [accounts, setAuthors] = useState<AccountInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedAccount, setSelectedAccount] = useState<AccountInfo | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    //const [showForm, setShowForm] = useState<boolean>(false);

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
            setAuthors(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingComponent/>;
    }


    return (
        <div>
            <h1>Account List</h1>
            <Table dataSource={accounts} columns={columns} />
            <AccountModal
                visible={isModalVisible}
                onClose={handleCloseModal}
                account={selectedAccount}
            />
        </div>
    );
}