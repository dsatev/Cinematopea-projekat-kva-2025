import { Injectable } from "@angular/core";
import { User } from "../models/user.model";



@Injectable({
    providedIn: 'root'
})

export class UserService {
    private users: User[] = []
    private loggedInUser: User | null = null

    constructor(){
        const data = localStorage.getItem('users')
        if (data) this.users = JSON.parse(data)
        const currentUser = localStorage.getItem('currentUser')
        if(currentUser) this.loggedInUser = JSON.parse(currentUser)
    }

    private saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users))
    }

    register(user: User): boolean {
        if(this.users.find(u => u.username === user.username)) return false
        user.id = Date.now()
        this.users.push(user)
        this.saveUsers()
        return true
    }

    login(username: string, password: string): boolean {
        const found = this.users.find(u => u.username === username && u.password === password)
        if(found) {
            this.loggedInUser = found
            localStorage.setItem('currentUser', JSON.stringify(found))
            return true
        }
        return false
    }

    logout(){
        localStorage.removeItem('currentUser')
    }

    getCurrentUser(): User | null{
        const currentUser = localStorage.getItem('currentUser')
        if(!currentUser) return null
        const user = JSON.parse(currentUser)
        return user
    }


    isLoggedIn(): boolean {
        return localStorage.getItem('currentUser') !== null
    }

    updateProfile(updated: Partial<User>) {
        if(!this.loggedInUser) return
        const index = this.users.findIndex(u => u.id === this.loggedInUser!.id)
        console.log('Novi korisnik:', this.loggedInUser)
        console.log('Svi korisnici:', this.users)
    
        if(index === -1) return

        this.users[index] = {...this.users[index], ...updated}
        this.loggedInUser = this.users[index]
        this.saveUsers()

        localStorage.setItem('currentUser', JSON.stringify(this.loggedInUser))
    }

    getAllUsers(): User[] {
        return this.users
    }
}