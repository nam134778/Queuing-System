import React from 'react';
import 'antd/dist/antd.css';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const PlusSvg = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="transparent" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.8884 2.3335H9.11171C4.86504 2.3335 2.33337 4.86516 2.33337 9.11183V18.8768C2.33337 23.1352 4.86504 25.6668 9.11171 25.6668H18.8767C23.1234 25.6668 25.655 23.1352 25.655 18.8885V9.11183C25.6667 4.86516 23.135 2.3335 18.8884 2.3335ZM18.6667 14.8752H14.875V18.6668C14.875 19.1452 14.4784 19.5418 14 19.5418C13.5217 19.5418 13.125 19.1452 13.125 18.6668V14.8752H9.33337C8.85504 14.8752 8.45837 14.4785 8.45837 14.0002C8.45837 13.5218 8.85504 13.1252 9.33337 13.1252H13.125V9.3335C13.125 8.85516 13.5217 8.4585 14 8.4585C14.4784 8.4585 14.875 8.85516 14.875 9.3335V13.1252H18.6667C19.145 13.1252 19.5417 13.5218 19.5417 14.0002C19.5417 14.4785 19.145 14.8752 18.6667 14.8752Z" fill="#FF9138"/>
    </svg>
)


const PlusIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={PlusSvg} {...props} />
)


export default PlusIcon;