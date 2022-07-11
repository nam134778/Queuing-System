import React from 'react';
import 'antd/dist/antd.css';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const ArrowLeftSvg = () => (
<svg width="50" height="20" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.583496 6.66699L5.3335 11.3337C5.66683 11.667 6.16683 11.667 6.50016 11.3337C6.8335 11.0003 6.8335 10.5003 6.50016 10.167L2.41683 6.00033L6.50016 1.83366C6.8335 1.50033 6.8335 1.00033 6.50016 0.666992C6.3335 0.500325 6.16683 0.416992 5.91683 0.416992C5.66683 0.416992 5.50016 0.500325 5.3335 0.666992L0.583496 5.33366C0.250163 5.75033 0.250163 6.25033 0.583496 6.66699C0.583496 6.58366 0.583496 6.58366 0.583496 6.66699Z" fill="#FF7506"/>
</svg>

)


const ArrowLeftIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={ArrowLeftSvg} {...props} />
)


export default ArrowLeftIcon;