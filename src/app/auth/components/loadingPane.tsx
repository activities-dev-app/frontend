import { Loading } from "@/components";

export const LoadingPane = ({ loading }: { loading: boolean }) => {
    if (loading) {
        return (
            <div className="loading-pane">
                <Loading />
            </div>
        );
    }
    return null;
};
