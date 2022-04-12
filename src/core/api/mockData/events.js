import eventsData from  './eventsData.json';

export default {
    filterByKeyword: ( keyword ) => {
        return item => item.name.toLocaleLowerCase( ).startsWith( keyword.toLocaleLowerCase( ) );
    },
    filterByCategory: ( category ) => {
        return item => item.classificationId === category;
    },
    data: eventsData,
    infoDetailsData: {
        'accessibleSeatingDetail': 'To better accommodate your needs the box office has requested that special seating accommodations be solicited through their representatives.',
        'boxOfficeInfo': {
            'openHoursDetail': 'Downstairs box office: 10:00am-9:00pm daily Upstairs box office: Hours vary daily. Group sales hours: M-F 9:00am – 5:00pm',
            'willCallDetail': 'MUST HAVE PHOTO I.D. & CREDIT CARD USED TO PURCHASE TICKETS WHEN PICKING UP WILL CALL TICKETS'
        },
        'childRule': 'Ralphie May - 18+ only. X-Country - 18+ only. Tenors of Rock - Ages 5+. Recommended for ages 14+ Mac King: VIP section children must be 6+, children 2+ require ticket; Righteous Brothers: all ages welcome',
        'generalRule': 'This is a non-smoking showroom . No cameras of any kind or outside food/drink',
        'info': 'VIP tickets include the closest allowable seating by current safety protocols as well as the seating times closest to showtime. Less wait more tape! Plus, receive Tape Face swag bag which includes: Tape Face T-shirt, Signed Cartoon Tape Face Photo, Souvenir Poker Chip, Tape Face Lanyard. As an America\'s Got Talent alumni, Tape Face\'s show is an eccentric, whimsical experience that can be enjoyed by audiences of many different backgrounds, ages and languages. The America\'s Got Talent sensation does not speak at all in his show and his message of being true to self can be heard clearly through his amusing routines using sounds, music and laughter',
        'parkingDetail': 'Fees apply.',
        'pleaseNote': 'GROUPS Orders of 25 or more should be referred to the Group Sales department at EntertainmentGroupSales@Caesars.com The venue reserves the right to implement security procedures designed to protect the experience for all of our customers. All attendees must be able to attest to not having had any of the following related to COVID-19 in the last 14 days: Symptoms, tests, diagnoses, quarantine, or exposure to others who may have COVID-19. Attendees agree to follow all rules, including wearing of masks at all times unless eating and drinking, and receiving a temperature check at the venue entrance upon arrival. Please note seating begins at 25ft from the stage due to current Nevada state mandate for live entertainment.',
        'ticketLimit': 'There is an overall 25 ticket limit for this event.'
    },
    datesData: {
        items: [
            {
                startDate: '2021-09-08T18:00:00Z',
                endDate: '2021-09-09T04:00:00Z',
                city: {
                    countryCode: 'US',
                    name: 'New York',
                    stateCode: 'NY'
                }
            },
            {
                startDate: '2021-09-09T18:00:00Z',
                endDate: '2021-09-10T04:00:00Z',
                city: {
                    countryCode: 'US',
                    name: 'Los Angeles',
                    stateCode: 'CA'
                }
            },
            {
                startDate: '2021-09-11T18:00:00Z',
                endDate: '2021-09-12T04:00:00Z',
                city: {
                    countryCode: 'US',
                    name: 'Las Vegas',
                    stateCode: 'NV'
                }
            },
            {
                startDate: '2021-09-12T18:00:00Z',
                endDate: '2021-09-13T04:00:00Z',
                city: {
                    countryCode: 'FR',
                    name: 'Paris'
                }
            },
            {
                startDate: '2021-09-13T18:00:00Z',
                endDate: '2021-09-14T04:00:00Z',
                city: {
                    countryCode: 'NL',
                    name: 'Amsterdam'
                }
            },
            {
                startDate: '2021-09-14T18:00:00Z',
                endDate: '2021-09-15T04:00:00Z',
                city: {
                    countryCode: 'CA',
                    name: 'Toronto',
                    stateCode: 'ON'
                }
            }
        ]
    }
};
