export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div className="authentication__status">
            {children}
        </div>
    );
}