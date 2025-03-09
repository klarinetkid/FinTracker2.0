import { useCallback, useEffect, useMemo, useState } from "react";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
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
import useRefresh from "../hooks/useRefresh";

interface EntityManagementPageProps<T extends FieldValues, TblEntity> {
    title: string;
    entityName: string;

    newEntity?: () => T;
    newEntityIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

    renderTable: (entities: T[], editEntity: (e: T) => void) => React.ReactNode;
    renderForm: (form: UseFormReturn<T>) => React.ReactNode;

    getEntities: () => Promise<T[]>;

    addEntity?: (entity: FieldValues) => Promise<void | TblEntity>;
    putEntity: (entity: FieldValues) => Promise<void | TblEntity>;
    deleteEntity: (id: number) => Promise<void>;
    canBeDeleted: (entity: T) => boolean | string;
}

function EntityManagementPage<TEntity extends FieldValues, TblEntity>(
    props: EntityManagementPageProps<TEntity, TblEntity>
) {
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
    } = props;

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const { refreshed, refresh } = useRefresh();

    const [entities, setEntities] = useState<TEntity[]>();
    const [editingValues, setEditingValues] = useState<TEntity>();

    const form = useForm<TEntity>(); // useMemo(() => useForm<TEntity>(), []);

    useEffect(() => {
        form.reset(editingValues);
    }, [editingValues]);

    useEffect(() => {
        getEntities().then(setEntities);
    }, [refreshed]);

    const renderedTable = useMemo(() => {
        if (entities) return renderTable(entities, editEntityClick);
    }, [entities]);

    //const stableRenderForm = useCallback((form: UseFormReturn<TEntity>) => renderForm(form), []);
    //const renderedForm = useMemo(() => stableRenderForm(form), [form]);

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
                                        !(canBeDeleted(editingValues) === true)
                                    }
                                    onClick={deleteEntityClick}
                                >
                                    Delete
                                    {!(canBeDeleted(editingValues) === true) && (
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
    function editEntityClick(entity: TEntity) {
        setEditingValues({ ...entity });
        setIsDrawerOpen(true);
    }
    function submitEntity(model: FieldValues) {
        if (model === undefined) return;

        // clean this up
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
