import { useEffect, useState } from "react";
import AddIcon from '../assets/Add_round_fill_light.svg?react';
import CategoryPill from "../components/CategoryPill";
import CategoryTable from "../components/CategoryTable";
import Drawer from "../components/Drawer";
import Spacer from "../components/Spacer";
import CategoryService from "../services/CategoryService";
import { Total } from "../types/Category";
import CategoryTransactionCount from "../types/CategoryTransactionCount";


function CategoriesPage() {

    const [categories, setCategories] = useState<CategoryTransactionCount[]>([])

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const [formValues, setFormValues] = useState({
        id: 0,
        categoryName: "",
        colour: "",
        transactionCount: 0
    })

    const [isRefreshed, setIsRefreshed] = useState(false)

    useEffect(() => {
        CategoryService.getCategoryTransactionCounts().then(setCategories)
    }, [isRefreshed])

    // TODO: submit on form submit, think it needs input type submit for that

    return (
        <div className="page" style={{width:600}}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}>
                <div></div>
                <h1>Categories</h1>
                <div>
                    <AddIcon width={36} height={36} onClick={newCategory} />
                </div>
            </div>

            <CategoryTable categories={categories} editCategory={editCategory} />

            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                <>
                    <div className="drawer-content-body">
                        <h2>{formValues.id === 0 ? "New" : "Edit"} Category</h2>
                        <CategoryPill category={{ id: 1, categoryName: formValues.categoryName || "New Category", colour: formValues.colour || Total.colour }} />
                        <Spacer height={24} />
                        <form className="form">
                            <input name="id" type="hidden" value={formValues.id} />
                            <div>
                                <h4>Category Name</h4>
                                <input name="categoryName" value={formValues.categoryName} onChange={updateFormValues} />
                            </div>
                            <div>
                                <h4>Colour</h4>
                                <input name="colour" value={formValues.colour} onChange={updateFormValues} />
                            </div>
                        </form>
                    </div>
                    <div className="drawer-content-foot" style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            {formValues.id === 0 ? "" : 
                                <button className="button"
                                    disabled={formValues.transactionCount > 0}
                                    onClick={deleteCategory}
                                    title={formValues.transactionCount === 0 ? "" : "Cannot be deleted as category has linked transactions." }
                                >
                                    Delete
                                </button>
                            }
                        </div>
                        
                        <div>
                            <button className="button" onClick={() => setIsDrawerOpen(false)}>Cancel</button>
                            <button className="button-fill" onClick={submitCategory}>Submit</button>
                        </div>
                    </div>
                </>
            </Drawer>
        </div>
    )

    async function deleteCategory() {
        await CategoryService.deleteCategory(formValues.id)
        setIsRefreshed(!isRefreshed)
        setIsDrawerOpen(false)
    }

    async function submitCategory(e) {

        if (formValues.id === 0) {
            await CategoryService.createCategory(formValues)
        } else {
            // patch
        }

        setIsRefreshed(!isRefreshed)
        setIsDrawerOpen(false)
        e.preventDefault()
    }

    function editCategory(category: CategoryTransactionCount) {
        setFormValues(category)
        setIsDrawerOpen(true)
    }

    function newCategory() {
        setFormValues({id: 0, categoryName: "", colour: "", transactionCount: -1})
        setIsDrawerOpen(true)
    }

    function updateFormValues(e) {
        const { name, value } = e.target;
        setFormValues({ 
            ...formValues,
            [name]: value
        })
    }
}

export default CategoriesPage;