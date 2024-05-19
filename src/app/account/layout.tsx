export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div className="container">
            {children}
        </div>
    );
}
