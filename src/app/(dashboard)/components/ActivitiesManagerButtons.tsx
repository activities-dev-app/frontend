import { Loading, Button } from "@/components";
import { useForm, useTheme } from "@/context";
import { useDeleteActivity } from "../hooks";
import { useActivity } from "../hooks/useActivity";
import { useActivitySelection } from "../context";
import Icon from "@/icons";

export default function ActivitiesManagerButtons() {

    const { mode } = useTheme();
    const { activity } = useActivity();

    const { setShowActivityUpdateForm } = useForm();
    const { deleteCurrentActivity, deletingActivity } = useDeleteActivity();
    const { selectedActivity, setSelectedActivity } = useActivitySelection();

    return (
        <div className={`activities__list__item__buttons activities__list__item__buttons--${mode}`}>
            <Button
                buttonName="update"
                themeMode={mode}
                onClick={() => {
                    setSelectedActivity(activity);
                    setShowActivityUpdateForm(true);
                }}>
                <Icon icon="edit" className={`activities__list__item__icon`} />
            </Button>
            <Button
                buttonName="delete"
                themeMode={mode}
                onClick={() => {
                    setSelectedActivity(activity);
                    deleteCurrentActivity(activity.key);
                }}>
                {
                    (activity.key === selectedActivity?.key) && deletingActivity ?
                        <Loading /> :
                        <Icon icon="trash" className={`activities__list__item__icon`} />
                }
            </Button>
        </div>
    );
};