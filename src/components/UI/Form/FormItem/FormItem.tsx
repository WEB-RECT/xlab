import React, { FC, ReactNode } from "react";
import Text from "../../Text/Text";
import styles from "./FormItem.module.scss";

interface IProps {
    label: string;
    children: ReactNode;
}

const FormItem: FC<IProps> = ({ label, children }) => {
    return (
        <div className={styles.block}>
            <div className={styles.label}>
                <Text>{label}</Text>
            </div>
            <div className={styles.input}>{children}</div>
        </div>
    );
};

export default React.memo(FormItem);
