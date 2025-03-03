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
    categories: Category[];
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

    // refs
    const selectorRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const hoveredOptionRef = useRef<HTMLDivElement>(null);

    // states
    const [isMenuOpen, setIsMenuOpen] = useState(isOpen ?? false);
    const [search, setSearch] = useState("");
    const [hoveredIndex, setHoveredIndex] = useState<number>();
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
            setHoveredIndex(undefined);
            if (onClose) onClose();
            if (menuRef.current) menuRef.current.scrollTop = 0;
        }
    }, [isMenuOpen, props]);

    // when moving thu options with arrow keys, ensure option is visible
    useEffect(() => {
        if (hoveredOptionRef.current)
            hoveredOptionRef.current.scrollIntoView({ block: "nearest" });
    }, [hoveredIndex]);

    const options: CategoryOrUncategorized[] = [...categories, Uncategorized];
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
                <CategoryPill category={currentValue} />
            ) : (
                <div className={styles.placeholder}>Select a category</div>
            )}

            {/* show close btn if allow empty and no value */}
            {allowEmpty && currentValue && (
                <CloseRingIcon
                    className={styles.clearBtn}
                    onClick={clearSelection}
                />
            )}

            {/* menu with options */}
            <div ref={menuRef} className={styles.menu} tabIndex={-1}>
                {options.map((c, i) => (
                    <div
                        key={c.id ?? -1}
                        className={classList(
                            styles.option,
                            hoveredIndex === i ? styles.hovered : ""
                        )}
                        onClick={() => optionClick(c)}
                        ref={hoveredIndex === i ? hoveredOptionRef : undefined}
                    >
                        <CategoryPill category={c} />
                    </div>
                ))}
            </div>
        </div>
    );

    function optionClick(category: CategoryOrUncategorized) {
        triggerChange(category);
        setIsMenuOpen(false);
    }

    function _onClick() {
        if (!disabled) {
            setHoveredIndex(undefined);
            setIsMenuOpen(!isMenuOpen);
        }
    }

    function _onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Enter" && !disabled) {
            if (hoveredIndex !== undefined) {
                triggerChange(categories[hoveredIndex]);
            }
            setIsMenuOpen(!isMenuOpen);
            return;
        }

        if (event.key === "Escape") {
            setIsMenuOpen(false);
            event.currentTarget.blur();
            return;
        }

        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();

            const inc = event.key === "ArrowDown" ? 1 : -1;
            if (isMenuOpen) {
                const idxIfNoValue = inc === 1 ? -1 : options.length;
                const target = (hoveredIndex ?? idxIfNoValue) + inc;
                if (options[target]) {
                    setHoveredIndex(target);
                }
            } else {
                const idxIfNoValue = inc === 1 ? -1 : options.length;
                const currentIdx = currentValue
                    ? options.findIndex((c) => c.id === currentValue.id)
                    : undefined;
                const target =
                    (currentIdx !== undefined && currentIdx > -1
                        ? currentIdx
                        : idxIfNoValue) + inc;
                if (options[target]) {
                    triggerChange(options[target]);
                }
            }
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
            triggerChange(found[0]);
            setSearch(str);
            return true;
        }

        return false;
    }

    function triggerChange(category: CategoryOrUncategorized | undefined) {
        setSelectedValue(category);
        if (onChange) onChange(category);
    }

    function clearSelection(event: React.MouseEvent<SVGElement>) {
        event.stopPropagation();
        triggerChange(undefined);
        setIsMenuOpen(false);
        if (selectorRef.current) selectorRef.current.blur();
    }
}

export default CategorySelector;
