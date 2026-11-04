import imgOffice from '../assets/blog/office-open.jpg';
import imgHealth from '../assets/blog/healthcare.jpg';
import imgInstitute from '../assets/blog/institute.jpg';
import imgAuditorium from '../assets/blog/auditorium.jpg';
import imgRestaurant from '../assets/blog/restaurant.jpg';
import imgExecutive from '../assets/blog/executive.jpg';
import imgWorkspace from '../assets/blog/workspace.jpg';

const POSTS = [
  {
    id: 'office-productivity',
    featured: true,
    cats: ['Office Furniture', 'Design Trends'],
    title: 'How Modern Office Furniture Boosts Productivity and Well-being',
    excerpt: 'Discover how thoughtfully designed office spaces can improve focus, collaboration and employee satisfaction in today’s workplace.',
    date: '15 Mar 2025',
    read: '8 min read',
    image: imgOffice,
    alt: 'Open-plan office with modular workstations and a city view',
    sections: [
      {
        heading: 'A workspace designed around people',
        paragraphs: [
          'An office is more than a place to sit and work. The layout, furniture and access to shared spaces all influence how comfortably people can focus, meet and move through their day.',
          'Start by observing how teams use the space. A mix of focused work areas, meeting settings and informal collaboration zones gives people room to choose the environment that suits each task.',
        ],
      },
      {
        heading: 'Comfort supports focused work',
        paragraphs: [
          'Adjustable seating and desks help employees find a comfortable working position. Pair them with practical storage and well-positioned screens to keep frequently used items close without crowding the workspace.',
          'Allow enough space around each workstation for movement and provide suitable lighting. These details make a room easier to use throughout the working day.',
        ],
      },
      {
        heading: 'Make collaboration easy',
        paragraphs: [
          'Shared tables, comfortable meeting chairs and thoughtfully placed breakout areas can make it easier for colleagues to exchange ideas. Keep these areas accessible without placing them where conversations interrupt focused work.',
          'Review the layout as teams and work patterns change. Flexible furniture makes it simpler to adapt the office without starting over.',
        ],
      },
    ],
  },
  {
    id: 'healing-spaces',
    cats: ['Healthcare', 'Industry Insights'],
    title: 'Designing Healing Spaces: The Role of Furniture in Healthcare',
    excerpt: 'Learn how ergonomics, comfort and thoughtful design contribute to better patient experiences.',
    date: '10 Mar 2025',
    read: '6 min read',
    image: imgHealth,
    alt: 'Hospital room with a patient bed and visitor chair',
    sections: [
      {
        heading: 'Comfort for patients and visitors',
        paragraphs: [
          'A healthcare space serves patients, visitors and staff, often at the same time. Comfortable seating, clear circulation and furniture suited to each room help make visits feel more welcoming and less stressful.',
          'Consider the needs of people with different mobility levels. Stable seating with appropriate height and unobstructed paths can make everyday movement easier.',
        ],
      },
      {
        heading: 'Support the work of care teams',
        paragraphs: [
          'Healthcare furniture should support frequent use and straightforward cleaning. Select materials and finishes according to the requirements of the room and the facility’s cleaning routines.',
          'Place work surfaces and storage where staff need them, while keeping essential routes and access to equipment clear.',
        ],
      },
      {
        heading: 'Plan each room for its purpose',
        paragraphs: [
          'A patient room, waiting area and consultation room each have different needs. Listing the activities that take place in a room is a useful first step when choosing furniture.',
          'When planning a refurbishment, gather feedback from both care teams and patients. Their day-to-day experience can reveal practical improvements that are easy to overlook.',
        ],
      },
    ],
  },
  {
    id: 'education-furniture',
    cats: ['Institutional', 'Product Guides'],
    title: 'Choosing the Right Furniture for Educational Institutions',
    excerpt: 'A complete guide to selecting durable, functional and flexible furniture for modern learning spaces.',
    date: '08 Mar 2025',
    read: '7 min read',
    image: imgInstitute,
    alt: 'Training hall with rows of desks and chairs',
    sections: [
      {
        heading: 'Match furniture to the learning activity',
        paragraphs: [
          'Classrooms, libraries, laboratories and shared learning areas all support different activities. Consider how a room is used before deciding on desk shapes, seating and storage.',
          'Where lessons involve group work, movable tables can make it easier to change between individual and collaborative layouts.',
        ],
      },
      {
        heading: 'Choose for daily use',
        paragraphs: [
          'Educational furniture sees frequent use from many students. Look for sturdy construction, practical finishes and designs that are easy to clean and maintain.',
          'Check dimensions and clearances in the room before ordering. Comfortable proportions and accessible walkways matter as much as the furniture itself.',
        ],
      },
      {
        heading: 'Plan for changing needs',
        paragraphs: [
          'A flexible selection of furniture can help institutions adapt rooms for different class sizes and teaching methods. Stackable or movable options may also simplify storage when a space has more than one purpose.',
          'Include teachers, facilities teams and students in the planning process so the final setup works for the people who use it.',
        ],
      },
    ],
  },
  {
    id: 'public-seating',
    cats: ['Public Seating', 'Design Trends'],
    title: 'Public Seating Solutions for Modern Spaces',
    excerpt: 'Explore innovative seating designs that combine durability, aesthetics and user comfort.',
    date: '05 Mar 2025',
    read: '5 min read',
    image: imgAuditorium,
    alt: 'Lecture auditorium with tiered seating',
    sections: [
      {
        heading: 'Plan around people and movement',
        paragraphs: [
          'Public areas need to welcome a varied range of visitors while keeping entrances, exits and circulation routes easy to navigate. Map the main paths through a space before placing seating.',
          'In waiting areas, a combination of individual seats and grouped seating can give visitors more choice.',
        ],
      },
      {
        heading: 'Select seating for the setting',
        paragraphs: [
          'An auditorium, reception area and transit lounge have different demands. Think about how long people will sit, how often the furniture will be used and what maintenance the venue can support.',
          'Durable materials and replaceable components can help simplify upkeep in busy environments.',
        ],
      },
      {
        heading: 'Create a clear, welcoming layout',
        paragraphs: [
          'Consistent finishes can help a public interior feel considered, while varied seating arrangements make the space more adaptable. Keep sightlines and access to nearby services in mind.',
          'Before finalising a layout, check it at full scale if possible. A simple floor plan or sample arrangement can help teams spot issues early.',
        ],
      },
    ],
  },
  {
    id: 'sustainable',
    cats: ['Design Trends', 'Industry Insights'],
    title: 'Sustainable Furniture Trends for a Greener Future',
    excerpt: 'Materials, finishes and design choices that make furniture last longer and waste less.',
    date: '03 Mar 2025',
    read: '5 min read',
    image: imgRestaurant,
    alt: 'Restaurant with green velvet chairs and plants',
    sections: [
      {
        heading: 'Start with long-term use',
        paragraphs: [
          'Keeping furniture in service for longer is a practical part of a more thoughtful purchasing approach. Durable construction, maintainable finishes and designs that suit changing spaces can all extend useful life.',
          'Consider repair and replacement options at the time of purchase, not only after an item needs attention.',
        ],
      },
      {
        heading: 'Ask about materials and care',
        paragraphs: [
          'Material choices affect appearance, maintenance and suitability for a particular setting. Ask suppliers for clear information about the materials used and the care they require.',
          'Choosing an appropriate finish for the expected level of use can help avoid premature wear and unnecessary replacement.',
        ],
      },
      {
        heading: 'Buy thoughtfully',
        paragraphs: [
          'A needs assessment can help organisations avoid purchasing more furniture than a space requires. Measure rooms, identify essential functions and plan for reuse where possible.',
          'Sustainable choices are most effective when they fit the way a space will actually be used and maintained.',
        ],
      },
    ],
  },
  {
    id: 'executive-office',
    cats: ['Office Furniture', 'Design Trends'],
    title: 'Executive Office Design Ideas for Modern Leaders',
    excerpt: 'Desk, seating and storage ideas for cabins that balance presence and practicality.',
    date: '28 Feb 2025',
    read: '6 min read',
    image: imgExecutive,
    alt: 'Executive cabin with a wooden desk and shelving',
    sections: [
      {
        heading: 'Balance focused work and meetings',
        paragraphs: [
          'An executive office often needs to support private work as well as one-to-one conversations. Plan the desk, visitor seating and meeting area so each activity has enough space.',
          'Position the desk to support comfortable screen use and a clear view of the entrance without blocking circulation.',
        ],
      },
      {
        heading: 'Use storage to keep the room organised',
        paragraphs: [
          'A considered mix of closed storage and accessible shelving keeps documents and daily essentials close while helping the office feel calm.',
          'Choose storage based on the items that need to be kept in the room. This helps avoid oversized units that take up useful floor space.',
        ],
      },
      {
        heading: 'Make the design feel cohesive',
        paragraphs: [
          'Coordinated furniture, finishes and lighting can give an office a consistent character without sacrificing comfort. Select materials that suit both the organisation and the room’s maintenance needs.',
          'The best executive spaces feel professional and personal, with every piece earning its place through comfort or function.',
        ],
      },
    ],
  },
  {
    id: 'future-workspaces',
    cats: ['Office Furniture', 'Industry Insights'],
    title: 'The Future of Workspaces: Trends to Watch',
    excerpt: 'Flexible layouts, hybrid work and the furniture that supports them.',
    date: '20 Feb 2025',
    read: '5 min read',
    image: imgWorkspace,
    alt: 'Minimal office desk by a window with a skyline view',
    sections: [
      {
        heading: 'Design for different ways of working',
        paragraphs: [
          'Workplaces now need to accommodate individual focus, planned meetings and informal collaboration. A range of settings can make an office more useful to people who visit for different reasons.',
          'Rather than assuming one layout suits everyone, review how teams use the office and create spaces around those activities.',
        ],
      },
      {
        heading: 'Keep layouts adaptable',
        paragraphs: [
          'Movable tables, modular seating and well-planned power access make it easier to adjust a space as team sizes and working patterns change.',
          'Flexibility works best when circulation, storage and technology are planned alongside the furniture.',
        ],
      },
      {
        heading: 'Let real use guide improvements',
        paragraphs: [
          'Gather feedback from employees and observe which areas are used most. This evidence can guide practical changes, from adding a quiet work zone to reconfiguring a meeting area.',
          'A workspace is an ongoing project. Regular reviews help it remain useful as an organisation evolves.',
        ],
      },
    ],
  },
];

export default POSTS;
