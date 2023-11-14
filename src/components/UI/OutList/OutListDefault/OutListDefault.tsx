import React, { FC } from "react";
import { TUid } from "../../../../types/default";
import Text from "../../Text/Text";
import styles from "./OutListDefault.module.scss";

export type TOutListDefaultItem = {
    value: string;
    uid: TUid;
};

interface IProps {
    title: string;
    items: TOutListDefaultItem[];
}

const OutListDefault: FC<IProps> = ({ title, items }) => {
    return (
        <div className={styles.block}>
            <div className={styles.blockTitle}>
                <Text size="title">{title}</Text>
            </div>
            <div className={styles.blockContent}>
                {items.length > 0 ? (
                    items.map((item) => (
                        <div
                            key={item.uid}
                            className={styles.blockContentItem}
                        >
                            <Text margin={0}>{item.value}</Text>
                        </div>
                    ))
                ) : (
                    <Text>Нету данных</Text>
                )}
            </div>
        </div>
    );
};

export default React.memo(OutListDefault);
