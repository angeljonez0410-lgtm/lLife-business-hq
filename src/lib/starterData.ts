import type { Business, ContentIdea, LearningPath, MoneyEntry, Product, Settings, Task } from "@/types";

const today = new Date().toISOString().slice(0, 10);

export const starterBusinesses: Business[] = [];

export const starterTasks: Task[] = [];

export const beginnerTasks = starterTasks;

export const starterContent: ContentIdea[] = [];

export const starterProducts: Product[] = [];

export const starterMoney: MoneyEntry[] = [];

const learningExtras: Record<string, Pick<LearningPath, "materials" | "tools" | "googleSearches" | "youtubeSearches" | "postIdeas" | "videoIdeas">> = {
  "T-Shirt Business": {
    materials: ["Canva account", "Mockup templates", "Blank shirt supplier or POD account", "Design niche list"],
    tools: ["Canva", "Printify or Printful", "Etsy or Shopify", "TikTok / Pinterest"],
    googleSearches: ["beginner t shirt business checklist", "best print on demand sites for beginners", "how to price t shirts for profit"],
    youtubeSearches: ["how to start a t shirt business with canva", "print on demand beginner tutorial", "t shirt mockup tutorial canva"],
    postIdeas: ["Show 3 design ideas and ask which one should drop first", "Before and after mockup reveal", "Niche quote tee carousel"],
    videoIdeas: ["Design with me in Canva", "How I price a t-shirt", "Packing or mockup creation process"],
  },
  "Canva + Cricut Crafts": {
    materials: ["Cricut machine", "Vinyl", "Transfer tape", "Blanks like cups, shirts, labels", "Weeding tools"],
    tools: ["Cricut Design Space", "Canva", "Ring light", "Order form"],
    googleSearches: ["cricut beginner project ideas", "vinyl types for cricut beginners", "how to price handmade cricut items"],
    youtubeSearches: ["cricut basics for beginners", "how to use transfer tape cricut", "easy cricut projects to sell"],
    postIdeas: ["Custom gift menu post", "Price list graphic", "Customer order spotlight"],
    videoIdeas: ["Weeding vinyl close-up", "Make a custom cup with me", "Beginner Cricut mistake and fix"],
  },
  "PickaPeppaStuffedPeppa": {
    materials: ["Menu list", "Ingredient cost sheet", "Food containers", "Labels", "Order form"],
    tools: ["Google Forms", "Canva menu", "Cash App / payment link", "Money tracker"],
    googleSearches: ["how to price food plates for profit", "home food business checklist", "food preorder form ideas"],
    youtubeSearches: ["how to price food plates", "food business content ideas", "meal prep business beginner"],
    postIdeas: ["Menu drop announcement", "Order deadline post", "Ingredient prep story"],
    videoIdeas: ["Plate assembly video", "Menu reveal", "Profit breakdown after order day"],
  },
  "Amazon Affiliate": {
    materials: ["Product niche list", "Amazon storefront", "Content schedule", "Product links"],
    tools: ["Amazon Associates", "TikTok", "Instagram", "Pinterest", "Link-in-bio"],
    googleSearches: ["amazon affiliate beginner guide", "amazon storefront content ideas", "how to make affiliate product posts"],
    youtubeSearches: ["amazon affiliate marketing for beginners", "amazon storefront tutorial", "amazon finds content strategy"],
    postIdeas: ["3 finds under $25", "Problem-solving product carousel", "My current favorites list"],
    videoIdeas: ["Amazon finds voiceover", "Product problem/solution demo", "Storefront tour"],
  },
  "Amazon Seller / Retail Arbitrage": {
    materials: ["Amazon Seller account", "Scanning app", "Budget limit", "Sourcing checklist"],
    tools: ["Amazon Seller app", "Keepa", "Profit calculator", "Inventory tracker"],
    googleSearches: ["retail arbitrage beginner guide", "amazon seller fees explained", "how to scan products for amazon fba"],
    youtubeSearches: ["retail arbitrage for beginners", "amazon seller app scanning tutorial", "amazon fba profit calculation"],
    postIdeas: ["What I scanned today", "Profit math example", "Retail arbitrage haul recap"],
    videoIdeas: ["Scan products with me", "How I decide if a product is worth it", "Beginner sourcing trip"],
  },
  Dropshipping: {
    materials: ["Niche ideas", "Winning product list", "Supplier research", "Landing page copy"],
    tools: ["TikTok Creative Center", "Shopify", "Canva", "Supplier marketplace"],
    googleSearches: ["dropshipping beginner checklist", "how to validate dropshipping product", "dropshipping landing page examples"],
    youtubeSearches: ["dropshipping for beginners 2026", "how to find winning products", "shopify landing page tutorial"],
    postIdeas: ["Product problem/solution post", "Niche research carousel", "Trend test recap"],
    videoIdeas: ["Product research screen recording", "Landing page build with me", "Testing a product idea"],
  },
  "ResumeVaultGod Website": {
    materials: ["Offer list", "Resume templates", "Pricing options", "Before/after examples"],
    tools: ["Next.js app", "Canva", "Stripe later", "Content planner"],
    googleSearches: ["resume website business ideas", "resume service pricing examples", "resume builder feature ideas"],
    youtubeSearches: ["how to sell resume services online", "resume website design", "resume tips content ideas"],
    postIdeas: ["Resume mistake of the day", "Before/after resume section", "Job search checklist"],
    videoIdeas: ["Resume teardown", "Fix this resume bullet", "Website tool demo"],
  },
  "Social Media Automation Bot": {
    materials: ["Feature list", "Prompt templates", "Dashboard flow", "API notes"],
    tools: ["Next.js", "OpenAI later", "Vercel", "LocalStorage / Supabase later"],
    googleSearches: ["social media automation app ideas", "content planner ai prompts", "build ai dashboard nextjs"],
    youtubeSearches: ["nextjs ai app tutorial", "build content planner app", "ai social media automation tutorial"],
    postIdeas: ["What my bot helps plan", "AI prompt before/after", "Dashboard feature update"],
    videoIdeas: ["Build the dashboard with me", "Prompt test demo", "Feature walkthrough"],
  },
};

const path = (business: string, steps: string[]): LearningPath => ({
  business,
  whatToLearnFirst: steps.slice(0, 2),
  doThisFirst: steps[0],
  beginnerChecklist: steps,
  buildStepByStep: steps.map((step, i) => `${i + 1}. ${step}`),
  commonMistakes: ["Trying to do too much at once", "Skipping prices and profit math", "Waiting until everything is perfect"],
  nextLevelSteps: ["Batch content", "Track what sells", "Improve the offer", "Create a repeatable system"],
  ...learningExtras[business],
});

export const starterLearning: LearningPath[] = [];

export const weeklySchedule: { day: string; focus: string; tasks: string[] }[] = [];

export const starterSettings: Settings = {
  profileName: "",
  theme: "Boss Pink",
  moneyGoal: 0,
  contentGoal: 0,
  businessCategories: "",
};
