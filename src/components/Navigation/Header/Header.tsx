import React from "react";
import { useActions } from "../../../customHook/redux";
import Icon from "../../UI/Icon/Icon";
import Person from "../../UI/Person/Person";
import styles from "./Header.module.scss";

const Header = () => {
    const { changeActivePanelMenuMobileACTION } = useActions();

    return (
        <div className={styles.header}>
            <div
                className={styles.menuOpen}
                onClick={() => changeActivePanelMenuMobileACTION("")}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className={styles.logo}>
                <Icon type="logo" />
            </div>

            <div className={styles.person}>
                <Person name="Имя Фамилия" />
            </div>
        </div>
    );
};

export default React.memo(Header);
