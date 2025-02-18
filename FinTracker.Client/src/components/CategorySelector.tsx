import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutisde";
import useGlobalDataCache from "../hooks/useGlobalDataCache";
import "../styles/CategorySelector.css";
import Category, { Uncategorized } from "../types/Category";
import CategoryPill from "./CategoryPill";

interface CategorySelectorProps {
    //onChange?: React.Dispatch<React.SetStateAction<Category | undefined>>;
    onChange?: (category: Category) => void;
    onClose?: () => void;
    value?: Category | undefined | null; // TODO: category needs to just be undefined, not null everywhere
    selectedId?: number;
    isOpen?: boolean;
    disabled?: boolean;
}

function CategorySelector(props: CategorySelectorProps) {
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setIsOpen(false));

    const defaultValue = props.value ?? Uncategorized;

    const globalDataCache = useGlobalDataCache();
    const [isOpen, setIsOpen] = useState(props.isOpen ?? false);
    const [search, setSearch] = useState("");
    const [selectedValue, setSelectedValue] = useState<Category>(
        props.value ?? defaultValue
    );

    useEffect(() => {
        if (!isOpen && props.onClose) props.onClose();
    }, [isOpen, props]);

    const options = [...globalDataCache.categories.value, Uncategorized];

    return (
        <div
            ref={ref}
            className={`category-selector ${isOpen ? "open" : ""} ${props.disabled ? "disabled" : ""}`}
            onClick={() => !props.disabled && setIsOpen(!isOpen)}
            tabIndex={10}
            onKeyDown={onKeyDown}
            onBlur={() => {
                setIsOpen(false);
            }}
        >
            {!selectedValue ? (
                <span className="category-selector-placeholder">
                    Select category
                </span>
            ) : (
                <CategoryPill category={selectedValue} />
            )}

            <div className="category-selector-menu">
                {options.map((c, i) => (
                    <div
                        key={i}
                        className="category-option"
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
        if (event.key === "Enter") setIsOpen(!isOpen);
        else {
            // TODO: filter other keys
            const newSearch = search + event.key;

            const found = globalDataCache.categories.value.filter((c) =>
                c.categoryName.toLowerCase().startsWith(newSearch.toLowerCase())
            )[0];
            if (found) {
                updateSelectedValue(found);
                setSearch(newSearch);
            } else {
                setSearch("");
            }
        }
    }

    function updateSelectedValue(category: Category) {
        if (props.onChange) props.onChange(category);
        setSelectedValue(category);
    }
}

export default CategorySelector;
