import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import Icon, { HomeOutlined } from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { Space } from 'antd';

const NumberSvg = () => (
<svg width="20" height="20" viewBox="0 0 20 20" fill="transparent" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.66666 14.167L10 18.3337L18.3333 14.167" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1.66666 10L10 14.1667L18.3333 10" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 1.66699L1.66666 5.83366L10 10.0003L18.3333 5.83366L10 1.66699Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

)

const NumberIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={NumberSvg} {...props} />
)


export default NumberIcon;