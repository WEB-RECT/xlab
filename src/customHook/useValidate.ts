import { useCallback, useState } from "react";

type TValidateType = "length";

type TParamsValidateVariant = {
    length: {
        length: number;
    };
};

interface IValue<T extends keyof TParamsValidateVariant> {
    validateType: TValidateType;
    type: string;
    value: string;
    paramsValidate: TParamsValidateVariant[T];
}

type TResultInfoList = {
    [key: string]: {
        status: boolean;
        type: string;
        validateType: string;
        value: string;
        text: string;
    };
};

interface IResultInfo {
    allValidated: boolean;
    list: TResultInfoList;
}

type TReturn = [
    IResultInfo,
    <T extends keyof TParamsValidateVariant>(
        params: IValue<T>,
    ) => TResultInfoList,
    () => void,
];

function useValidate(requiredTypes?: string[]): TReturn {
    const [result, setResult] = useState<IResultInfo>({
        allValidated: false,
        list: {},
    });

    const setValue = useCallback(
        <T extends keyof TParamsValidateVariant>(params: IValue<T>) => {
            const currentResult: TResultInfoList = {};

            const handleValue = (status: boolean, text: string) => {
                currentResult[params.type] = {
                    status: status,
                    type: params.type,
                    validateType: params.validateType,
                    value: params.value,
                    text: text,
                };

                setResult((prev) => {
                    const checkAllActive: string[] = [];
                    const currentPrev = prev;
                    currentPrev.list[params.type] = {
                        status: status,
                        type: params.type,
                        validateType: params.validateType,
                        value: params.value,
                        text: text,
                    };

                    if (Object.keys(currentPrev.list).length > 0) {
                        Object.values(currentPrev.list).forEach((item) => {
                            if (item.status) {
                                checkAllActive.push(item.type);
                            }
                        });
                    }

                    if (requiredTypes) {
                        const checkList: boolean[] = [];

                        requiredTypes.forEach((type) => {
                            if (checkAllActive.find((it) => it === type)) {
                                checkList.push(true);
                            }
                        });

                        currentPrev.allValidated =
                            checkList.length === requiredTypes.length;
                    } else {
                        currentPrev.allValidated = false;
                    }

                    return {
                        ...currentPrev,
                    };
                });
            };

            if (params?.validateType === "length") {
                if (params.value.length >= params.paramsValidate.length) {
                    handleValue(true, "");
                } else {
                    handleValue(
                        false,
                        `Заполните поле, минимальная длина: ${params.paramsValidate.length} символа`,
                    );
                }
            }

            return currentResult;
        },
        [requiredTypes],
    );

    const clearValidateValue = () => {
        setResult({
            allValidated: false,
            list: {},
        });
    };

    return [result, setValue, clearValidateValue];
}

export default useValidate;
