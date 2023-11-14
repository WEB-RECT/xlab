import React, { FC, ReactNode } from "react";
import Text from "../UI/Text/Text";

interface IProps {
    statuses: {
        isLoading: boolean;
        isError: boolean;
        isSuccess: boolean;
    };
    children: ReactNode;
}

const RequestStatus: FC<IProps> = ({ statuses, children }) => {
    return (
        <>
            {statuses.isLoading && <Text>Загрузка...</Text>}
            {statuses.isError && <Text>Ошибка Загрузки</Text>}
            {statuses.isSuccess && children}
        </>
    );
};

export default React.memo(RequestStatus);
