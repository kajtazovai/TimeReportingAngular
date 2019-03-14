export class Login {
    username: string;
    password: string;
    getUsername() {
        return this.username;
    }
    setUsername(username: string) {
        this.username = username;
    }
    getPassword() {
        return this.password;
    }
    setPassword (password: string){
        this.password=password;
    }

}
