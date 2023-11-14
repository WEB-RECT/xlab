import classNames from "classnames";
import React, { FC, ReactNode } from "react";
import styles from "./Text.module.scss";

type TSize = "title" | "text" | "titlePanelMenu" | "namePerson" | "errorText";

interface IProps {
    children: ReactNode;
    size?: TSize;
    weight?: number;
    margin?: string | number;
}

const Text: FC<IProps> = ({ children, size, weight, margin }) => {
    return (
        <div
            className={classNames(styles.text, {
                [styles[size!]]: size,
            })}
            style={{
                fontWeight: weight,
                margin: margin,
            }}
        >
            {children}
        </div>
    );
};

export default React.memo(Text);
