import classNames from "classnames";
import React, { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { v4 as uidV4 } from "uuid";
import { useActions, useAppSelector } from "../../../customHook/redux";
import { activePanelMenuMobileGET } from "../../../store/selectors";
import { TUid } from "../../../types/default";
import { checkWidthWindow } from "../../../utils/checkWidthWindow";
import { WIDTH_ADAPTIVE } from "../../../utils/globalVars";
import { newData } from "../../../utils/newData";
import Icon from "../../UI/Icon/Icon";
import Text from "../../UI/Text/Text";
import styles from "./PanelMenu.module.scss";

interface IContentMenuItem {
    uid: TUid;
    svg: ReactNode;
    name: string;
    path: string | null;
    children?: IContentMenuItem[];
}

type TActiveMenuItem = {
    [key in TUid]: boolean;
};

const content: IContentMenuItem[] = [
    {
        path: "/",
        uid: uidV4(),
        svg: <Icon type="main" />,
        name: "Главная",
    },
    {
        path: "/address",
        uid: uidV4(),
        svg: <Icon type="findAddress" />,
        name: "Поиск адресов",
    },
    {
        path: null,
        uid: uidV4(),
        svg: <Icon type="table" />,
        name: "Таблицы",
    },
    {
        path: null,
        uid: uidV4(),
        svg: <Icon type="calendar" />,
        name: "Календарь",
    },
    {
        path: null,
        uid: uidV4(),
        svg: <Icon type="maps" />,
        name: "Карты",
    },
    {
        path: null,
        uid: uidV4(),
        svg: <Icon type="widgets" />,
        name: "Виджеты",
    },
    {
        path: null,
        uid: uidV4(),
        svg: <Icon type="settings" />,
        name: "Настройки",
        children: [
            {
                path: null,
                uid: uidV4(),
                svg: <Icon type="settingsProfile" />,
                name: "Настройки профиля",
            },
            {
                path: null,
                uid: uidV4(),
                svg: <Icon type="settingsFinance" />,
                name: "Управление финансами",
            },
        ],
    },
    {
        path: null,
        uid: uidV4(),
        svg: <Icon type="exit" />,
        name: "Выход",
    },
];

const PanelMenu = () => {
    const location = useLocation();

    const { changeActivePanelMenuMobileACTION } = useActions();

    const activePanelMenuMobile = useAppSelector(activePanelMenuMobileGET);

    const [activeMenuItem, setActiveMenuItem] = useState<TActiveMenuItem>({});

    const changeActiveMenuItem = (uid: TUid) => {
        setActiveMenuItem((prev) => {
            const newPrev = newData(prev);

            if (newPrev.hasOwnProperty(uid)) {
                newPrev[uid] = !newPrev[uid];
            } else {
                newPrev[uid] = true;
            }

            return newPrev;
        });
    };

    const renderItemsMenu = (children: IContentMenuItem[]) => {
        return (
            <div className={styles.contentList}>
                {children.map((item) => {
                    const contentLink = (
                        <>
                            <div className={styles.itemWrapperLeft}>
                                <div className={styles.itemIcon}>
                                    {item.svg}
                                </div>
                                <div className={styles.itemText}>
                                    <Text
                                        weight={600}
                                        margin={0}
                                    >
                                        {item.name}
                                    </Text>
                                </div>
                            </div>
                            {item?.children && (
                                <div className={styles.itemWrapperArrow}>
                                    <Icon type="arrow" />
                                </div>
                            )}
                        </>
                    );

                    return (
                        <div
                            key={item.uid}
                            className={classNames(styles.item, {
                                [styles.itemActive]: activeMenuItem[item.uid],
                                [styles.itemPageActive]:
                                    location.pathname === item.path,
                            })}
                        >
                            {item.path ? (
                                <Link
                                    to={item.path}
                                    className={styles.itemWrapper}
                                    onClick={() => {
                                        changeActiveMenuItem(item.uid);

                                        // mobile
                                        if (checkWidthWindow(WIDTH_ADAPTIVE)) {
                                            changeActivePanelMenuMobileACTION(
                                                "",
                                            );
                                        }
                                    }}
                                >
                                    {contentLink}
                                </Link>
                            ) : (
                                <div
                                    className={styles.itemWrapper}
                                    onClick={() =>
                                        changeActiveMenuItem(item.uid)
                                    }
                                >
                                    {contentLink}
                                </div>
                            )}
                            {item?.children &&
                                activeMenuItem[item.uid] &&
                                renderItemsMenu(item.children)}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div
            className={classNames(styles.menu, {
                [styles.menuActive]: activePanelMenuMobile,
            })}
        >
            <div className={styles.top}>
                <div className={styles.topText}>
                    <Text
                        weight={700}
                        margin={0}
                    >
                        Меню
                    </Text>
                </div>
                <div
                    className={styles.topClose}
                    onClick={() => changeActivePanelMenuMobileACTION("")}
                >
                    <Icon type="close" />
                </div>
            </div>
            <div className={styles.content}>{renderItemsMenu(content)}</div>
        </div>
    );
};

export default React.memo(PanelMenu);
