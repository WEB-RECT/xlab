import React, { FC, ReactNode } from "react";
import Icon, { TNameSvgList } from "../Icon/Icon";
import styles from "./Button.module.scss";

interface IProps {
    children: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    iconLeft?: TNameSvgList;
    iconRight?: TNameSvgList;
    disabled?: boolean;
}

const Button: FC<IProps> = ({
    children,
    onClick,
    iconLeft,
    iconRight,
    disabled,
}) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            disabled={disabled}
        >
            {iconLeft && (
                <div className={styles.svg}>
                    <Icon type={iconLeft} />
                </div>
            )}
            <span>{children}</span>
            {iconRight && (
                <div className={styles.svg}>
                    <Icon type={iconRight} />
                </div>
            )}
        </button>
    );
};

export default React.memo(Button);
