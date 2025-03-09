import { useEffect, useMemo, useState } from "react";
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
import StatusIndicator from "./StatusIndicator";
import Tooltip from "./Tooltip";

interface EntityManagementPageProps<
    TFormEntity extends FieldValues,
    TblEntity,
    TListEntity,
> {
    title: string;
    entityName: string;

    newEntity?: () => TFormEntity;
    newEntityIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

    renderTable: (
        entities: TListEntity[],
        editEntity: (e: TFormEntity) => void
    ) => React.ReactNode;
    renderForm: (form: UseFormReturn<TFormEntity>) => React.ReactNode;

    getEntities: () => Promise<TListEntity[]>;

    addEntity?: (entity: FieldValues) => Promise<void | TblEntity>;
    putEntity: (entity: FieldValues) => Promise<void | TblEntity>;
    deleteEntity: (id: number) => Promise<void>;
    canBeDeleted?: (entity: TFormEntity) => boolean | string;
    transformBeforeSubmit?: (values: FieldValues) => TFormEntity;
}

function EntityManagementPage<
    TFormEntity extends FieldValues,
    TblEntity,
    TListEntity,
>(props: EntityManagementPageProps<TFormEntity, TblEntity, TListEntity>) {
    const {
        title,
        entityName,
        newEntity,
        newEntityIcon,
        renderTable,
        renderForm,
        getEntities,
        addEntity,
        putEntity,
        deleteEntity,
        canBeDeleted,
        transformBeforeSubmit,
    } = props;

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const { refreshed, refresh } = useRefresh();

    const [entities, setEntities] = useState<TListEntity[]>();
    const [editingValues, setEditingValues] = useState<TFormEntity>();

    const form = useForm<TFormEntity>(); // useMemo(() => useForm<TEntity>(), []);

    useEffect(() => {
        form.reset(editingValues);
    }, [editingValues]);

    useEffect(() => {
        getEntities().then(setEntities);
    }, [refreshed]);

    const renderedTable = useMemo(() => {
        if (entities) return renderTable(entities, editEntityClick);
    }, [entities]);

    return (
        <Page>
            <Row justifyContent="space-between">
                <h1>{title}</h1>
                {newEntity && newEntityIcon && (
                    <IconButton
                        title={`New ${entityName}`}
                        icon={newEntityIcon}
                        onClick={newEntityClick}
                    />
                )}
            </Row>

            {entities ? renderedTable : <StatusIndicator status="loading" />}

            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                <form onSubmit={form.handleSubmit(submitEntity)}>
                    <div>
                        <h2>{editingValues?.id ? "Edit" : "New"} Category</h2>

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
                    body={`Deleting a ${entityName} cannot be undone.`}
                    onConfirm={deleteEntityClick}
                />
            )}
        </Page>
    );
    function newEntityClick() {
        if (!newEntity) return;
        setEditingValues({ ...newEntity() });
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
            blurActiveElement();
            refresh();
            setIsDrawerOpen(false);
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

        blurActiveElement();
        refresh();
        setIsConfirmingDelete(false);
        setIsDrawerOpen(false);
        ToastManager.addToast({
            type: "success",
            title: "Success",
            body: "The category was successfully deleted.",
        });
    }
}

export default EntityManagementPage;
