import Icon from "@/icons";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">
                &copy; Copyright 2024 - The activities manager app | 
                All rights reserved. | 
                <a href="https://www.vecteezy.com/free-vector/background">Background Vectors by Vecteezy</a>
            </p>
            <div className="footer__social">
                <Link href={"https://github.com/activities-manager-app"}><Icon icon="github" /></Link>
                <Link href={"mailto:activities.dev.app@gmail.com"} target="_top"><Icon icon="email"></Icon></Link>
            </div>
        </footer>
    );
}