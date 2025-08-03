export const challenges = [
  // Days 1-10: Foundation Habits
  {
    id: 1,
    title: "Make Your Bed",
    description: "2-minute morning win that sets a productive tone. Studies show it correlates with better daily habits.",
    tags: ["quick", "mindful"],
    category: "morning",
    difficulty: 1,
    estimatedTime: "2 minutes",
    xpReward: 10
  },
  {
    id: 2,
    title: "10-Minute Morning Walk",
    description: "Get sunlight + movement immediately after waking. Boosts mood, energy, and vitamin D.",
    tags: ["physical", "morning"],
    category: "physical",
    difficulty: 1,
    estimatedTime: "10 minutes",
    xpReward: 10
  },
  {
    id: 3,
    title: "Three Gratitudes",
    description: "Write 3 specific things you're grateful for. Be detailed: \"My partner's laugh when...\" beats \"family.\"",
    tags: ["quick", "mindful"],
    category: "mental",
    difficulty: 1,
    estimatedTime: "5 minutes",
    xpReward: 10
  },
  {
    id: 4,
    title: "Sleep Schedule",
    description: "Pick a bedtime/wake time and stick to it (even weekends!). 7-9 hours is the sweet spot.",
    tags: ["recovery", "mindful"],
    category: "sleep",
    difficulty: 3,
    estimatedTime: "All day",
    xpReward: 20
  },
  {
    id: 5,
    title: "Mindful Breathing",
    description: "5 deep breaths before each meal (3x daily). Activates rest-and-digest mode.",
    tags: ["mindful", "quick"],
    category: "mental",
    difficulty: 1,
    estimatedTime: "5 minutes",
    xpReward: 10
  },
  {
    id: 6,
    title: "Phone-Free Mornings",
    description: "No phone for first 30 minutes after waking. Reclaim your mental clarity.",
    tags: ["mindful", "challenge"],
    category: "mental",
    difficulty: 2,
    estimatedTime: "30 minutes",
    xpReward: 15
  },
  {
    id: 7,
    title: "Evening Stretch",
    description: "10 minutes before bed. Focus on neck, shoulders, hips. YouTube \"bedtime stretching\" for guidance.",
    tags: ["physical", "recovery"],
    category: "physical",
    difficulty: 2,
    estimatedTime: "10 minutes",
    xpReward: 15
  },
  {
    id: 8,
    title: "Hydration Goal",
    description: "64oz water (8 glasses) spread throughout the day. Keep a water bottle visible as your reminder.",
    tags: ["nutrition", "quick"],
    category: "nutrition",
    difficulty: 2,
    estimatedTime: "All day",
    xpReward: 15
  },
  {
    id: 9,
    title: "Single-Task Eating",
    description: "No multitasking during meals. Chew slowly, taste fully. Improves digestion and satisfaction.",
    tags: ["mindful", "nutrition"],
    category: "mental",
    difficulty: 2,
    estimatedTime: "During meals",
    xpReward: 15
  },
  {
    id: 10,
    title: "Midday Stretching",
    description: "5-minute desk/couch stretch break. Focus on neck, shoulders, and back. Counter your daily posture.",
    tags: ["physical", "quick"],
    category: "physical",
    difficulty: 1,
    estimatedTime: "5 minutes",
    xpReward: 15
  },
  // Days 11-20: Building Momentum
  {
    id: 11,
    title: "5-Minute Meditation",
    description: "Use Insight Timer (free) or just count breaths. Same time daily for best results.",
    tags: ["mindful", "quick"],
    category: "mental",
    difficulty: 2,
    estimatedTime: "5 minutes",
    xpReward: 15
  },
  {
    id: 12,
    title: "Protein-First Breakfast",
    description: "Start with 20-30g protein. Stabilizes energy and reduces cravings all day.",
    tags: ["nutrition"],
    category: "nutrition",
    difficulty: 2,
    estimatedTime: "During breakfast",
    xpReward: 15
  },
  {
    id: 13,
    title: "Morning Cuddling",
    description: "10 minutes of intentional physical affection. No phones, no talking about tasks - just connection.",
    tags: ["social", "mindful"],
    category: "social",
    difficulty: 1,
    estimatedTime: "10 minutes",
    xpReward: 15
  },
  {
    id: 14,
    title: "Evening Journal",
    description: "3 prompts: What went well? What was challenging? What am I looking forward to?",
    tags: ["mindful"],
    category: "mental",
    difficulty: 2,
    estimatedTime: "10 minutes",
    xpReward: 15
  },
  {
    id: 15,
    title: "Vitamin D Break",
    description: "10 minutes outside without agenda. Sit in sun, observe nature, or walk slowly. Light exposure boosts mood.",
    tags: ["physical", "mindful"],
    category: "physical",
    difficulty: 1,
    estimatedTime: "10 minutes",
    xpReward: 15
  },
  {
    id: 16,
    title: "Strength Circuit",
    description: "3 rounds: 10 pushups, 20 squats, 30-second plank. Modify as needed, consistency matters most.",
    tags: ["physical", "quick"],
    category: "physical",
    difficulty: 3,
    estimatedTime: "15 minutes",
    xpReward: 20
  },
  {
    id: 17,
    title: "Social Media Boundaries",
    description: "Delete apps or use app timers. Limit to 30 minutes total daily.",
    tags: ["mindful", "challenge"],
    category: "mental",
    difficulty: 3,
    estimatedTime: "All day",
    xpReward: 20
  },
  {
    id: 18,
    title: "10,000 Steps",
    description: "Use phone tracker or watch. Take calls walking, park farther, use stairs. It adds up!",
    tags: ["physical"],
    category: "physical",
    difficulty: 3,
    estimatedTime: "All day",
    xpReward: 20
  },
  {
    id: 19,
    title: "Reading Routine",
    description: "20 minutes before bed. Fiction for relaxation, non-fiction for growth. No screens!",
    tags: ["mindful"],
    category: "mental",
    difficulty: 2,
    estimatedTime: "20 minutes",
    xpReward: 15
  },
  {
    id: 20,
    title: "Weekly Meal Prep",
    description: "Spend 2 hours prepping healthy options. Future you will be grateful.",
    tags: ["nutrition", "challenge"],
    category: "nutrition",
    difficulty: 3,
    estimatedTime: "2 hours",
    xpReward: 20
  },
  // Days 21-30: Advanced Optimization
  {
    id: 21,
    title: "Intermittent Fasting",
    description: "12-hour overnight fast (8pm-8am). Let your digestive system rest and reset.",
    tags: ["nutrition", "challenge"],
    category: "nutrition",
    difficulty: 4,
    estimatedTime: "12 hours",
    xpReward: 25
  },
  {
    id: 22,
    title: "Evening Brain Dump",
    description: "1 page stream-of-consciousness writing before bed. Clear mental clutter for better sleep.",
    tags: ["mindful"],
    category: "mental",
    difficulty: 2,
    estimatedTime: "10 minutes",
    xpReward: 15
  },
  {
    id: 23,
    title: "Digital Sunset",
    description: "All screens off 1 hour before bed. Use blue light filters after sunset if needed.",
    tags: ["mindful", "challenge"],
    category: "mental",
    difficulty: 4,
    estimatedTime: "1 hour",
    xpReward: 25
  },
  {
    id: 24,
    title: "Skill Practice",
    description: "15 minutes on something you want to improve. Compound interest applies to skills too.",
    tags: ["mindful"],
    category: "creative",
    difficulty: 2,
    estimatedTime: "15 minutes",
    xpReward: 15
  },
  {
    id: 25,
    title: "5AM Club",
    description: "Early rising for uninterrupted focus time. Prep clothes and coffee the night before.",
    tags: ["challenge", "morning"],
    category: "morning",
    difficulty: 5,
    estimatedTime: "All day",
    xpReward: 30
  },
  {
    id: 26,
    title: "Track Everything",
    description: "One day of complete food/mood/energy tracking. Data reveals patterns.",
    tags: ["mindful", "challenge"],
    category: "mental",
    difficulty: 3,
    estimatedTime: "All day",
    xpReward: 20
  },
  {
    id: 27,
    title: "Forest Bathing",
    description: "30+ minutes in nature, engaging all senses. The Japanese call it medicine.",
    tags: ["physical", "mindful", "recovery"],
    category: "physical",
    difficulty: 3,
    estimatedTime: "30+ minutes",
    xpReward: 20
  },
  {
    id: 28,
    title: "Acts of Service",
    description: "One intentional kindness daily. Text encouragement, help a neighbor, surprise someone.",
    tags: ["social", "mindful"],
    category: "social",
    difficulty: 2,
    estimatedTime: "Variable",
    xpReward: 15
  },
  {
    id: 29,
    title: "Complete Oral Care",
    description: "Floss, brush (2 min), tongue scrape, mouthwash. Your mouth affects total body health.",
    tags: ["quick", "recovery"],
    category: "self-care",
    difficulty: 2,
    estimatedTime: "5 minutes",
    xpReward: 15
  },
  {
    id: 30,
    title: "Design Tomorrow Tonight",
    description: "Before bed, write tomorrow's top 3 priorities. Wake up with clarity and purpose.",
    tags: ["mindful", "quick"],
    category: "mental",
    difficulty: 2,
    estimatedTime: "5 minutes",
    xpReward: 15
  }
]

