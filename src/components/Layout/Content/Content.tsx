import React, { FC, ReactNode } from "react";
import Text from "../../UI/Text/Text";
import styles from "./Content.module.scss";

interface IProps {
    children: ReactNode;
    title: string | number;
}

const Content: FC<IProps> = ({ children, title }) => {
    return (
        <div className={styles.content}>
            <Text size="title">{title}</Text>
            {children}
        </div>
    );
};

export default React.memo(Content);
