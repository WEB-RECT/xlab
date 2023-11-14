import React, { useCallback, useState } from "react";
import { v4 as uidV4 } from "uuid";
import ProfilePage from "../../components/Layout/ProfilePage/ProfilePage";
import RequestStatus from "../../components/RequestStatus/RequestStatus";
import Button from "../../components/UI/Button/Button";
import FormItem from "../../components/UI/Form/FormItem/FormItem";
import Input from "../../components/UI/Form/Input/Input";
import OutListDefault, {
    TOutListDefaultItem,
} from "../../components/UI/OutList/OutListDefault/OutListDefault";
import useValidate from "../../customHook/useValidate";
import { useGetAddressAPIMutation } from "../../services/AddressServices";
import styles from "./Address.module.scss";

type TSuggestionItems = TOutListDefaultItem[];

const VALIDATE_TYPE_ADDRESS = "address";

const Address = () => {
    const [validate, setValidate] = useValidate([VALIDATE_TYPE_ADDRESS]);

    const [getAddressAPI, getAddressAPIStatus] = useGetAddressAPIMutation();

    const [valueAddress, setValueAddress] = useState<string>("");
    const [suggestions, setSuggestions] = useState<TSuggestionItems>([]);

    const findAddress = async () => {
        const result = await getAddressAPI(valueAddress).unwrap();

        if (result) {
            setSuggestions(
                result.suggestions.map((item) => {
                    return {
                        value: item.value,
                        uid: uidV4(),
                    };
                }),
            );
        }
    };

    const onChangeAddress = useCallback((value: string) => {
        setValueAddress(value);

        setValidate<"length">({
            value,
            type: VALIDATE_TYPE_ADDRESS,
            validateType: "length",
            paramsValidate: {
                length: 3,
            },
        });
    }, []);

    return (
        <>
            <ProfilePage title="Поиск адресов">
                <FormItem label="Введите интересующий вас адрес">
                    <div className={styles.row}>
                        <div className={styles.rowContent}>
                            <Input
                                value={valueAddress}
                                onChange={onChangeAddress}
                                placeholder="Введите интересующий вас адрес"
                                bounce={300}
                                errorText={
                                    validate.list[VALIDATE_TYPE_ADDRESS] &&
                                    validate.list[VALIDATE_TYPE_ADDRESS].text
                                }
                            />
                        </div>
                        <Button
                            iconLeft="findWhite"
                            disabled={!validate.allValidated}
                            onClick={findAddress}
                        >
                            Кнопка
                        </Button>
                    </div>
                </FormItem>

                <RequestStatus statuses={getAddressAPIStatus}>
                    <OutListDefault
                        title="Адреса"
                        items={suggestions}
                    />
                </RequestStatus>
            </ProfilePage>
        </>
    );
};

export default React.memo(Address);