export const challengeTips = [
  // Days 1-10: Foundation Habits
  "Place your alarm across the room so you have to get up. Make your bed immediately - momentum starts now!",
  "Lay out walking clothes the night before. No phone during the walk - this is your mindful movement time.",
  "Be specific! Instead of 'my health,' write 'the energy I felt after yesterday's walk.' Details make gratitude powerful.",
  "Use a sleep app to track consistency. Put devices in another room. Same bedtime alarm as important as morning alarm.",
  "Set phone reminders for meals. Count: in-2-3-4, hold-2-3-4, out-2-3-4, hold-2-3-4. Feel the calm.",
  "Charge phone outside bedroom. Use a real alarm clock. Replace scrolling with stretching or reading.",
  "Follow 'Yoga with Adriene' bedtime sequence. Hold each stretch 30 seconds. Breathe into tight spots.",
  "Fill a 32oz bottle twice daily. Add time marks on the bottle. Drink one glass upon waking.",
  "Put fork down between bites. Count 20 chews. Notice textures, temperatures, flavors. Eating is meditation.",
  "Set a lunch break reminder. Simple moves: neck rolls, shoulder shrugs, spinal twists. Your body will thank you.",
  // Days 11-20: Building Momentum
  "Same time, same place daily. Start with guided meditations. 'Noting' thoughts without judgment is the skill.",
  "Prep options: Greek yogurt + berries, eggs + veggies, protein smoothie. Eat within 30 min of waking.",
  "Set phones aside completely. Focus on being present together. Deep breathing, gentle touch, gratitude sharing.",
  "Keep journal by bed. Write even one sentence. 'Today I learned...' is a great starter prompt.",
  "Afternoon light exposure regulates circadian rhythm. No phone - just be present. Even cloudy days provide benefits.",
  "Can't do full pushups? Start on knees or against wall. Form beats reps. Rest 60 seconds between rounds.",
  "Remove apps from phone. Use website versions if needed. Put phone in drawer during focus time.",
  "Take meetings walking, park in furthest spot, take stairs twice, walk to errands. Small choices add up!",
  "Library books are free! Kindle has night mode. No emails/news before bed - protect your mental space.",
  "Sunday prep: chop veggies, cook grains, portion proteins. Containers ready = healthy choices easy.",
  // Days 21-30: Advanced Optimization
  "Stop eating 3 hours before bed. Black coffee/tea/water only during fast. Notice improved morning energy.",
  "Keep journal by bed. Write whatever's on your mind - worries, excitement, random thoughts. Brain dumping improves sleep.",
  "Use Night Shift/blue light filters after sunset. Charge devices outside bedroom. Books/journals only in bed.",
  "YouTube tutorials are free universities. 15 minutes daily = 91 hours yearly. What could you learn?",
  "Gradual approach: 15 min earlier weekly. Prep everything night before. You're buying morning peace.",
  "Use apps like Cronometer. Include energy levels (1-10) and mood. Patterns will surprise you.",
  "Walk slowly, breathe deeply, touch trees, sit quietly. This isn't exercise - it's nervous system medicine.",
  "Small acts count: hold doors, send appreciation texts, bring someone coffee. Kindness is a muscle.",
  "Floss first (when you're motivated), brush 2 min (use timer), tongue scraper removes bacteria. Don't skip!",
  "Write on paper, not phone. Include ONE must-do, two should-dos. Review in morning with coffee."
]

