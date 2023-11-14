import React, { FC } from "react";
import Icon from "../Icon/Icon";
import Text from "../Text/Text";
import styles from "./Person.module.scss";

interface IProps {
    url?: string;
    name: string;
}

const Person: FC<IProps> = ({ url, name }) => {
    return (
        <div className={styles.person}>
            <div className={styles.img}>
                {url ? (
                    <img
                        src={url}
                        alt=""
                    />
                ) : (
                    <Icon type="avatar" />
                )}
            </div>
            <div className={styles.name}>
                <Text size="namePerson">{name}</Text>
            </div>
        </div>
    );
};

export default React.memo(Person);
