import { useEffect, useRef, useState } from "react";
import styles from "../styles/CategorySelector.module.css";
import Category, { Uncategorized } from "../types/Category";
import { classList } from "../utils/htmlHelper";
import CategoryPill from "./CategoryPill";

interface CategorySelectorProps {
    categories: Category[]; // don't want this component dependent on global data cache context, so just pass the options
    onChange?: (category: Category) => void;
    onClose?: () => void;
    value?: Category | undefined | null; // TODO: category needs to just be undefined, not null everywhere. null is uncategorized, which is a category
    selectedId?: number;
    isOpen?: boolean;
    disabled?: boolean;
}

function CategorySelector(props: CategorySelectorProps) {
    const controlled = props.onChange ? true : false;
    const defaultValue = props.value ?? Uncategorized;

    const ref = useRef<HTMLDivElement>(null);
    //useClickOutside(ref, () => setIsOpen(false));

    const [isOpen, setIsOpen] = useState(props.isOpen ?? false);
    const [search, setSearch] = useState("");
    const [selectedValue, setSelectedValue] = useState<Category>(
        props.value ?? defaultValue
    );

    useEffect(() => {
        if (props.isOpen) ref.current?.focus();
    }, [props.isOpen]);

    useEffect(() => {
        if (!isOpen && props.onClose) props.onClose();
    }, [isOpen, props]);

    useEffect(() => {
        if (search.length === 0) return;
    }, [search]);

    const options = [...props.categories, Uncategorized];

    const value = controlled ? props.value : selectedValue;

    return (
        <div
            ref={ref}
            className={classList(
                styles.selector,
                isOpen ? styles.open : "",
                props.disabled ? styles.disabled : ""
            )}
            onClick={() => !props.disabled && setIsOpen(!isOpen)}
            tabIndex={10}
            onKeyDown={onKeyDown}
            onBlur={() => {
                setIsOpen(false);
            }}
        >
            <CategoryPill category={value} />

            <div key={isOpen.toString()} className={styles.menu}>
                {options.map((c, i) => (
                    <div
                        key={i}
                        className={styles.option}
                        onClick={() => optionClick(c)}
                    >
                        <CategoryPill category={c} />
                    </div>
                ))}
            </div>
        </div>
    );

    function optionClick(category: Category) {
        updateSelectedValue(category);
        setIsOpen(false);
    }

    function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Enter" && !props.disabled) {
            setIsOpen(!isOpen);
            return;
        }

        if (event.key === "Escape") {
            setIsOpen(false);
            event.currentTarget.blur();
            return;
        }

        if (event.key.length !== 1) return;

        trySetValueFromSearch(search + event.key) ||
            trySetValueFromSearch(event.key) ||
            setSearch("");
    }

    function trySetValueFromSearch(str: string): boolean {
        const testSeach = str.toLowerCase();
        const found = props.categories.filter((c) =>
            c.categoryName.toLowerCase().startsWith(testSeach)
        );
        if (found.length > 0) {
            updateSelectedValue(found[0]);
            setSearch(str);
            return true;
        }

        return false;
    }

    function updateSelectedValue(category: Category) {
        if (props.onChange) props.onChange(category);
        setSelectedValue(category);
    }
}

export default CategorySelector;
