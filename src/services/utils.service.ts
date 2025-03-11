import { Injectable } from '@angular/core'

@Injectable ({
    providedIn: 'root'
})

export class UtilsService {
    constructor() {}

    public formatDate(iso: string){
        const date = new Date(iso)
        const formatedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        return formatedDate.toLocaleDateString('sr-RS', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        })
    }



    public formatRuntime(minutes: number): string {
        const hours = Math.floor(minutes / 60)
        const remainingMinutes = minutes % 60
        return `${hours}h ${remainingMinutes}min`
    }
}