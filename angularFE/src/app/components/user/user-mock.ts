import { User } from '../../models/user-model';

export const USERS: User[] = [
    {
        id: 1,
        username: 'Usuario123',
        fullName: 'Richard Munoz',
        email: 'richosojason@msn.com',
        password: '****',
        birthday: '26/03/1993',
        genre: 'Masculino',
        nationality: 'Ecuatoriano',
        bio: 'Biografía...',
        downloadedApps: [
            {
                id: 1,
                name: 'Aplicacion demo 1',
                logo: 'assets/images/logos/app1.webp',
                imgs: ['assets/images/carousel/app1/img1.webp', 'assets/images/carousel/app1/img2.webp', 'assets/images/carousel/app1/img3.webp'],
                category: 'Baja visión',
                description: 'Eye-D (Acronym for Eye Devices), conceptualized as standalone solution to improve quality of life' +
                    ' of visually impaired (VI) is a complete solution that assists VI’s in their daily life.' +
                    'Eye-D helps visually impaired be location aware, explore and navigate to nearby places of interest, ' +
                    'evaluate surroundings with their smartphone camera and read printed text. Eye-D will serve as the true ' +
                    'companion for most of your daily assistance needs.' +
                    'Trusted and supported by thousands of people across the globe Eye-D is determined to make visually ' +
                    'impaired truly independent in all aspect and help them contribute to the society by propelling inclusion.' +
                    'What’s under the hood and how it helps?',
                rating: 3,
                country: 'España',
                developedBy: 'Desarrollador',
                version: 1.1,
                releaseDate: 'dd/mm/aaaa',
                platform: 'Móvil',
                androidMin: 'Android 4.0 kitkat',
                appWebPage: 'www.web-aplicacion.com',
                commentaries: [{
                    user: 'Usuario123',
                    commentary: 'Comentario de prueba',
                    date: '8/30/2018',
                    rating: 2,
                },
                {
                    user: 'Usuario567',
                    commentary: 'Comentario de prueba',
                    date: '10/30/2018',
                    rating: 5,
                }],
                downloadedTimes:1,
            },
            {
                id: 2,
                name: 'Aplicacion demo 2',
                logo: 'assets/images/logos/app2.webp',
                imgs: ['assets/images/carousel/app2/img1.webp', 'assets/images/carousel/app2/img2.webp', 'assets/images/carousel/app2/img3.webp'],
                category: 'Ceguera',
                description: `TapTapSee está diseñada para ayudar a personas no videntes y personas con problemas visuales a identificar los objetos que encuentran en sus vidas diarias.
        
                Simplemente toque dos veces la pantalla para tomar una foto de cualquier objeto, en cualquier ángulo, y escuche la aplicación cuando lo identifique  (Nota: la identificación hablada requiere que Talkback esté activada).
                
                TapTapSee ayuda a las personas no videntes y las personas con problemas visuales para que sean más independientes en sus actividades diarias.`,
                rating: 3,
                country: 'España',
                developedBy: 'Desarrollador',
                version: 1.1,
                releaseDate: 'dd/mm/aaaa',
                platform: 'Móvil',
                androidMin: 'Android 4.0 kitkat',
                appWebPage: 'www.web-aplicacion.com',
                commentaries: [{
                    user: 'Usuario123',
                    commentary: this.lorem,
                    date: '8/30/2018',
                    rating: 2,
                },
                {
                    user: 'Usuario567',
                    commentary: this.lorem,
                    date: '10/30/2018',
                    rating: 5,
                }],
                downloadedTimes:1,
            }

        ],
        questionsMade: [
            {
                id: 1,
                question: 'Por qué la aplicación no funciona en android 5?',
                date: '10/30/2018',
                author: 'User123',
                responses: [
                    {
                        id: 1,
                        response: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab cumque facilis architecto tempora voluptas obcaecati enim explicabo accusamus, quae officiis inventore nostrum nemo corporis excepturi iusto natus eius aut! Porro?`,
                        date: '10/30/2018',
                        author: 'User456'
                    },
                    {
                        id: 2,
                        response: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab cumque facilis architecto tempora voluptas obcaecati enim explicabo accusamus, quae officiis inventore nostrum nemo corporis excepturi iusto natus eius aut! Porro?`,
                        date: '10/30/2018',
                        author: 'User789'
                    },
                    {
                        id: 3,
                        response: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab cumque facilis architecto tempora voluptas obcaecati enim explicabo accusamus, quae officiis inventore nostrum nemo corporis excepturi iusto natus eius aut! Porro?`,
                        date: '10/30/2018',
                        author: 'User789'
                    }
                ]
            }

        ],
        responsesMade: [
            {
                id: 1,
                response: 'Respuesta de user123',
                date: '09/05/2018',
                author: 'User123',
            }

        ],
        savedEvents: [
            {
                id: 1,
                name: 'Evento 1',
                date: '09/03/2018',
                organizedBy: 'Institución 1',
                organizerImg: 'assets/images/events/organizers/organizer1.PNG',
                description: 'Descripción demo evento 1',
                img: 'assets/images/events/event1.PNG',
            },
            {
                id: 2,
                name: 'Evento 2',
                date: '09/04/2018',
                organizedBy: 'Institución 2',
                organizerImg: 'assets/images/events/organizers/organizer1.PNG',
                description: 'Descripción demo evento 2',
                img: 'assets/images/events/event2.jpg',
            },

        ],
    }
];