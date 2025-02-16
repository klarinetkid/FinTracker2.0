import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutisde";
import useGlobalDataCache from "../hooks/useGlobalDataCache";
import "../styles/CategorySelector.css";
import Category, { Uncategorized } from "../types/Category";
import CategoryPill from "./CategoryPill";

interface CategorySelectorProps {
    onChange?: React.Dispatch<React.SetStateAction<Category | undefined>>;
    onClose?: () => void;
    value?: Category | undefined | null; // TODO: category needs to just be undefined, not null everywhere
    isOpen?: boolean;
}

function CategorySelector(props: CategorySelectorProps) {
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setIsOpen(false));

    const [selectedValue, setSelectedValue] = useState<Category>(
        props.value ?? Uncategorized
    );

    const [isOpen, setIsOpen] = useState(props.isOpen ?? false);
    const globalDataCache = useGlobalDataCache();
    const options = [...globalDataCache.categories.value, Uncategorized];

    useEffect(() => {
        if (!isOpen && props.onClose) props.onClose();
    }, [isOpen, props]);

    return (
        <div
            ref={ref}
            className="category-selector"
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

            <div className={`category-selector-menu ${isOpen ? "open" : ""}`}>
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
