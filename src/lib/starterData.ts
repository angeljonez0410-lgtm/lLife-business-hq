import type { Business, ContentIdea, LearningPath, MoneyEntry, Product, Settings, Task } from "@/types";

const today = new Date().toISOString().slice(0, 10);

export const starterBusinesses: Business[] = [
  { id: "tshirts", name: "T-Shirt Business", icon: "Shirt", color: "bg-pink-500", status: "Building", stage: "Building", mainGoal: "Launch 5 bold designs", nextTask: "Create mockups for top designs", progress: 46, currentFocus: "Designs and mockups", blocker: "Need final product platform", lastUpdated: today, notes: "Still building the first clean offer.", moneyPotential: "Build Slowly" },
  { id: "crafts", name: "Canva + Cricut Crafts", icon: "Scissors", color: "bg-amber-400", status: "Active", stage: "Selling", mainGoal: "Sell easy custom gifts", nextTask: "Film a vinyl process video", progress: 58, currentFocus: "Simple products people can order fast", blocker: "Need clearer price list", lastUpdated: today, notes: "Good fast-cash project when energy is medium.", moneyPotential: "Fast Cash" },
  { id: "peppa", name: "PickaPeppaStuffedPeppa", icon: "ChefHat", color: "bg-rose-400", status: "Testing", stage: "Testing", mainGoal: "Take profitable food orders", nextTask: "Finalize menu and prices", progress: 38, currentFocus: "Menu, prices, content", blocker: "Need ingredient cost tracking", lastUpdated: today, notes: "Potential fast money if ordering system is simple.", moneyPotential: "Fast Cash" },
  { id: "affiliate", name: "Amazon Affiliate", icon: "ShoppingBag", color: "bg-zinc-900", status: "Active", stage: "Selling", mainGoal: "Post daily product finds", nextTask: "Make 3 Amazon finds posts", progress: 52, currentFocus: "Daily content and storefront clicks", blocker: "Need consistent posting rhythm", lastUpdated: today, notes: "Low inventory risk, needs content volume.", moneyPotential: "Fast Cash" },
  { id: "seller", name: "Amazon Seller / Retail Arbitrage", icon: "Package", color: "bg-yellow-500", status: "Learning", stage: "Learning", mainGoal: "Find profitable products", nextTask: "Scan 10 clearance items", progress: 31, currentFocus: "Learning scans, fees, and profit math", blocker: "Need practice sourcing", lastUpdated: today, notes: "Long-term skill project.", moneyPotential: "Long Term" },
  { id: "dropship", name: "Dropshipping", icon: "Truck", color: "bg-fuchsia-500", status: "Research", stage: "Idea", mainGoal: "Validate one winning product", nextTask: "Research 5 TikTok products", progress: 25, currentFocus: "Niche and product validation", blocker: "Need proof before building store", lastUpdated: today, notes: "Do not spend big until product is validated.", moneyPotential: "Long Term" },
  { id: "resumevault", name: "ResumeVaultGod Website", icon: "FileText", color: "bg-stone-900", status: "Building", stage: "Building", mainGoal: "Launch clear resume tools", nextTask: "Clean up pricing section", progress: 64, currentFocus: "Website offer and pricing clarity", blocker: "Need homepage polish", lastUpdated: today, notes: "Strong long-term brand if tools are clear.", moneyPotential: "Long Term" },
  { id: "bot", name: "Social Media Automation Bot", icon: "Bot", color: "bg-black", status: "Building", stage: "Building", mainGoal: "Automate content planning", nextTask: "Define MVP dashboard", progress: 42, currentFocus: "MVP features and prompts", blocker: "Need API decisions later", lastUpdated: today, notes: "Build slowly; can become SaaS later.", moneyPotential: "Build Slowly" },
];

