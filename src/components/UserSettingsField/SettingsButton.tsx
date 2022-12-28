// @ts-nocheck
import React, { FC } from 'react';
import Button from '../Buttons/BaseButton';

interface ISettingsButton {
    title: string;
    onClick: VoidFunction;
    className: string;
}

const SettingsButton: FC<ISettingsButton> = ({ title, onClick, className }) => {
    return (
        <div>
            <button onClick={onClick} className={className}>
                <Button
                    style=""
                    title={title}
                    link={undefined}
                    color="bg-white text-black"
                />
            </button>
        </div>
    );
};

export default SettingsButton;
