import React, { FC, ReactNode } from "react";
import PanelMenu from "../../Menu/PanelMenu/PanelMenu";
import Header from "../../Navigation/Header/Header";
import Content from "../Content/Content";
import styles from "./ProfilePage.module.scss";

interface IProps {
    children: ReactNode;
    title: string | number;
}

const ProfilePage: FC<IProps> = ({ children, title }) => {
    return (
        <div className={styles.page}>
            <Header />

            <div className={styles.block}>
                <div className={styles.blockMenu}>
                    <PanelMenu />
                </div>
                <div className={styles.blockContent}>
                    <Content title={title}>{children}</Content>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ProfilePage);
