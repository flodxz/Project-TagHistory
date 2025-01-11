const events = [
    // Add end date to Christmas event
    {
        id: "hypixel-christmas-event-2014",
        start: "2014-12-20",
        end: "2015-01-05",  // Added end date
        category: "hypixel",
        title: "Hypixel Christmas Event",
        description: "Celebrate the holidays with limited-time maps, challenges, and exclusive rewards!",
        tags: ["holiday", "hypixel", "event"]
    },
    // Add a new long-duration event
    {
        id: "golden-age-tnt",
        start: "2015-06-01",
        end: "2016-08-30",
        category: "hypixel",
        title: "The Golden Age of TNT Tag",
        description: "A period marked by peak player activity, numerous tournaments, and rapid community growth.",
        tags: ["milestone", "community", "history"]
    },
    {
        id: "golden-age-tnt-2",
        start: "2015-07-01",
        end: "2016-09-30",
        category: "hypixel",
        title: "The Golden Age of TNT Tag 2",
        description: "A period marked by peak player activity, numerous tournaments, and rapid community growth.",
        tags: ["milestone", "community", "history"]
    },
    // Add end date to Halloween event
    {
        id: "hypixel-halloween-event-2017",
        start: "2017-10-15",
        end: "2017-11-05",
        category: "hypixel",
        title: "Hypixel Halloween Event",
        description: "Spooky maps, Halloween-themed challenges, and rewards await you this October!",
        tags: ["halloween", "hypixel", "event"]
    },
    // Add end date to Guild Wars
    {
        id: "guild-war-summer-2017",
        start: "2017-08-05",
        end: "2017-09-15",
        category: "guilds",
        title: "Summer Guild Wars",
        description: "A special summer event where guilds battle it out in TNT Tag.",
        tags: ["guilds", "summer", "event"]
    },
    {
        id: "tnt-tag-release",
        start: "2013-10-20",
        special: true,
        category: "hypixel",
        title: "Hypixel TNT Tag Release",
        description: `The TNT Tag community began on October 20, 2013.`,
        tags: ["release", "launch", "beginning", "hypixel", "tnt"]
    },
    {
        id: "tnt-championships-2025",
        start: "2025-01-09",
        category: "feuds",
        title: "Special Event: TNT Tag Championships - CAPTAINS EDITION",
        description: `
            <b>Event Details</b>
            Hosted by matasx in collaboration with Skyscraper and xbadman

            <b>Concept</b>
            In this tournament, the top 8 most skilled players to sign up will be pre selected as team captains. Each captain will draft a team of 5, from a total pool of 32 players.

            <b>Pre Selection Group Stage:</b>
            Players will be divided into about 8 groups (balanced). Each player will face the others once, in a first-to-5 format. Players with the lowest score in each group will be eliminated.

            <b>Captains Selection Process:</b>
            Captains will select their teams in a public voice channel of the people that qualified, with the picking order randomized live.

            <b>Bracket Stage:</b>
            The teams will enter a double-elimination bracket.

            <b>Prizes</b>
            A huge thanks to our generous sponsors!

            🥇 1st Place: $250 ($50 per player) + Custom Role
        `,
        tags: ["tournament", "championship", "special event", "captains", "competition"]
    },
    {
        id: "tnt-all-stars-2015",
        start: "2015-06-15",
        category: "special",
        title: "TNT Tag All-Stars Event",
        description: `
            <b>Overview</b>
            The first-ever TNT Tag All-Stars Event brought together top players from across the Hypixel community.

            <b>Details:</b>
            Players competed in solo rounds for glory and recognition, with highlights broadcasted live.
        `,
        tags: ["all-stars", "tournament", "event", "competition"]
    },
    {
        id: "tnt-community-reunion",
        start: "2019-12-25",
        category: "community",
        title: "TNT Tag Community Christmas Reunion",
        description: `
            <b>Event Details:</b>
            A casual get-together for TNT Tag players to celebrate the holiday season with fun games and giveaways. Exclusive holiday-themed maps were released for this event.
        `,
        tags: ["community", "reunion", "holiday", "casual", "event"]
    },
    {
        id: "tnt-anniversary-2020",
        start: "2020-10-20",
        special: true,
        category: "hypixel",
        title: "7th Anniversary of TNT Tag",
        description: `
            <b>Highlights:</b>
            - Celebrating 7 years of TNT Tag with a week-long event featuring special challenges and rewards.
            - Free cosmetics and boosters for all participants.
        `,
        tags: ["anniversary", "celebration", "event", "hypixel"]
    },
    {
        id: "tnt-summer-challenge-2024",
        start: "2024-07-15",
        category: "challenges",
        title: "TNT Tag Summer Challenge",
        description: `
            <b>Details:</b>
            A fun, summer-themed challenge where players could complete objectives to earn limited-edition cosmetics and leaderboard recognition.
        `,
        tags: ["summer", "challenge", "event", "rewards"]
    },
    {
        id: "hypixel-christmas-event-2014",
        start: "2014-12-20",
        category: "hypixel",
        title: "Hypixel Christmas Event",
        description: "Celebrate the holidays with limited-time maps, challenges, and exclusive rewards!",
        tags: ["holiday", "hypixel", "event"]
    },
    {
        id: "tnt-tag-anniversary-2016",
        start: "2016-10-20",
        category: "hypixel",
        title: "3rd Anniversary of TNT Tag",
        description: "A week-long event celebrating 3 years of TNT Tag with rewards and exclusive features.",
        tags: ["anniversary", "celebration", "hypixel"]
    },
    {
        id: "hypixel-halloween-event-2017",
        start: "2017-10-15",
        category: "hypixel",
        title: "Hypixel Halloween Event",
        description: "Spooky maps, Halloween-themed challenges, and rewards await you this October!",
        tags: ["halloween", "hypixel", "event"]
    },
    {
        id: "hypixel-10th-anniversary",
        start: "2023-04-13",
        category: "hypixel",
        title: "Hypixel's 10th Anniversary Celebration",
        description: "Celebrate a decade of Hypixel with exclusive events, games, and surprises.",
        tags: ["anniversary", "celebration", "hypixel"]
    },
    {
        id: "tnt-tag-community-day-2024",
        start: "2024-05-01",
        category: "hypixel",
        title: "TNT Tag Community Day",
        description: "A day dedicated to the TNT Tag community with fun events and casual tournaments.",
        tags: ["community", "tournament", "hypixel"]
    },

    // Feuds Events
    {
        id: "tnt-tag-feud-2015",
        start: "2015-08-10",
        category: "feuds",
        title: "The Great TNT Tag Feud",
        description: "A heated battle between rival guilds, ending in an epic showdown.",
        tags: ["feud", "competition", "rivalry"]
    },
    {
        id: "tnt-tag-guild-wars-2015",
        start: "2015-08-10",
        category: "feuds",
        title: "TNT Tag Guild Wars",
        description: "Top guilds face off in this competitive guild-versus-guild TNT Tag event.",
        tags: ["guilds", "competition", "feud"]
    },
    {
        id: "tnt-tag-championships-2022",
        start: "2022-11-15",
        category: "feuds",
        title: "TNT Tag Championships",
        description: "Top players from the community compete in a double-elimination tournament for glory.",
        tags: ["tournament", "competition", "feuds"]
    },
    {
        id: "tnt-tag-battle-royale",
        start: "2024-03-18",
        category: "feuds",
        title: "TNT Tag Battle Royale",
        description: "A free-for-all event where only one can emerge victorious.",
        tags: ["battle royale", "competition", "feuds"]
    },
    {
        id: "tnt-tag-captains-showdown",
        start: "2024-03-18",
        category: "feuds",
        title: "TNT Tag Captains' Showdown",
        description: "Captains draft their teams and battle for dominance in a strategic tournament.",
        tags: ["captains", "tournament", "competition"]
    },

    // Guilds Events
    {
        id: "guild-battle-2015",
        start: "2015-05-30",
        category: "guilds",
        title: "Guild Battle: TNT Edition",
        description: "Guilds compete in TNT Tag for bragging rights and exclusive rewards.",
        tags: ["guild", "competition", "tnt"]
    },
    {
        id: "guild-war-summer-2017",
        start: "2017-08-05",
        category: "guilds",
        title: "Summer Guild Wars",
        description: "A special summer event where guilds battle it out in TNT Tag.",
        tags: ["guilds", "summer", "event"]
    },
    {
        id: "tnt-tag-guild-invitational",
        start: "2020-11-12",
        category: "guilds",
        title: "TNT Tag Guild Invitational",
        description: "Top guilds are invited to compete in a private TNT Tag tournament.",
        tags: ["guilds", "competition", "invitation"]
    },
    {
        id: "guild-battle-autumn-2021",
        start: "2021-10-10",
        category: "guilds",
        title: "Autumn Guild Battle",
        description: "Celebrate the fall season with a guild-versus-guild TNT Tag tournament.",
        tags: ["guilds", "autumn", "event"]
    },
    {
        id: "guild-spring-challenge",
        start: "2024-04-20",
        category: "guilds",
        title: "Spring Guild Challenge",
        description: "Guilds face off in TNT Tag during the beautiful spring season.",
        tags: ["guilds", "spring", "challenge"]
    },

    // Other Events
    {
        id: "tnt-new-years-bash-2016",
        start: "2016-01-01",
        category: "other",
        title: "TNT Tag New Year's Bash",
        description: "Kick off the new year with a festive TNT Tag event!",
        tags: ["new year", "celebration", "event"]
    },
    {
        id: "tnt-charity-tournament-2018",
        start: "2018-07-15",
        category: "other",
        title: "TNT Tag Charity Tournament",
        description: "Players compete to raise money for a great cause. All proceeds go to charity.",
        tags: ["charity", "tournament", "event"]
    },
    {
        id: "tnt-community-awards-2020",
        start: "2020-12-10",
        category: "other",
        title: "TNT Tag Community Awards",
        description: "A celebration of the year's top players, guilds, and moments in TNT Tag.",
        tags: ["awards", "community", "event"]
    },
    {
        id: "tnt-beach-party",
        start: "2023-06-15",
        category: "other",
        title: "TNT Tag Beach Party",
        description: "A casual, summer-themed event with special beach maps and rewards.",
        tags: ["summer", "party", "event"]
    },
    {
        id: "tnt-holiday-giveaway",
        start: "2024-03-18",
        category: "other",
        title: "Holiday Giveaway Event",
        description: "Celebrate the season with daily rewards and fun TNT Tag challenges.",
        tags: ["holiday", "giveaway", "event"]
    }
];

export { events };