export const starterTasks: Task[] = [
  "Post one product find|Amazon Affiliate|Content|High|Doing", "Create Canva tee design|T-Shirt Business|Build|High|Not Started", "Price stuffed Peppa plates|PickaPeppaStuffedPeppa|Money|High|Not Started", "Scan 10 retail items|Amazon Seller / Retail Arbitrage|Money|Medium|Not Started", "Fix ResumeVaultGod hero|ResumeVaultGod Website|Build|High|Doing", "Film Cricut process|Canva + Cricut Crafts|Content|Medium|Not Started", "Write bot feature list|Social Media Automation Bot|Admin|Medium|Done", "Study POD basics|T-Shirt Business|Learning|Low|Not Started", "List first craft product|Canva + Cricut Crafts|Money|High|Not Started", "Batch 5 content hooks|Amazon Affiliate|Content|High|Done", "Research dropship niche|Dropshipping|Learning|Medium|Not Started", "Create menu post|PickaPeppaStuffedPeppa|Content|Medium|Not Started", "Track today expenses|PickaPeppaStuffedPeppa|Admin|Low|Not Started", "Add pricing cards|ResumeVaultGod Website|Build|High|Not Started", "Make Pinterest pins|T-Shirt Business|Content|Medium|Not Started", "Review Amazon fees|Amazon Seller / Retail Arbitrage|Learning|Medium|Done", "Create product spreadsheet|Dropshipping|Admin|Low|Not Started", "DM 3 potential buyers|Canva + Cricut Crafts|Money|Medium|Not Started", "Draft Zu prompts|Social Media Automation Bot|Build|Medium|Doing", "Plan tomorrow|Boss HQ|Admin|Low|Not Started",
].map((row, index) => {
  const [title, business, type, priority, status] = row.split("|");
  return { id: `task-${index + 1}`, title, business, type, priority, status, dueDate: today, notes: "Starter task you can edit tonight." } as Task;
});

export const beginnerTasks = starterTasks;

export const starterContent: ContentIdea[] = [
  "3 Amazon finds under $25|TikTok|Amazon Affiliate", "Pack an order with me|Instagram|Canva + Cricut Crafts", "Stuffed Peppa plate reveal|TikTok|PickaPeppaStuffedPeppa", "Resume mistake nobody talks about|YouTube Shorts|ResumeVaultGod Website", "T-shirt design glow-up|Pinterest|T-Shirt Business", "Retail arbitrage haul|TikTok|Amazon Seller / Retail Arbitrage", "Day in my CEO life|Instagram|Boss HQ", "AI bot building update|Facebook|Social Media Automation Bot", "Dropshipping product test|TikTok|Dropshipping", "Craft pricing breakdown|YouTube Shorts|Canva + Cricut Crafts", "Amazon storefront favorites|Pinterest|Amazon Affiliate", "Menu preorder reminder|Facebook|PickaPeppaStuffedPeppa", "Resume template demo|TikTok|ResumeVaultGod Website", "Mockup before and after|Instagram|T-Shirt Business", "What I scanned today|YouTube Shorts|Amazon Seller / Retail Arbitrage", "5 hooks for small businesses|Instagram|Social Media Automation Bot", "Product research screen record|TikTok|Dropshipping", "Custom gift ideas|Pinterest|Canva + Cricut Crafts", "Sunday reset CEO style|Instagram|Boss HQ", "How I plan content fast|TikTok|Social Media Automation Bot",
].map((row, index) => {
  const [title, platform, business] = row.split("|");
  return { id: `content-${index + 1}`, title, platform, business, status: index % 5 === 0 ? "Posted" : index % 3 === 0 ? "Edited" : "Idea", hook: "Stop scrolling if you are building from scratch.", caption: "Building the empire one focused move at a time.", hashtags: "#bosslife #smallbusiness #contentcreator", postDate: today, notes: "Demo AI Mode can rewrite this." } as ContentIdea;
});

