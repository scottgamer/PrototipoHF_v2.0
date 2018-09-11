import { Event } from '../../models/event-model';

export const EVENTS: Event[] = [
    {
        id:1,
        name: 'Evento 1',
        date: '09/03/2018',
        organizedBy: 'Institución 1',
        organizerImg: 'assets/images/events/organizers/organizer1.PNG',
        description: 'Descripción demo evento 1',
        img: 'assets/images/events/event1.PNG',
    },
    {
        id:2,
        name: 'Evento 2',
        date: '09/04/2018',
        organizedBy: 'Institución 2',
        organizerImg: 'assets/images/events/organizers/organizer1.PNG',
        description: 'Descripción demo evento 2',
        img: 'assets/images/events/event2.jpg',
    },
    {
        id:3,
        name: 'Evento 3',
        date: '09/04/2018',
        organizedBy: 'Institución 3',
        organizerImg: 'assets/images/events/organizers/organizer1.PNG',
        description: 'Descripción demo evento 3',
        img: 'assets/images/events/event2.jpg',
    }
];