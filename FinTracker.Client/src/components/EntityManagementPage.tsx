import { useEffect, useState } from "react";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import useRefresh from "../hooks/useRefresh";
import { blurActiveElement } from "../utils/HtmlHelper";
import ToastManager from "../utils/ToastManager";
import Button from "./Button";
import ButtonFill from "./ButtonFill";
import ConfirmationPopup from "./ConfirmationPopup";
import Drawer from "./Drawer";
import IconButton from "./IconButton";
import Page from "./Page";
import Row from "./Row";
import Tooltip from "./Tooltip";

export interface EntityManagementFormProps<T extends FieldValues> {
    form: UseFormReturn<T>;
}

interface EntityManagementPageProps<
    TFormEntity extends FieldValues,
    TblEntity,
    TListEntity,
> {
    // titles
    title: string;
    entityName: string;
    drawerTitle?: (e: TFormEntity) => string;

    // create new entity
    newEntityDefaults?: TFormEntity;
    newEntityIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

    // render table, form in drawer
    renderTable: (
        entities: TListEntity[] | undefined,
        editEntity: (e: TFormEntity) => void
    ) => React.ReactNode;
    renderForm: (form: UseFormReturn<TFormEntity>) => React.ReactNode;

    // service calls
    getEntities?: () => Promise<TListEntity[]>;
    addEntity?: (entity: FieldValues) => Promise<void | TblEntity>;
    putEntity: (entity: FieldValues) => Promise<void | TblEntity>;
    deleteEntity: (id: number) => Promise<void>;

    // misc
    canBeDeleted?: (entity: TFormEntity) => boolean | string;
    transformBeforeSubmit?: (values: FieldValues) => TFormEntity;
    refresh?: () => void;
    additionalHeaderButtons?: React.ReactNode;
}

function EntityManagementPage<
    TFormEntity extends FieldValues,
    TblEntity,
    TListEntity,
>(props: EntityManagementPageProps<TFormEntity, TblEntity, TListEntity>) {
    const {
        title,
        entityName,
        newEntityDefaults,
        newEntityIcon,
        renderTable,
        renderForm,
        getEntities,
        addEntity,
        putEntity,
        deleteEntity,
        canBeDeleted,
        transformBeforeSubmit,
        refresh: externalRefresh,
        additionalHeaderButtons,
        drawerTitle,
    } = props;

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const { refreshed, refresh: internalRefresh } = useRefresh();

    const [entities, setEntities] = useState<TListEntity[]>();
    const [editingValues, setEditingValues] = useState<TFormEntity>();

    const form = useForm<TFormEntity>();

    useEffect(() => {
        form.reset(editingValues);
    }, [editingValues]);

    useEffect(() => {
        if (getEntities) getEntities().then(setEntities);
    }, [refreshed]);

    return (
        <Page>
            <Row justifyContent="space-between">
                <h1>{title}</h1>
                <div className="flex">
                    {additionalHeaderButtons}
                    {newEntityDefaults && newEntityIcon && (
                        <IconButton
                            title={`New ${entityName}`}
                            icon={newEntityIcon}
                            onClick={newEntityClick}
                        />
                    )}
                </div>
            </Row>

            {renderTable(entities, editEntityClick)}

            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                <form onSubmit={form.handleSubmit(submitEntity)}>
                    <div>
                        <h2>
                            {editingValues?.id ? "Edit" : "New"}{" "}
                            {drawerTitle && editingValues
                                ? drawerTitle(editingValues)
                                : entityName}
                        </h2>

                        {renderForm(form)}
                    </div>
                    <div>
                        <div>
                            <Button
                                type="button"
                                onClick={() => setIsDrawerOpen(false)}
                            >
                                Cancel
                            </Button>
                            <ButtonFill type="submit">Submit</ButtonFill>
                        </div>
                        <div>
                            {editingValues?.id && (
                                <Button
                                    type="button"
                                    disabled={
                                        canBeDeleted &&
                                        !(canBeDeleted(editingValues) === true)
                                    }
                                    onClick={deleteEntityClick}
                                >
                                    Delete
                                    {canBeDeleted &&
                                        !(
                                            canBeDeleted(editingValues) === true
                                        ) && (
                                            <Tooltip>
                                                {canBeDeleted(editingValues)}
                                            </Tooltip>
                                        )}
                                </Button>
                            )}
                        </div>
                    </div>
                </form>
            </Drawer>

            {isConfirmingDelete && (
                <ConfirmationPopup
                    onCancel={() => setIsConfirmingDelete(false)}
                    body={`Deleting a ${entityName.toLowerCase()} cannot be undone.`}
                    onConfirm={deleteEntityClick}
                />
            )}
        </Page>
    );
    function newEntityClick() {
        if (!newEntityDefaults) return;
        setEditingValues({ ...newEntityDefaults });
        setIsDrawerOpen(true);
    }
    function editEntityClick(entity: TFormEntity) {
        setEditingValues({ ...entity });
        setIsDrawerOpen(true);
    }
    function submitEntity(values: FieldValues) {
        if (values === undefined) return;

        const model = transformBeforeSubmit
            ? transformBeforeSubmit(values)
            : values;

        // compiler too dumb to know addEntity will have value
        //if (!model.id && !addEntity) return;

        (model.id
            ? putEntity(model)
            : addEntity
              ? addEntity(model)
              : new Promise((resolve) => resolve({}))
        ).then(() => {
            closeAfterSuccess();
            ToastManager.addToast({
                type: "success",
                title: "Success",
                body: "The category was successfully saved.",
            });
        });
    }

    async function deleteEntityClick() {
        if (!editingValues || !editingValues.id) return;
        await deleteEntity(editingValues.id);

        closeAfterSuccess();
        ToastManager.addToast({
            type: "success",
            title: "Success",
            body: "The category was successfully deleted.",
        });
    }

    function closeAfterSuccess() {
        blurActiveElement();
        internalRefresh();
        if (externalRefresh) externalRefresh();
        setIsConfirmingDelete(false);
        setIsDrawerOpen(false);
    }
}

export default EntityManagementPage;
