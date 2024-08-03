// components/AccountModal.tsx

import React from 'react';
import {Modal, Descriptions, Form, Input} from 'antd';
import {AccountInfo, AccountType} from "@/models/models";

interface AccountModalProps {
    visible: boolean;
    onClose: () => void;
    account: AccountInfo | null;
}

const AccountModal: React.FC<AccountModalProps> = ({ visible, onClose, account }) => {
    if (!account) return null;

    return (
        <Modal
            title="Account Details"
            visible={visible}
            onCancel={onClose}
            footer={null} // Remove footer buttons
        >
            <Form layout="vertical">
                <Form.Item label="Account Number">
                    <Input value={account.account_number ?? 'N/A'} readOnly />
                </Form.Item>
                <Form.Item label="Account Name">
                    <Input value={account.account_name} readOnly />
                </Form.Item>
                <Form.Item label="IBAN">
                    <Input value={account.iban} readOnly />
                </Form.Item>
                <Form.Item label="Address">
                    <Input value={account.address} readOnly />
                </Form.Item>
                <Form.Item label="Amount">
                    <Input value={account.amount.toString()} readOnly />
                </Form.Item>
                <Form.Item label="Type">
                    <Input value={account.type === AccountType.Sending ? 'Sending' : 'Receiving'} readOnly />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AccountModal;
