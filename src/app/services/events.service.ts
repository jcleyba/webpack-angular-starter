/**
 * Created by juanleyba on 3/3/17.
 */
import {Injectable} from "@angular/core";

declare var firebase: any;


@Injectable()
export class EventsService {
    constructor() {
    }

    generateNewKeyForEvent() {
        return firebase.database().ref("/events").push().key;
    }

    createEvent(key: any, event: any) {
        return firebase.database().ref("/events/" + key).set(event);
    }


    getEventsList() {
        var today = new Date().getTime();
        return firebase.database().ref("/events").orderByChild('date').startAt(today).once('value');
    }

    getSingleEvent(id: any) {
        return firebase.database().ref("/events/" + id).once('value');
    }

    deleteEvent(eventId: any) {
        return firebase.database().ref("/events/" + eventId).remove();
    }

    saveBooking(eventId: any, user: any, time: any) {
        return firebase.database().ref("/events/" + eventId + "/bookings").push().set({
            time: time,
            user: user
        });
    }

    deleteBooking(eventId: any, bookingId: any) {
        return firebase.database().ref("/events/" + eventId + "/bookings/" + bookingId).remove();
    }

    getUsers() {
        return firebase.database().ref("/users").once('value');
    }
}