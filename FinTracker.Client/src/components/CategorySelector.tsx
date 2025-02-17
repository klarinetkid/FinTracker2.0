import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutisde";
import useGlobalDataCache from "../hooks/useGlobalDataCache";
import "../styles/CategorySelector.css";
import CategoryPill from "./CategoryPill";
import Category, { Uncategorized } from "../types/Category";

interface CategorySelectorProps {
    onChange?: React.Dispatch<React.SetStateAction<Category | undefined>>;
    onClose?: () => void;
    value?: Category | undefined | null; // TODO: category needs to just be undefined, not null everywhere
    selectedId?: number;
    isOpen?: boolean;
    allowEmptySelection?: boolean;
}

function CategorySelector(props: CategorySelectorProps) {
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setIsOpen(false));

    const globalDataCache = useGlobalDataCache();

    const defaultValue = props.value ?? Uncategorized;

    const [selectedValue, setSelectedValue] = useState<Category>(
        props.value ?? defaultValue
    );

    const [isOpen, setIsOpen] = useState(props.isOpen ?? false);
    const options =
        props.allowEmptySelection === false
            ? globalDataCache.categories.value
            : [...globalDataCache.categories.value, Uncategorized];

    useEffect(() => {
        if (!isOpen && props.onClose) props.onClose();
    }, [isOpen, props]);

    return (
        <div
            ref={ref}
            className={`category-selector ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
        >
            {!selectedValue ? (
                <span className="category-selector-placeholder">
                    Select category
                </span>
            ) : (
                <CategoryPill category={selectedValue} />
            )}

            {/* clear selection button */}
            {/*{!selectedValue.id ? <div></div> :*/}
            {/*    <div className="clear-category-select" onClick={() => optionClick(Uncategorized)}>x</div>*/}
            {/*}*/}

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

    function optionClick(c: Category) {
        setSelectedValue(c);
        if (props.onChange) props.onChange(c);
        setIsOpen(false);
    }
}

export default CategorySelector;