export const weeklyChallenges = [
  {
    id: 1,
    title: "Healthy Meal Photo",
    description: "Take a photo of your healthiest meal this week!",
    xpReward: 50
  },
  {
    id: 2,
    title: "Random Act of Kindness",
    description: "Do one random act of kindness together!",
    xpReward: 50
  },
  {
    id: 3,
    title: "New Activity Together",
    description: "Try a new physical activity as a couple!",
    xpReward: 50
  },
  {
    id: 4,
    title: "Phone-Free Date Night",
    description: "Have a phone-free date night!",
    xpReward: 50
  }
]

export const coupleChallenges = [
  {
    id: 1,
    title: "Cook Together",
    description: "Cook a healthy meal together this week!",
    xpReward: 75
  },
  {
    id: 2,
    title: "Daily Walks",
    description: "Take a 30-minute walk together daily!",
    xpReward: 75
  },
  {
    id: 3,
    title: "Massage Exchange",
    description: "Give each other a 10-minute massage!",
    xpReward: 75
  },
  {
    id: 4,
    title: "Plan Adventure",
    description: "Plan your next adventure together!",
    xpReward: 75
  }
]

export const getTagEmoji = (_tag) => {
  // Return empty string instead of emojis
  return ''
}

export const getCategoryEmoji = (_category) => {
  // Return empty string instead of emojis
  return ''
}