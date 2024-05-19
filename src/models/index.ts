export type UserModel = {
    username?: string;
    email: string;
    name?: string;
}

export class User {
    username?: string = "";
    email: string = "";
    name?: string = "";

    constructor({ username = "", email, name = "" }: {
        username?: string;
        email: string;
        name?: string;
    }) {
        this.username = username;
        this.email = email;
        this.name = name;
    }

    getUser() {
        return {
            username: this.username,
            email: this.email,
            name: this.name,
        };
    }

    setUsername(username: string) {
        this.username = username;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setName(name: string) {
        this.name = name;
    }
}