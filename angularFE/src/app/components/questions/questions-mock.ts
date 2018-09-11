import { Question } from '../../models/questions-model';

export const QUESTIONS: Question[] = [
    {
        id: 1,
        question: this.lorem,
        date: '10/30/2018',
        author: 'User123',
        responses: [
            {
                id: 1,
                response: this.lorem,
                date: '10/30/2018',
                author: 'User456'
            },
            {
                id: 2,
                response: this.lorem,
                date: '10/30/2018',
                author: 'User789'
            },
            {
                id: 3,
                response: this.lorem,
                date: '10/30/2018',
                author: 'User789'
            }
        ]
    },
    {
        id: 2,
        question: this.lorem,
        date: '10/30/2018',
        author: 'User2',
        responses: [
            {
                id: 1,
                response: this.lorem,
                date: '10/30/2018',
                author: 'User4'
            },
            {
                id: 2,
                response: this.lorem,
                date: '10/30/2018',
                author: 'User789'
            },
            {
                id: 3,
                response: this.lorem,
                date: '10/30/2018',
                author: 'User789'
            }
        ]
    }

];