import {Flex, Spin} from 'antd';
import React from "react";

export function LoadingComponent(){
    return (
        <Flex align="center" gap="middle">
            <Spin /> Loading ...
        </Flex>
    )
}