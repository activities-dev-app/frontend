export default function Template({ children }: { children: React.ReactNode }) {

    return (
        <div className="callback__confirm">
            { children }
        </div>
    );
}