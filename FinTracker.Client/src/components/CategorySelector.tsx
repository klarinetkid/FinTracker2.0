import { useEffect, useRef, useState } from "react";
import CloseRing from "../assets/close_ring.svg?react";
import styles from "../styles/CategorySelector.module.css";
import controlStyle from "../styles/Control.module.css";
import Category, { Uncategorized } from "../types/Category";
import { classList } from "../utils/htmlHelper";
import CategoryPill from "./CategoryPill";

interface CategorySelectorProps {
    categories: Category[]; // don't want this component dependent on global data cache context, so just pass the options
    value?: Category | undefined;
    selectedId?: number;
    isOpen?: boolean;
    disabled?: boolean;
    tabIndex?: number;
    className?: string;
    allowEmpty?: boolean;
    onChange?: (category: Category | undefined) => void;
    onClose?: () => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

function CategorySelector(props: CategorySelectorProps) {
    const controlled = props.onChange ? true : false;
    const defaultValue =
        props.value ?? props.allowEmpty ? undefined : Uncategorized;

    const selectorRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(props.isOpen ?? false);
    const [search, setSearch] = useState("");
    const [selectedValue, setSelectedValue] = useState<Category | undefined>(
        props.value ?? defaultValue
    );

    // focus if open by props
    useEffect(() => {
        if (props.isOpen) selectorRef.current?.focus();
    }, [props.isOpen]);

    // onclose, trigger event and scroll menu back to top
    useEffect(() => {
        if (!isOpen) {
            if (props.onClose) props.onClose();
            if (menuRef.current) menuRef.current.scrollTop = 0;
        }
    }, [isOpen, props]);

    const options = [...props.categories, Uncategorized];
    const value = controlled ? props.value : selectedValue;

    return (
        <div
            ref={selectorRef}
            onClick={() => !props.disabled && setIsOpen(!isOpen)}
            tabIndex={props.tabIndex ?? 0}
            onKeyDown={onKeyDown}
            onBlur={(e) => {
                if (!menuRef.current?.contains(e.relatedTarget as Node)) {
                    setIsOpen(false);
                }
            }}
            className={classList(
                styles.selector,
                controlStyle.control,
                isOpen ? styles.open : "",
                props.disabled ? styles.disabled : "",
                props.className
            )}
        >
            {selectedValue ? (
                <CategoryPill category={value} />
            ) : (
                <div className={styles.placeholder}>Select a category</div>
            )}

            {props.allowEmpty && selectedValue ? (
                <CloseRing
                    className={styles.clearBtn}
                    onClick={clearSelection}
                />
            ) : (
                ""
            )}

            <div ref={menuRef} className={styles.menu} tabIndex={-1}>
                {options.map((c) => (
                    <div
                        key={c.id ?? -1}
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

        if (event.key.length === 1)
            trySetValueFromSearch(search + event.key) || // try adding to current search
                trySetValueFromSearch(event.key) || // try new search with this key
                setSearch(""); // if still none reset search

        if (props.onKeyDown) props.onKeyDown(event);
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

    function updateSelectedValue(category: Category | undefined) {
        if (props.onChange) props.onChange(category);
        setSelectedValue(category);
    }

    function clearSelection(event: React.MouseEvent<SVGElement>) {
        event.stopPropagation();
        updateSelectedValue(undefined);
        setIsOpen(false);
        if (selectorRef.current) selectorRef.current.blur();
    }
}

export default CategorySelector;