export const starterProducts: Product[] = [
  "Pink CEO tee|T-Shirt Business|8|28|Shopify|Research|Printify", "Custom cup decal|Canva + Cricut Crafts|3|15|Facebook|Listed|Cricut stash", "Stuffed Peppa plate|PickaPeppaStuffedPeppa|6|18|Local orders|Listed|Grocery store", "Desk organizer find|Amazon Affiliate|0|12|Amazon|Listed|Amazon", "Clearance toy bundle|Amazon Seller / Retail Arbitrage|14|34|Amazon FBA|Bought|Walmart", "Beauty organizer|Dropshipping|7|24|Shopify|Research|Supplier list", "Resume audit|ResumeVaultGod Website|0|49|Website|Listed|In-house", "Content scheduler MVP|Social Media Automation Bot|0|29|SaaS|Research|In-house", "Gold name sticker|Canva + Cricut Crafts|2|10|Instagram|Sold|Cricut stash", "Motivation hoodie|T-Shirt Business|18|45|Etsy|Research|Printful",
].map((row, index) => {
  const [productName, business, cost, sellingPrice, platform, status, supplier] = row.split("|");
  return { id: `product-${index + 1}`, productName, business, cost: Number(cost), sellingPrice: Number(sellingPrice), platform, status, supplier, notes: "Track margin and next move here." } as Product;
});

export const starterMoney: MoneyEntry[] = [
  ["Amazon Affiliate", 42, "Income", "Commission"], ["Canva + Cricut Crafts", 55, "Income", "Custom order"], ["PickaPeppaStuffedPeppa", 72, "Income", "Food order"], ["T-Shirt Business", 18, "Expense", "Mockup assets"], ["Amazon Seller / Retail Arbitrage", 31, "Expense", "Inventory"], ["ResumeVaultGod Website", 49, "Income", "Resume audit"], ["Dropshipping", 15, "Expense", "Product sample"], ["Canva + Cricut Crafts", 12, "Expense", "Vinyl"], ["Amazon Affiliate", 26, "Income", "Commission"], ["PickaPeppaStuffedPeppa", 19, "Expense", "Ingredients"],
].map(([business, amount, type, category], index) => ({ id: `money-${index + 1}`, date: today, business: String(business), amount: Number(amount), type: type as "Income" | "Expense", category: String(category), notes: "Starter money example." }));

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

export const starterLearning: LearningPath[] = [
  path("T-Shirt Business", ["Learn Canva basics", "Learn print-on-demand or heat press", "Create 5 designs", "Make mockups", "Post and sell"]),
  path("Canva + Cricut Crafts", ["Learn Cricut basics", "Learn vinyl types", "Create 3 easy products", "Price products", "Post process videos"]),
  path("PickaPeppaStuffedPeppa", ["Finalize menu", "Create content", "Price meals", "Collect orders", "Track profit"]),
  path("Amazon Affiliate", ["Pick product niche", "Create storefront", "Post finds daily", "Use captions/hooks", "Track clicks/sales"]),
  path("Amazon Seller / Retail Arbitrage", ["Learn retail arbitrage", "Scan products", "Check profit", "List products", "Ship orders"]),
  path("Dropshipping", ["Pick niche", "Find winning product", "Build landing page", "Create content", "Test sales"]),
  path("ResumeVaultGod Website", ["Fix core website", "Create useful resume tools", "Add clear pricing", "Create job content", "Promote daily"]),
  path("Social Media Automation Bot", ["Define features", "Build dashboard", "Add content planner", "Add AI prompts", "Connect APIs later"]),
];

export const weeklySchedule = [
  { day: "Monday", focus: "Content + Branding Day", tasks: ["Batch content hooks", "Refresh brand visuals", "Schedule posts"] },
  { day: "Tuesday", focus: "Amazon Money Day", tasks: ["Scan products", "Post affiliate finds", "Track sales"] },
  { day: "Wednesday", focus: "Crafts + T-Shirts Day", tasks: ["Create designs", "Make mockups", "Film process"] },
  { day: "Thursday", focus: "Food Business Day", tasks: ["Finalize menu", "Collect orders", "Track ingredients"] },
  { day: "Friday", focus: "Website + Tech Day", tasks: ["Build one feature", "Fix one page", "Write notes"] },
  { day: "Saturday", focus: "Big Money Day", tasks: ["List products", "Promote offers", "Follow up"] },
  { day: "Sunday", focus: "Reset + Plan Day", tasks: ["Reset workspace", "Plan Top 3", "Review money"] },
];

export const starterSettings: Settings = {
  profileName: "Boss",
  theme: "Boss Pink",
  moneyGoal: 2500,
  contentGoal: 30,
  businessCategories: "Food, Crafts, Amazon, Tech, Resume, Content",
};
