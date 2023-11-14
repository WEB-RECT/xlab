import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
import Text from "../../Text/Text";
import styles from "./Input.module.scss";

export interface IInput extends Partial<HTMLInputElement> {
    value: string;
    onChange: (value: string) => void;
    errorText?: string | null;
    bounce?: number;
}

const Input: FC<IInput> = ({
    value,
    onChange,
    errorText,
    placeholder,
    bounce,
}) => {
    const [currentValue, setCurrentValue] = useState<string>(value || "");

    useEffect(() => {
        setCurrentValue((prev) => {
            if (prev !== value) {
                return value;
            } else {
                return prev;
            }
        });
    }, [value]);

    useEffect(() => {
        if (typeof bounce === "number") {
            let time = setTimeout(() => {
                if (currentValue !== value) {
                    onChange(currentValue);
                }
            }, bounce);

            return () => clearTimeout(time);
        } else {
            if (currentValue !== value) {
                onChange(currentValue);
            }
        }
    }, [currentValue, bounce]);

    return (
        <div className={styles.block}>
            <input
                type="text"
                value={currentValue}
                onInput={(e) => {
                    setCurrentValue((e.target as HTMLInputElement).value);
                }}
                placeholder={placeholder}
                className={classNames(styles.input, {
                    [styles.inputError]: errorText,
                })}
            />
            {errorText && (
                <div className={styles.blockErrorText}>
                    <Text size="errorText">{errorText}</Text>
                </div>
            )}
        </div>
    );
};

export default React.memo(Input);
