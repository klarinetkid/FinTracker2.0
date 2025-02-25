import { useEffect, useRef, useState } from "react";
import styles from "../styles/CategorySelector.module.css";
import controlStyle from "../styles/Control.module.css";
import Category, {
    CategoryOrUncategorized,
    Uncategorized,
} from "../types/Category";
import { classList } from "../utils/HtmlHelper";
import { CloseRingIcon } from "../utils/Icons";
import CategoryPill from "./CategoryPill";

interface CategorySelectorProps {
    categories: Category[]; // don't want this component dependent on global data cache context, so just pass the options
    value?: CategoryOrUncategorized | undefined;
    isOpen?: boolean;
    disabled?: boolean;
    tabIndex?: number;
    className?: string;
    allowEmpty?: boolean;
    onChange?: (category: CategoryOrUncategorized | undefined) => void;
    onClose?: () => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

function CategorySelector(props: CategorySelectorProps) {
    const {
        categories,
        value,
        isOpen,
        disabled,
        tabIndex,
        className,
        allowEmpty,
        onChange,
        onClose,
        onKeyDown,
    } = props;

    const controlled = onChange ? true : false;
    const defaultValue = value ?? allowEmpty ? undefined : Uncategorized;

    const selectorRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const [isMenuOpen, setIsMenuOpen] = useState(isOpen ?? false);
    const [search, setSearch] = useState("");
    const [selectedValue, setSelectedValue] = useState<
        CategoryOrUncategorized | undefined
    >(value ?? defaultValue);

    // focus if open by props
    useEffect(() => {
        if (isOpen) selectorRef.current?.focus();
    }, [isOpen]);

    // onclose, trigger event and scroll menu back to top
    useEffect(() => {
        if (!isMenuOpen) {
            if (onClose) onClose();
            if (menuRef.current) menuRef.current.scrollTop = 0;
        }
    }, [isMenuOpen, props]);

    const options = [...categories, Uncategorized];
    const currentValue = controlled ? value : selectedValue;

    return (
        <div
            ref={selectorRef}
            onClick={_onClick}
            onKeyDown={_onKeyDown}
            onBlur={_onBlur}
            tabIndex={tabIndex ?? 0}
            className={classList(
                styles.selector,
                controlStyle.control,
                isMenuOpen ? styles.open : "",
                disabled ? styles.disabled : "",
                className
            )}
        >
            {/* show current value, or placeholder if allow empty */}
            {currentValue || !allowEmpty ? (
                <CategoryPill category={value} />
            ) : (
                <div className={styles.placeholder}>Select a category</div>
            )}

            {/* show close btn if allow empty and no value */}
            {allowEmpty && currentValue ? (
                <CloseRingIcon
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

    function optionClick(category: CategoryOrUncategorized) {
        updateSelectedValue(category);
        setIsMenuOpen(false);
    }

    function _onClick() {
        if (!disabled) setIsMenuOpen(!isMenuOpen);
    }

    function _onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Enter" && !disabled) {
            setIsMenuOpen(!isMenuOpen);
            return;
        }

        if (event.key === "Escape") {
            setIsMenuOpen(false);
            event.currentTarget.blur();
            return;
        }

        if (event.key.length === 1)
            trySetValueFromSearch(search + event.key) || // try adding to current search
                trySetValueFromSearch(event.key) || // try new search with this key
                setSearch(""); // if still none reset search

        if (onKeyDown) onKeyDown(event);
    }

    function _onBlur(event: React.FocusEvent<HTMLDivElement, Element>) {
        if (!menuRef.current?.contains(event.relatedTarget as Node)) {
            setIsMenuOpen(false);
        }
    }

    function trySetValueFromSearch(str: string): boolean {
        const testSeach = str.toLowerCase();
        const found = categories.filter((c) =>
            c.categoryName.toLowerCase().startsWith(testSeach)
        );
        if (found.length > 0) {
            updateSelectedValue(found[0]);
            setSearch(str);
            return true;
        }

        return false;
    }

    function updateSelectedValue(
        category: CategoryOrUncategorized | undefined
    ) {
        if (onChange) onChange(category);
        setSelectedValue(category);
    }

    function clearSelection(event: React.MouseEvent<SVGElement>) {
        event.stopPropagation();
        updateSelectedValue(undefined);
        setIsMenuOpen(false);
        if (selectorRef.current) selectorRef.current.blur();
    }
}

export default CategorySelector;
