import React, {useState} from 'react';
import {Modal, Form, Input, InputNumber, Select, Button, message} from 'antd';
import {AccountInfo, AccountType} from "@/models/models";

const { Option } = Select;

interface CreateAccountModalProps {
    visible: boolean;
    onClose: () => void;
    onCreate: (account: AccountInfo) => Promise<void>;
}

const AccountFormComponent: React.FC<CreateAccountModalProps> = ({
                                                                   visible,
                                                                   onClose,
                                                                   onCreate,
                                                               }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form
            .validateFields()
            .then( async (values) => {

                try {
                    await onCreate(values as AccountInfo);
                    form.resetFields();
                    onClose();
                } catch (error:any) {
                    //console.error(error)
                    messageApi.error(error.message);
                }

            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title="Create New Account"
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Create
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical" name="create_account">
                {contextHolder}
                <Form.Item
                    label="Account Name"
                    name="account_name"
                    rules={[
                        { required: true, message: 'Please input the account name!' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="IBAN"
                    name="iban"
                    rules={[{ required: true, message: 'Please input the IBAN!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: false}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        { required: true, message: 'Please input the amount!' },
                        { type: 'number', min: 0, message: 'Amount must be non-negative' },
                    ]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Type"
                    name="type"
                    rules={[{ required: true, message: 'Please select the account type!' }]}
                >
                    <Select placeholder="Select account type">
                        <Option value={AccountType.Sending}>Sending</Option>
                        <Option value={AccountType.Receiving}>Receiving</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AccountFormComponent;
