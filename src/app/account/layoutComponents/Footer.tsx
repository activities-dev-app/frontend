export default function Footer({ className }: { className?: string }) {
    return (
        <footer className={className}>
            <p className={className ? `${className}__text` : "text"}>
                &copy; Copyright 2024 - The activities manager app | All rights reserved.
            </p>
        </footer>
    );
}