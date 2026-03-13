export type PromptCategory =
  | "origins"
  | "school"
  | "leaving_home"
  | "building"
  | "middle"
  | "later"
  | "crosscutting";

export type EmotionalWeight = "light" | "medium" | "heavy";

export interface UniversalPrompt {
  textA: string;
  textB: string;
  category: PromptCategory;
  sequenceOrder: number;
  emotionalWeight: EmotionalWeight;
  conditions?: string[];
}

export const universalPrompts: UniversalPrompt[] = [
  // Phase 1: Origins & Early Childhood (0-10)
  {
    textA: "Where were you born, and what do you know about the day you arrived?",
    textB: "What stories did your parents tell you about yourself as a baby or toddler?",
    category: "origins",
    sequenceOrder: 1,
    emotionalWeight: "light",
  },
  {
    textA: "What's your earliest memory?",
    textB: "Is there a memory you're not sure is real — something you might be remembering from a photo or a story someone told you?",
    category: "origins",
    sequenceOrder: 2,
    emotionalWeight: "light",
  },
  {
    textA: "Describe the first home you remember living in.",
    textB: "If you could walk through that home right now, what's the first room you'd go to and why?",
    category: "origins",
    sequenceOrder: 3,
    emotionalWeight: "light",
  },
  {
    textA: "Who was the most important adult in your life besides your parents?",
    textB: "What's something that person taught you that you didn't appreciate until much later?",
    category: "origins",
    sequenceOrder: 4,
    emotionalWeight: "light",
  },
  {
    textA: "What did you do for fun as a little kid?",
    textB: "Was there a game or activity you were obsessed with that you'd be embarrassed to admit now?",
    category: "origins",
    sequenceOrder: 5,
    emotionalWeight: "light",
  },
  {
    textA: "Did you have a pet growing up? Tell us about them.",
    textB: "Was there an animal encounter — funny, scary, or strange — that stuck with you?",
    category: "origins",
    sequenceOrder: 6,
    emotionalWeight: "light",
  },
  {
    textA: "What were meals like in your household?",
    textB: "What's a food from your childhood that you can still taste in your memory?",
    category: "origins",
    sequenceOrder: 7,
    emotionalWeight: "light",
  },
  {
    textA: "What scared you as a child?",
    textB: "Was there a moment when one of those fears actually came true — or when you realized it was silly?",
    category: "origins",
    sequenceOrder: 8,
    emotionalWeight: "light",
  },
  {
    textA: "What's a family tradition you remember from early childhood?",
    textB: "Is there a tradition your family had that you carried forward — or one you deliberately didn't?",
    category: "origins",
    sequenceOrder: 9,
    emotionalWeight: "light",
  },
  {
    textA: "Where are all the vacation destinations you remember from growing up?",
    textB: "Was there a vacation that went memorably wrong?",
    category: "origins",
    sequenceOrder: 10,
    emotionalWeight: "light",
  },

  // Phase 2: School Years & Adolescence (10-18)
  {
    textA: "What was your school like? Did you love it or dread it?",
    textB: "What was the walk or ride to school like? Who were you with?",
    category: "school",
    sequenceOrder: 11,
    emotionalWeight: "light",
  },
  {
    textA: "Who was your best friend growing up, and how did you meet?",
    textB: "Did you ever have a falling out with a close friend? What happened?",
    category: "school",
    sequenceOrder: 12,
    emotionalWeight: "light",
  },
  {
    textA: "Was there a teacher who changed you?",
    textB: "Was there a teacher you butted heads with? What was that about?",
    category: "school",
    sequenceOrder: 13,
    emotionalWeight: "light",
  },
  {
    textA: "What was your neighborhood like?",
    textB: "Was there a neighbor or local character everyone knew? What were they like?",
    category: "school",
    sequenceOrder: 14,
    emotionalWeight: "light",
  },
  {
    textA: "When did you first get in real trouble?",
    textB: "Did you ever get away with something you probably should have been caught for?",
    category: "school",
    sequenceOrder: 15,
    emotionalWeight: "light",
  },
  {
    textA: "What music, movies, or books mattered to you as a teenager?",
    textB: "Was there a song or movie that you associate with a specific moment in your teenage years?",
    category: "school",
    sequenceOrder: 16,
    emotionalWeight: "light",
  },
  {
    textA: "What did you think you wanted to be when you grew up?",
    textB: "Was there a moment when you realized that dream wasn't going to happen — or when it shifted into something else?",
    category: "school",
    sequenceOrder: 17,
    emotionalWeight: "medium",
  },
  {
    textA: "What was your relationship with your siblings like?",
    textB: "What's a story involving a sibling that only the two of you would really understand?",
    category: "school",
    sequenceOrder: 18,
    emotionalWeight: "light",
    conditions: ["has_siblings"],
  },
  {
    textA: "Tell us about your first crush or first date.",
    textB: "Looking back, what's funny about your first ideas of love or romance?",
    category: "school",
    sequenceOrder: 19,
    emotionalWeight: "medium",
  },
  {
    textA: "What's something you believed as a teenager that you've since changed your mind about?",
    textB: "Was there an argument or conversation that first made you question how you saw the world?",
    category: "school",
    sequenceOrder: 20,
    emotionalWeight: "medium",
  },

  // Phase 3: Leaving Home & Early Adulthood (18-30)
  {
    textA: "What was it like leaving home for the first time?",
    textB: "What's the first thing you did when you were truly on your own that felt like freedom?",
    category: "leaving_home",
    sequenceOrder: 21,
    emotionalWeight: "medium",
  },
  {
    textA: "Tell us about your first job.",
    textB: "Who was someone at your first job who left an impression on you?",
    category: "leaving_home",
    sequenceOrder: 22,
    emotionalWeight: "light",
  },
  {
    textA: "Where did you live in your twenties, and what was that like?",
    textB: "What did your apartment or room look like? What was on the walls?",
    category: "leaving_home",
    sequenceOrder: 23,
    emotionalWeight: "light",
  },
  {
    textA: "How did you figure out what you wanted to do with your life — or did you?",
    textB: "Was there a job, moment, or conversation that nudged you toward the path you ended up on?",
    category: "leaving_home",
    sequenceOrder: 24,
    emotionalWeight: "medium",
  },
  {
    textA: "Who were your closest friends in your twenties?",
    textB: "What did you and your friends do together that you couldn't imagine doing now?",
    category: "leaving_home",
    sequenceOrder: 25,
    emotionalWeight: "light",
  },
  {
    textA: "Tell us about a time you were completely broke.",
    textB: "What's the most creative thing you ever did to stretch a dollar?",
    category: "leaving_home",
    sequenceOrder: 26,
    emotionalWeight: "light",
  },
  {
    textA: "What was the most fun you ever had in your twenties?",
    textB: "Was there a night out or an adventure that became legendary among your friends?",
    category: "leaving_home",
    sequenceOrder: 27,
    emotionalWeight: "light",
  },
  {
    textA: "How did you meet your partner?",
    textB: "When did you first know this was the person — was there a specific moment?",
    category: "leaving_home",
    sequenceOrder: 28,
    emotionalWeight: "medium",
    conditions: ["has_partner"],
  },
  {
    textA: "What did your parents think of your choices at this age?",
    textB: "Was there a decision you made that your parents disagreed with but that turned out right?",
    category: "leaving_home",
    sequenceOrder: 29,
    emotionalWeight: "medium",
  },
  {
    textA: "Was there a moment where you felt like you became an adult?",
    textB: "Was there a moment where you realized your parents were just people figuring it out too?",
    category: "leaving_home",
    sequenceOrder: 30,
    emotionalWeight: "medium",
  },

  // Phase 4: Building a Life (25-45)
  {
    textA: "Tell us about your wedding day.",
    textB: "What's a detail from your wedding that most people wouldn't know about?",
    category: "building",
    sequenceOrder: 31,
    emotionalWeight: "medium",
    conditions: ["was_married"],
  },
  {
    textA: "What was your first home together like?",
    textB: "What's the first thing you remember fixing, decorating, or arguing about in that home?",
    category: "building",
    sequenceOrder: 32,
    emotionalWeight: "light",
    conditions: ["has_partner"],
  },
  {
    textA: "When did you decide to have kids, and why?",
    textB: "Did you know your child's name before they were born? How did you choose it?",
    category: "building",
    sequenceOrder: 33,
    emotionalWeight: "medium",
    conditions: ["has_children"],
  },
  {
    textA: "What surprised you most about becoming a parent?",
    textB: "What's a piece of parenting advice you got that turned out to be completely wrong — or completely right?",
    category: "building",
    sequenceOrder: 34,
    emotionalWeight: "medium",
    conditions: ["has_children"],
  },
  {
    textA: "What was your career like during this period?",
    textB: "Was there a boss, coworker, or moment at work that significantly changed your trajectory?",
    category: "building",
    sequenceOrder: 35,
    emotionalWeight: "light",
  },
  {
    textA: "Was there a time you seriously considered a totally different path?",
    textB: "What do you think your life would look like if you'd taken that other path?",
    category: "building",
    sequenceOrder: 36,
    emotionalWeight: "medium",
  },
  {
    textA: "Who did you lean on during the hard parts?",
    textB: "Was there someone who showed up for you in a way you didn't expect?",
    category: "building",
    sequenceOrder: 37,
    emotionalWeight: "medium",
  },
  {
    textA: "What's a trip or adventure from this era that you'll never forget?",
    textB: "Was there a trip that changed how you saw the world or yourself?",
    category: "building",
    sequenceOrder: 38,
    emotionalWeight: "light",
  },
  {
    textA: "How did your relationship with your own parents change?",
    textB: "Was there a moment when your parents asked you for advice — and what did that feel like?",
    category: "building",
    sequenceOrder: 39,
    emotionalWeight: "medium",
  },
  {
    textA: "What were you proudest of during this time?",
    textB: "What's an accomplishment from this period that nobody else would think to mention but that mattered deeply to you?",
    category: "building",
    sequenceOrder: 40,
    emotionalWeight: "light",
  },

  // Phase 5: Middle Years (40-60)
  {
    textA: "How did your priorities shift as you got older?",
    textB: "What's something you used to care about intensely that just stopped mattering?",
    category: "middle",
    sequenceOrder: 41,
    emotionalWeight: "medium",
  },
  {
    textA: "Was there a health scare or crisis that changed your perspective?",
    textB: "How did you take care of yourself during that time — or did you?",
    category: "middle",
    sequenceOrder: 42,
    emotionalWeight: "heavy",
  },
  {
    textA: "What was it like watching your kids grow up?",
    textB: "Was there a moment when you saw yourself in your child and it caught you off guard?",
    category: "middle",
    sequenceOrder: 43,
    emotionalWeight: "medium",
    conditions: ["has_children"],
  },
  {
    textA: "Did you ever move or make a major life change during this period?",
    textB: "What prompted it — was it a choice or did circumstances force your hand?",
    category: "middle",
    sequenceOrder: 44,
    emotionalWeight: "medium",
  },
  {
    textA: "What did you worry about most?",
    textB: "Looking back, was that worry justified, or was the real challenge something you didn't see coming?",
    category: "middle",
    sequenceOrder: 45,
    emotionalWeight: "medium",
  },
  {
    textA: "What brought you the most joy during this time?",
    textB: "Was there a new hobby, interest, or friendship that surprised you by how much it mattered?",
    category: "middle",
    sequenceOrder: 46,
    emotionalWeight: "light",
  },
  {
    textA: "How did you handle loss during these years?",
    textB: "Is there someone you lost who you find yourself still talking to in your head?",
    category: "middle",
    sequenceOrder: 47,
    emotionalWeight: "heavy",
  },
  {
    textA: "What's something you wish you'd done differently?",
    textB: "If you could go back and say one thing to yourself at 40, what would it be?",
    category: "middle",
    sequenceOrder: 48,
    emotionalWeight: "heavy",
  },
  {
    textA: "Tell us about a moment of unexpected happiness.",
    textB: "What's a completely ordinary day that turned out to be one of the best days of your life?",
    category: "middle",
    sequenceOrder: 49,
    emotionalWeight: "light",
  },

  // Phase 6: Later Life & Reflection (60+)
  {
    textA: "What's the biggest way the world has changed in your lifetime?",
    textB: "What's a change everyone else seems to mind that you actually enjoy?",
    category: "later",
    sequenceOrder: 50,
    emotionalWeight: "light",
  },
  {
    textA: "What do you know now that you wish you'd known at 20?",
    textB: "Is there advice you keep giving that nobody seems to listen to?",
    category: "later",
    sequenceOrder: 51,
    emotionalWeight: "medium",
  },
  {
    textA: "What are you most proud of?",
    textB: "What would you want to be remembered for that has nothing to do with achievement?",
    category: "later",
    sequenceOrder: 52,
    emotionalWeight: "medium",
  },
  {
    textA: "Is there a story your family tells about you that you'd like to set the record straight on?",
    textB: "Is there a story about you that your family doesn't know yet?",
    category: "later",
    sequenceOrder: 53,
    emotionalWeight: "medium",
  },
  {
    textA: "What do you want your grandchildren to know about you?",
    textB: "What do you want your grandchildren to know about the world you grew up in?",
    category: "later",
    sequenceOrder: 54,
    emotionalWeight: "medium",
  },
  {
    textA: "What does a perfect ordinary day look like for you now?",
    textB: "What's a small pleasure in your daily life that you'd miss if it went away?",
    category: "later",
    sequenceOrder: 55,
    emotionalWeight: "light",
  },
  {
    textA: "Who has been the most important person in your life, and why?",
    textB: "Is there someone who shaped your life significantly that you never got to properly thank?",
    category: "later",
    sequenceOrder: 56,
    emotionalWeight: "heavy",
  },
  {
    textA: "What's a small moment — one most people would forget — that you've carried with you all these years?",
    textB: "Why do you think that moment stayed with you?",
    category: "later",
    sequenceOrder: 57,
    emotionalWeight: "medium",
  },

  // Cross-cutting (could apply anywhere)
  {
    textA: "Tell us about a time you laughed harder than you ever have.",
    textB: "Who in your life has made you laugh the most over the years?",
    category: "crosscutting",
    sequenceOrder: 58,
    emotionalWeight: "light",
  },
  {
    textA: "What's the bravest thing you've ever done?",
    textB: "What's something you almost did but backed out of — and do you regret it?",
    category: "crosscutting",
    sequenceOrder: 59,
    emotionalWeight: "medium",
  },
  {
    textA: "Tell us about a place that feels like home, even if you don't live there anymore.",
    textB: "If you could spend one more afternoon in a place from your past, where would it be?",
    category: "crosscutting",
    sequenceOrder: 60,
    emotionalWeight: "medium",
  },
  {
    textA: "Is there someone you lost touch with that you still think about?",
    textB: "If they called you tomorrow, what would you want to say?",
    category: "crosscutting",
    sequenceOrder: 61,
    emotionalWeight: "medium",
  },
  {
    textA: "What's a skill or hobby that's been part of your life for a long time?",
    textB: "Who got you into it, and what keeps you coming back?",
    category: "crosscutting",
    sequenceOrder: 62,
    emotionalWeight: "light",
  },
  {
    textA: "Tell us about a meal you'll never forget.",
    textB: "Is there a recipe that means something to your family — and do you know where it came from?",
    category: "crosscutting",
    sequenceOrder: 63,
    emotionalWeight: "light",
  },
  {
    textA: "What's the hardest decision you've ever had to make?",
    textB: "How do you make big decisions — do you think it through, go with your gut, or ask someone?",
    category: "crosscutting",
    sequenceOrder: 64,
    emotionalWeight: "heavy",
  },
];
