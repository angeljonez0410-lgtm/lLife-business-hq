"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  Check,
  ChefHat,
  CircleDollarSign,
  FileText,
  LayoutDashboard,
  ListTodo,
  Package,
  Plus,
  Scissors,
  Settings,
  Shirt,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { weeklySchedule, starterBusinesses, starterContent, starterMoney, starterProducts, starterSettings, starterTasks } from "@/lib/starterData";
import { useBusinesses, useContent, useLearning, useMoney, useProducts, useSettings, useTasks } from "@/hooks/useLocalData";
import type { Business, ContentIdea, MoneyEntry, Product, Task } from "@/types";

type View = "dashboard" | "today" | "businesses" | "schedule" | "tasks" | "content" | "money" | "products" | "learning" | "zu" | "settings";

const navItems: { view: View; href: string; label: string; icon: LucideIcon }[] = [
  { view: "dashboard", href: "/", label: "Dashboard", icon: LayoutDashboard },
  { view: "today", href: "/today", label: "Today", icon: CalendarDays },
  { view: "businesses", href: "/businesses", label: "Businesses", icon: BriefcaseBusiness },
  { view: "schedule", href: "/schedule", label: "Schedule", icon: CalendarDays },
  { view: "tasks", href: "/tasks", label: "Tasks", icon: ListTodo },
  { view: "content", href: "/content", label: "Content", icon: Camera },
  { view: "money", href: "/money", label: "Money", icon: CircleDollarSign },
  { view: "products", href: "/products", label: "Products", icon: Package },
  { view: "learning", href: "/learning", label: "Learning", icon: Sparkles },
  { view: "zu", href: "/ai", label: "Zu AI Assistant", icon: Bot },
  { view: "settings", href: "/settings", label: "Settings", icon: Settings },
];

const mobileNav = navItems.filter((item) => ["dashboard", "tasks", "content", "money", "zu"].includes(item.view));
const iconMap: Record<string, LucideIcon> = { Shirt, Scissors, ChefHat, ShoppingBag, Package, Truck, FileText, Bot };
const badgeColors: Record<string, string> = {
  High: "bg-rose-600 text-white",
  Medium: "bg-amber-300 text-zinc-950",
  Low: "bg-cream text-zinc-900",
  Done: "bg-emerald-600 text-white",
  Doing: "bg-yellow-400 text-zinc-950",
  "Not Started": "bg-zinc-900 text-white",
  Income: "bg-emerald-600 text-white",
  Expense: "bg-rose-600 text-white",
};

const selectClass = "h-9 w-full rounded-lg border border-amber-200 bg-white/70 px-3 text-sm outline-none focus:ring-2 focus:ring-pink-300";
const textareaClass = "min-h-20 w-full rounded-lg border border-amber-200 bg-white/70 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-300";

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function money(entries: MoneyEntry[], type: "Income" | "Expense") {
  return entries.filter((entry) => entry.type === type).reduce((sum, entry) => sum + entry.amount, 0);
}

function groupCount(items: { business: string }[]) {
  return starterBusinesses.map((business) => ({
    name: business.name.replace(" / Retail Arbitrage", ""),
    value: items.filter((item) => item.business === business.name).length,
  }));
}

export default function BossDashboardApp({ view }: { view: View }) {
  const [businesses, setBusinesses] = useBusinesses();
  const [tasks, setTasks] = useTasks();
  const [content, setContent] = useContent();
  const [moneyEntries, setMoneyEntries] = useMoney();
  const [products, setProducts] = useProducts();
  const [learning] = useLearning();
  const [settings, setSettings] = useSettings();
  const [mode, setMode] = useState<"normal" | "low" | "high">("normal");
  const [confetti, setConfetti] = useState(false);

  const completed = tasks.filter((task) => task.status === "Done").length;
  const income = money(moneyEntries, "Income");
  const expenses = money(moneyEntries, "Expense");
  const bestBusiness = useMemo(() => {
    const totals = businesses.map((business) => ({
      name: business.name,
      total: moneyEntries.filter((entry) => entry.type === "Income" && entry.business === business.name).reduce((sum, entry) => sum + entry.amount, 0),
    }));
    return totals.sort((a, b) => b.total - a.total)[0]?.name ?? "None yet";
  }, [businesses, moneyEntries]);

  const chartData = [
    { name: "Week 1", income: income * 0.2 + 45 },
    { name: "Week 2", income: income * 0.3 + 70 },
    { name: "Week 3", income: income * 0.25 + 30 },
    { name: "Week 4", income },
  ];

  function completeTask(id: string) {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: "Done" } : task)));
    setConfetti(true);
    window.setTimeout(() => setConfetti(false), 1400);
  }

  function quickTask(type: Task["type"]) {
    setTasks([{ id: makeId("task"), title: `New ${type.toLowerCase()} task`, business: businesses[0]?.name ?? "Boss HQ", type, priority: "Medium", status: "Not Started", dueDate: new Date().toISOString().slice(0, 10), notes: "Created from quick action." }, ...tasks]);
  }

  function quickContent() {
    setContent([{ ...starterContent[0], id: makeId("content"), title: "New content idea", status: "Idea" }, ...content]);
  }

  function quickMoney() {
    setMoneyEntries([{ id: makeId("money"), date: new Date().toISOString().slice(0, 10), business: businesses[0]?.name ?? "Boss HQ", amount: 25, type: "Income", category: "Quick add", notes: "Added from dashboard." }, ...moneyEntries]);
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ffd6ec_0,#fff9f3_34%,#f7d36a_100%)] text-zinc-950">
      {confetti && <div className="pointer-events-none fixed inset-x-0 top-8 z-[80] mx-auto w-fit rounded-full bg-black px-5 py-3 text-sm font-bold text-white shadow-2xl">Task done. Progress looks good on you.</div>}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-white/50 bg-black/85 px-4 py-5 text-white shadow-2xl backdrop-blur-xl lg:block">
        <div className="mb-6 rounded-2xl border border-amber-300/40 bg-white/10 p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-200">Boss Life</p>
          <h1 className="mt-1 text-2xl font-black">Business HQ</h1>
        </div>
        <nav className="space-y-1">
          {navItems.map(({ href, label, icon: Icon, view: itemView }) => (
            <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${view === itemView ? "bg-pink-500 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"}`}>
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="pb-24 lg:ml-72 lg:pb-8">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Header settingsName={settings.profileName} mode={mode} onTask={() => quickTask("Admin")} onContent={quickContent} onMoney={quickMoney} onLow={() => setMode("low")} onHigh={() => setMode("high")} />
          {mode !== "normal" && <ModePanel mode={mode} />}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {view === "dashboard" && <Dashboard businesses={businesses} tasks={tasks} content={content} products={products} income={income} expenses={expenses} completed={completed} chartData={chartData} />}
            {view === "today" && <TodayPage tasks={tasks} onComplete={completeTask} onAddTask={() => quickTask("Money")} />}
            {view === "businesses" && <BusinessHub businesses={businesses} setBusinesses={setBusinesses} />}
            {view === "schedule" && <SchedulePage onAddTask={() => quickTask("Admin")} />}
            {view === "tasks" && <TasksPage tasks={tasks} setTasks={setTasks} businesses={businesses} onComplete={completeTask} />}
            {view === "content" && <ContentPage content={content} setContent={setContent} businesses={businesses} />}
            {view === "money" && <MoneyPage entries={moneyEntries} setEntries={setMoneyEntries} businesses={businesses} income={income} expenses={expenses} bestBusiness={bestBusiness} goal={settings.moneyGoal} chartData={chartData} />}
            {view === "products" && <ProductsPage products={products} setProducts={setProducts} businesses={businesses} />}
            {view === "learning" && <LearningPage learning={learning} />}
            {view === "zu" && <ZuPage />}
            {view === "settings" && <SettingsPage settings={settings} setSettings={setSettings} reset={() => { setBusinesses(starterBusinesses); setTasks(starterTasks); setContent(starterContent); setMoneyEntries(starterMoney); setProducts(starterProducts); setSettings(starterSettings); }} exportData={() => navigator.clipboard?.writeText(JSON.stringify({ businesses, tasks, content, moneyEntries, products, settings }, null, 2))} />}
          </motion.div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-5 border-t border-white/60 bg-white/85 px-2 py-2 shadow-2xl backdrop-blur-xl lg:hidden">
        {mobileNav.map(({ href, label, icon: Icon, view: itemView }) => (
          <Link key={href} href={href} className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[11px] font-semibold ${view === itemView ? "bg-black text-white" : "text-zinc-700"}`}>
            <Icon className="size-5" />
            {label === "Dashboard" ? "Home" : label.replace("Zu AI Assistant", "Zu")}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function Header({ settingsName, mode, onTask, onContent, onMoney, onLow, onHigh }: { settingsName: string; mode: string; onTask: () => void; onContent: () => void; onMoney: () => void; onLow: () => void; onHigh: () => void }) {
  const date = new Date();
  return (
    <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/60 bg-white/65 p-4 shadow-xl backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm font-semibold text-pink-700">{date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</p>
        <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Hey {settingsName || "Boss"}, let&apos;s build your empire.</h2>
        <p className="mt-1 text-sm text-zinc-600">Current focus day: CEO command center. Mode: {mode}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={onTask} className="bg-black text-white"><Plus /> Add Task</Button>
        <Button onClick={onContent} className="bg-pink-500 text-white"><Camera /> Add Content</Button>
        <Button onClick={onMoney} className="bg-amber-300 text-black"><CircleDollarSign /> Add Income</Button>
        <Button onClick={onLow} variant="outline">Low Energy</Button>
        <Button onClick={onHigh} variant="outline">High Hustle</Button>
      </div>
    </header>
  );
}

function ModePanel({ mode }: { mode: "low" | "high" }) {
  const low = ["1 money task", "1 content task", "1 learning task", "1 simple cleanup task"];
  const high = ["Batch 5 content ideas", "List 3 products", "Complete 3 business tasks", "Work 1 build task", "Review money tracker"];
  return (
    <Card className="mb-6 rounded-2xl border-0 bg-black p-5 text-white shadow-2xl">
      <h3 className="text-xl font-black">{mode === "low" ? "You do not have to do everything today. Just keep the promise small." : "You are locked in. Let's move like the CEO you are."}</h3>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {(mode === "low" ? low : high).map((item) => <div key={item} className="rounded-xl bg-white/10 p-3 text-sm">{item}</div>)}
      </div>
    </Card>
  );
}

function Dashboard({ businesses, tasks, content, products, income, expenses, completed, chartData }: { businesses: Business[]; tasks: Task[]; content: ContentIdea[]; products: Product[]; income: number; expenses: number; completed: number; chartData: { name: string; income: number }[] }) {
  const stats = [
    ["Tasks completed today", completed, Check],
    ["Content planned", content.length, Camera],
    ["Money made this month", `$${income}`, CircleDollarSign],
    ["Products listed", products.filter((p) => p.status === "Listed").length, Package],
    ["Businesses active", businesses.filter((b) => b.status !== "Research").length, BriefcaseBusiness],
    ["Learning steps completed", tasks.filter((t) => t.type === "Learning" && t.status === "Done").length, Sparkles],
  ] as const;
  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-0 bg-gradient-to-br from-black via-zinc-900 to-pink-800 p-6 text-white shadow-2xl">
        <p className="max-w-3xl text-3xl font-black leading-tight sm:text-5xl">One day at a time. One task at a time. One empire at a time.</p>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <MiniPlan title="Today's Top 3" items={tasks.slice(0, 3).map((t) => t.title)} />
          <MiniPlan title="Money Task" items={[tasks.find((t) => t.type === "Money")?.title ?? "Choose one money move"]} />
          <MiniPlan title="Content Task" items={[tasks.find((t) => t.type === "Content")?.title ?? "Post one thing"]} />
          <MiniPlan title="Learning Task" items={[tasks.find((t) => t.type === "Learning")?.title ?? "Learn one small step"]} />
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {stats.map(([label, value, Icon]) => <Card key={label} className="rounded-2xl border-white/60 bg-white/70 p-4 shadow-lg"><Icon className="mb-3 size-5 text-pink-600" /><p className="text-2xl font-black">{value}</p><p className="text-xs font-semibold text-zinc-600">{label}</p></Card>)}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-2xl bg-white/75 p-5 shadow-lg lg:col-span-2"><h3 className="font-black">Weekly Progress</h3><Progress value={Math.min(100, completed * 8)} className="mt-4 h-3" /><p className="mt-2 text-sm text-zinc-600">{Math.min(100, completed * 8)}% of this week&apos;s movement complete.</p></Card>
        <Card className="rounded-2xl bg-white/75 p-5 shadow-lg"><h3 className="font-black">Money Goal</h3><Progress value={Math.min(100, income / 25)} className="mt-4 h-3" /><p className="mt-2 text-sm text-zinc-600">${income - expenses} profit tracked.</p></Card>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <ChartCard title="Monthly income"><ResponsiveContainer width="100%" height={220}><AreaChart data={chartData}><XAxis dataKey="name" /><YAxis /><Tooltip /><Area type="monotone" dataKey="income" stroke="#db2777" fill="#f9a8d4" /></AreaChart></ResponsiveContainer></ChartCard>
        <ChartCard title="Content by platform"><ResponsiveContainer width="100%" height={220}><PieChart><Pie data={["TikTok", "Instagram", "Facebook", "YouTube Shorts", "Pinterest"].map((name) => ({ name, value: content.filter((c) => c.platform === name).length }))} dataKey="value" nameKey="name" outerRadius={80}>{["#db2777", "#facc15", "#111827", "#fb7185", "#f59e0b"].map((color) => <Cell key={color} fill={color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></ChartCard>
        <ChartCard title="Task completion by business"><ResponsiveContainer width="100%" height={220}><BarChart data={groupCount(tasks.filter((t) => t.status === "Done"))}><XAxis dataKey="name" hide /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="value" fill="#111827" /></BarChart></ResponsiveContainer></ChartCard>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{businesses.slice(0, 4).map((business) => <BusinessCard key={business.id} business={business} />)}</div>
    </div>
  );
}

function MiniPlan({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-2xl bg-white/10 p-4"><p className="mb-2 text-sm font-bold text-amber-200">{title}</p>{items.map((item) => <p key={item} className="text-sm text-white/90">{item}</p>)}</div>;
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <Card className="rounded-2xl bg-white/75 p-5 shadow-lg"><h3 className="mb-4 font-black">{title}</h3>{children}</Card>;
}

function TodayPage({ tasks, onComplete, onAddTask }: { tasks: Task[]; onComplete: (id: string) => void; onAddTask: () => void }) {
  const blocks = [
    ["Morning Block", ["Post one piece of content", "Check messages", "Choose one money task"]],
    ["Main Money Block", ["Food orders", "Product sourcing", "Listing items", "Affiliate post"]],
    ["Evening Build Block", ["Work on website/app", "Create designs", "Prep tomorrow"]],
  ];
  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
      <div className="space-y-4">{blocks.map(([title, items]) => <Card key={title as string} className="rounded-2xl bg-white/75 p-5 shadow-lg"><h3 className="text-xl font-black">{title}</h3><div className="mt-4 grid gap-2 sm:grid-cols-3">{(items as string[]).map((item) => <div key={item} className="rounded-xl border border-amber-200 bg-cream/70 p-3 text-sm font-semibold">{item}</div>)}</div></Card>)}</div>
      <Card className="rounded-2xl bg-black p-5 text-white shadow-2xl"><h3 className="text-xl font-black">Today&apos;s Checklist</h3><div className="mt-4 space-y-3">{tasks.slice(0, 6).map((task) => <div key={task.id} className="flex items-center justify-between gap-3 rounded-xl bg-white/10 p-3"><span className="text-sm">{task.title}</span><Button size="icon-sm" onClick={() => onComplete(task.id)} className="bg-pink-500"><Check /></Button></div>)}</div><Button onClick={onAddTask} className="mt-4 w-full bg-amber-300 text-black"><Plus /> Add task</Button></Card>
    </div>
  );
}

function BusinessHub({ businesses, setBusinesses }: { businesses: Business[]; setBusinesses: (value: Business[]) => void }) {
  const [active, setActive] = useState(businesses[0]?.id ?? "");
  const business = businesses.find((item) => item.id === active) ?? businesses[0];
  return <div className="space-y-5"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{businesses.map((item) => <button key={item.id} onClick={() => setActive(item.id)} className="text-left"><BusinessCard business={item} /></button>)}</div>{business && <Card className="rounded-2xl bg-white/80 p-5 shadow-xl"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><h3 className="text-2xl font-black">{business.name}</h3><Button onClick={() => setBusinesses(businesses.map((item) => item.id === business.id ? { ...item, progress: Math.min(100, item.progress + 5) } : item))}>Open Business</Button></div><div className="mt-4 grid gap-3 md:grid-cols-7">{["Overview", "Tasks", "Learning Path", "Content Ideas", "Products", "Money", "Notes"].map((tab) => <div key={tab} className="rounded-xl border border-amber-200 bg-white/70 p-3 text-sm font-bold">{tab}</div>)}</div><p className="mt-4 text-zinc-700">Main goal: {business.mainGoal}. Next task: {business.nextTask}.</p></Card>}</div>;
}

function BusinessCard({ business }: { business: Business }) {
  const Icon = iconMap[business.icon] ?? BriefcaseBusiness;
  return <Card className="rounded-2xl bg-white/75 p-5 shadow-lg"><div className="flex items-center gap-3"><div className={`grid size-11 place-items-center rounded-xl text-white ${business.color}`}><Icon className="size-5" /></div><div><h3 className="font-black">{business.name}</h3><p className="text-xs text-zinc-600">{business.status}</p></div></div><p className="mt-4 text-sm">{business.mainGoal}</p><p className="text-xs text-zinc-600">Next: {business.nextTask}</p><Progress value={business.progress} className="mt-4 h-2" /><Badge className="mt-3 w-fit bg-black text-white">{business.moneyPotential}</Badge></Card>;
}

function SchedulePage({ onAddTask }: { onAddTask: () => void }) {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{weeklySchedule.map((day, index) => <Card key={day.day} className="rounded-2xl bg-white/75 p-5 shadow-lg"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-bold text-pink-700">{day.day}</p><h3 className="text-xl font-black">{day.focus}</h3></div><Badge className="bg-black text-white">{(index + 2) * 10}%</Badge></div><div className="mt-4 space-y-2">{day.tasks.map((task) => <p key={task} className="rounded-xl bg-cream/80 p-3 text-sm">{task}</p>)}</div><Button onClick={onAddTask} className="mt-4 bg-pink-500 text-white"><Plus /> Add task</Button></Card>)}</div>;
}

function TasksPage({ tasks, setTasks, businesses, onComplete }: { tasks: Task[]; setTasks: (value: Task[]) => void; businesses: Business[]; onComplete: (id: string) => void }) {
  const empty: Task = { id: "", title: "", business: businesses[0]?.name ?? "Boss HQ", type: "Money", priority: "High", status: "Not Started", dueDate: new Date().toISOString().slice(0, 10), notes: "" };
  const [draft, setDraft] = useState<Task>(empty);
  const [filter, setFilter] = useState("All");
  const shown = tasks.filter((task) => filter === "All" || task.status === filter || task.business === filter || task.priority === filter || task.type === filter);
  function save() { if (!draft.title.trim()) return; setTasks([{ ...draft, id: makeId("task") }, ...tasks]); setDraft(empty); }
  return <CrudShell title="Task Manager" form={<div className="grid gap-3 md:grid-cols-3"><Input placeholder="Task title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /><Select value={draft.business} onChange={(business) => setDraft({ ...draft, business })} options={businesses.map((b) => b.name)} /><Select value={draft.type} onChange={(type) => setDraft({ ...draft, type: type as Task["type"] })} options={["Money", "Content", "Learning", "Admin", "Build"]} /><Select value={draft.priority} onChange={(priority) => setDraft({ ...draft, priority: priority as Task["priority"] })} options={["High", "Medium", "Low"]} /><Select value={draft.status} onChange={(status) => setDraft({ ...draft, status: status as Task["status"] })} options={["Not Started", "Doing", "Done"]} /><Input type="date" value={draft.dueDate} onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })} /><textarea className={`${textareaClass} md:col-span-2`} placeholder="Notes" value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} /><Button onClick={save} className="bg-black text-white"><Plus /> Create task</Button></div>} filters={<FilterBar current={filter} setCurrent={setFilter} values={["All", "Today", "This Week", "Money", "Learning", "Done", "Doing", "High", ...businesses.map((b) => b.name)]} />}>{shown.map((task) => <Card key={task.id} className="rounded-2xl bg-white/75 p-4 shadow"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><h3 className="font-black">{task.title}</h3><div className="mt-2 flex flex-wrap gap-2"><Badge className="bg-amber-300 text-black">{task.business}</Badge><Badge>{task.type}</Badge><Badge className={badgeColors[task.priority]}>{task.priority}</Badge><Badge className={badgeColors[task.status]}>{task.status}</Badge></div><p className="mt-2 text-sm text-zinc-600">{task.notes}</p></div><div className="flex gap-2"><Button size="icon" onClick={() => onComplete(task.id)}><Check /></Button><Button size="icon" variant="destructive" onClick={() => setTasks(tasks.filter((item) => item.id !== task.id))}><Trash2 /></Button></div></div></Card>)}</CrudShell>;
}

function ContentPage({ content, setContent, businesses }: { content: ContentIdea[]; setContent: (value: ContentIdea[]) => void; businesses: Business[] }) {
  const empty: ContentIdea = { id: "", title: "", platform: "TikTok", business: businesses[0]?.name ?? "Boss HQ", status: "Idea", hook: "", caption: "", hashtags: "", postDate: new Date().toISOString().slice(0, 10), notes: "" };
  const [draft, setDraft] = useState<ContentIdea>(empty);
  const [filter, setFilter] = useState("Ideas");
  const shown = content.filter((item) => filter === "Ideas" ? item.status === "Idea" : filter === "This Week" ? true : filter === "Ready to Post" ? ["Filmed", "Edited"].includes(item.status) : item.status === "Posted");
  const aiText = (kind: string) => `${kind}: Start with the problem, show the glow-up, then tell them the next step. Demo AI Mode.`;
  function save() { if (!draft.title.trim()) return; setContent([{ ...draft, id: makeId("content") }, ...content]); setDraft(empty); }
  return <CrudShell title="Content Planner" form={<div className="grid gap-3 md:grid-cols-3"><Input placeholder="Content title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /><Select value={draft.platform} onChange={(platform) => setDraft({ ...draft, platform: platform as ContentIdea["platform"] })} options={["TikTok", "Instagram", "Facebook", "YouTube Shorts", "Pinterest"]} /><Select value={draft.business} onChange={(business) => setDraft({ ...draft, business })} options={businesses.map((b) => b.name)} /><Select value={draft.status} onChange={(status) => setDraft({ ...draft, status: status as ContentIdea["status"] })} options={["Idea", "Filmed", "Edited", "Posted"]} /><Input placeholder="Hook" value={draft.hook} onChange={(e) => setDraft({ ...draft, hook: e.target.value })} /><Input type="date" value={draft.postDate} onChange={(e) => setDraft({ ...draft, postDate: e.target.value })} /><textarea className={textareaClass} placeholder="Caption" value={draft.caption} onChange={(e) => setDraft({ ...draft, caption: e.target.value })} /><textarea className={textareaClass} placeholder="Hashtags" value={draft.hashtags} onChange={(e) => setDraft({ ...draft, hashtags: e.target.value })} /><Button onClick={save} className="bg-black text-white"><Plus /> Add content</Button></div>} filters={<FilterBar current={filter} setCurrent={setFilter} values={["Ideas", "This Week", "Ready to Post", "Posted"]} />}>{shown.map((item) => <Card key={item.id} className="rounded-2xl bg-white/75 p-4 shadow"><div className="flex flex-col gap-3 lg:flex-row lg:justify-between"><div><h3 className="font-black">{item.title}</h3><div className="mt-2 flex flex-wrap gap-2"><Badge className="bg-pink-500 text-white">{item.platform}</Badge><Badge className="bg-amber-300 text-black">{item.business}</Badge><Badge>{item.status}</Badge></div><p className="mt-2 text-sm">{item.hook}</p><p className="text-xs text-zinc-600">{item.caption}</p></div><div className="flex flex-wrap gap-2">{["Generate Hook", "Generate Caption", "Generate Hashtags", "Make TikTok Script", "Turn Into Carousel"].map((kind) => <Button key={kind} size="sm" variant="outline" onClick={() => setContent(content.map((c) => c.id === item.id ? { ...c, notes: aiText(kind) } : c))}>{kind}</Button>)}<Button size="icon" variant="destructive" onClick={() => setContent(content.filter((c) => c.id !== item.id))}><Trash2 /></Button></div></div>{item.notes && <p className="mt-3 rounded-xl bg-cream/80 p-3 text-sm">{item.notes}</p>}</Card>)}</CrudShell>;
}

function MoneyPage({ entries, setEntries, businesses, income, expenses, bestBusiness, goal, chartData }: { entries: MoneyEntry[]; setEntries: (value: MoneyEntry[]) => void; businesses: Business[]; income: number; expenses: number; bestBusiness: string; goal: number; chartData: { name: string; income: number }[] }) {
  const [draft, setDraft] = useState<MoneyEntry>({ id: "", date: new Date().toISOString().slice(0, 10), business: businesses[0]?.name ?? "Boss HQ", amount: 0, type: "Income", category: "", notes: "" });
  function save() { setEntries([{ ...draft, id: makeId("money"), amount: Number(draft.amount) }, ...entries]); }
  return <div className="space-y-5"><div className="grid gap-4 md:grid-cols-5">{[["Monthly income", `$${income}`], ["Monthly expenses", `$${expenses}`], ["Profit", `$${income - expenses}`], ["Best business", bestBusiness], ["Goal progress", `${Math.min(100, Math.round((income / goal) * 100))}%`]].map(([label, value]) => <Card key={label} className="rounded-2xl bg-white/75 p-4 shadow"><p className="text-xl font-black">{value}</p><p className="text-xs text-zinc-600">{label}</p></Card>)}</div><ChartCard title="Income chart"><ResponsiveContainer width="100%" height={240}><AreaChart data={chartData}><XAxis dataKey="name" /><YAxis /><Tooltip /><Area dataKey="income" stroke="#111827" fill="#f9a8d4" /></AreaChart></ResponsiveContainer></ChartCard><CrudShell title="Income and Expense Tracker" form={<div className="grid gap-3 md:grid-cols-6"><Input type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} /><Select value={draft.business} onChange={(business) => setDraft({ ...draft, business })} options={businesses.map((b) => b.name)} /><Input type="number" value={draft.amount} onChange={(e) => setDraft({ ...draft, amount: Number(e.target.value) })} /><Select value={draft.type} onChange={(type) => setDraft({ ...draft, type: type as MoneyEntry["type"] })} options={["Income", "Expense"]} /><Input placeholder="Category" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} /><Button onClick={save} className="bg-black text-white"><Plus /> Add</Button></div>}>{entries.map((entry) => <Row key={entry.id} title={`${entry.type}: $${entry.amount}`} meta={`${entry.business} - ${entry.category}`} badge={entry.type} onDelete={() => setEntries(entries.filter((item) => item.id !== entry.id))} />)}</CrudShell></div>;
}

function ProductsPage({ products, setProducts, businesses }: { products: Product[]; setProducts: (value: Product[]) => void; businesses: Business[] }) {
  const [draft, setDraft] = useState<Product>({ id: "", productName: "", business: businesses[0]?.name ?? "Boss HQ", cost: 0, sellingPrice: 0, platform: "", status: "Research", supplier: "", notes: "" });
  function save() { if (!draft.productName.trim()) return; setProducts([{ ...draft, id: makeId("product") }, ...products]); }
  return <CrudShell title="Product Tracker" form={<div className="grid gap-3 md:grid-cols-4"><Input placeholder="Product name" value={draft.productName} onChange={(e) => setDraft({ ...draft, productName: e.target.value })} /><Select value={draft.business} onChange={(business) => setDraft({ ...draft, business })} options={businesses.map((b) => b.name)} /><Input type="number" placeholder="Cost" value={draft.cost} onChange={(e) => setDraft({ ...draft, cost: Number(e.target.value) })} /><Input type="number" placeholder="Selling price" value={draft.sellingPrice} onChange={(e) => setDraft({ ...draft, sellingPrice: Number(e.target.value) })} /><Input placeholder="Platform" value={draft.platform} onChange={(e) => setDraft({ ...draft, platform: e.target.value })} /><Select value={draft.status} onChange={(status) => setDraft({ ...draft, status: status as Product["status"] })} options={["Research", "Bought", "Listed", "Sold"]} /><Input placeholder="Supplier / Store" value={draft.supplier} onChange={(e) => setDraft({ ...draft, supplier: e.target.value })} /><Button onClick={save} className="bg-black text-white"><Plus /> Add product</Button></div>} filters={<div className="grid gap-4 md:grid-cols-4">{[["Profit margin", `${Math.round(products.reduce((sum, p) => sum + (p.sellingPrice - p.cost), 0))}`], ["Inventory status", products.filter((p) => p.status === "Bought").length], ["Listed products", products.filter((p) => p.status === "Listed").length], ["Sold products", products.filter((p) => p.status === "Sold").length]].map(([label, value]) => <Card key={label} className="rounded-2xl bg-black p-4 text-white"><p className="text-2xl font-black">{value}</p><p className="text-xs">{label}</p></Card>)}</div>}>{products.map((product) => <Row key={product.id} title={product.productName} meta={`${product.business} - ${product.platform} - profit $${product.sellingPrice - product.cost}`} badge={product.status} onDelete={() => setProducts(products.filter((item) => item.id !== product.id))} />)}</CrudShell>;
}

function LearningPage({ learning }: { learning: ReturnType<typeof useLearning>[0] }) {
  return <div className="grid gap-4 lg:grid-cols-2">{learning.map((path) => <Card key={path.business} className="rounded-2xl bg-white/75 p-5 shadow-lg"><h3 className="text-xl font-black">{path.business}</h3><p className="mt-2 font-bold text-pink-700">What to learn first</p><ul className="mt-2 space-y-1 text-sm">{path.whatToLearnFirst.map((item) => <li key={item}>- {item}</li>)}</ul><p className="mt-4 rounded-xl bg-black p-3 text-sm font-bold text-white">Do this first: {path.doThisFirst}</p><div className="mt-4 grid gap-3 md:grid-cols-2"><InfoList title="Beginner Checklist" items={path.beginnerChecklist} /><InfoList title="Common Mistakes" items={path.commonMistakes} /><InfoList title="Build Step-by-Step" items={path.buildStepByStep} /><InfoList title="Next Level Steps" items={path.nextLevelSteps} /></div></Card>)}</div>;
}

function ZuPage() {
  const [messages, setMessages] = useState(["Zu: Demo AI Mode is on. Tell me what you need and I will give you a simple boss plan."]);
  const prompts = ["Plan my day", "Give me 5 content ideas", "Make me a caption", "What should I focus on today?", "Give me a low energy plan", "Give me a high hustle plan", "Help me make money today"];
  function ask(prompt: string) { setMessages([...messages, `You: ${prompt}`, `Zu: ${prompt.includes("money") ? "Pick one fast cash lane today: post an offer, follow up, list one product, and track the result." : "Start with one clear outcome, one content move, one money move, and one tiny learning step. Keep it cute and completed."}`]); }
  return <Card className="rounded-2xl bg-black p-5 text-white shadow-2xl"><div className="flex items-center gap-3"><Bot className="size-8 text-pink-300" /><div><h3 className="text-2xl font-black">Zu AI Assistant</h3><p className="text-sm text-white/65">Demo AI Mode</p></div></div><div className="mt-5 max-h-[440px] space-y-3 overflow-auto rounded-2xl bg-white/10 p-4">{messages.map((message, index) => <p key={`${message}-${index}`} className="rounded-xl bg-white/10 p-3 text-sm">{message}</p>)}</div><div className="mt-4 flex flex-wrap gap-2">{prompts.map((prompt) => <Button key={prompt} onClick={() => ask(prompt)} className="bg-pink-500 text-white">{prompt}</Button>)}</div></Card>;
}

function SettingsPage({ settings, setSettings, reset, exportData }: { settings: ReturnType<typeof useSettings>[0]; setSettings: (value: ReturnType<typeof useSettings>[0]) => void; reset: () => void; exportData: () => void }) {
  return <Card className="rounded-2xl bg-white/80 p-5 shadow-xl"><h3 className="text-2xl font-black">Settings</h3><div className="mt-4 grid gap-3 md:grid-cols-2"><Input placeholder="Profile name" value={settings.profileName} onChange={(e) => setSettings({ ...settings, profileName: e.target.value })} /><Select value={settings.theme} onChange={(theme) => setSettings({ ...settings, theme: theme as typeof settings.theme })} options={["Boss Pink", "Black Gold", "Soft Cream"]} /><Input type="number" placeholder="Money goal" value={settings.moneyGoal} onChange={(e) => setSettings({ ...settings, moneyGoal: Number(e.target.value) })} /><Input type="number" placeholder="Content goal" value={settings.contentGoal} onChange={(e) => setSettings({ ...settings, contentGoal: Number(e.target.value) })} /><textarea className={`${textareaClass} md:col-span-2`} value={settings.businessCategories} onChange={(e) => setSettings({ ...settings, businessCategories: e.target.value })} /></div><div className="mt-4 flex flex-wrap gap-2"><Button onClick={exportData} className="bg-black text-white">Export data</Button><Button onClick={() => alert("Paste your exported JSON into localStorage later. Supabase notes: create tables for businesses, tasks, content, money, products, and learning paths, then swap hooks for Supabase queries.")} variant="outline">Import data</Button><Button onClick={reset} variant="destructive">Reset demo data</Button></div></Card>;
}

function CrudShell({ title, form, filters, children }: { title: string; form: React.ReactNode; filters?: React.ReactNode; children: React.ReactNode }) {
  return <div className="space-y-5"><Card className="rounded-2xl bg-white/80 p-5 shadow-xl"><h2 className="mb-4 text-2xl font-black">{title}</h2>{form}</Card>{filters}<div className="space-y-3">{children}</div></div>;
}

function FilterBar({ values, current, setCurrent }: { values: string[]; current: string; setCurrent: (value: string) => void }) {
  return <div className="flex gap-2 overflow-auto pb-1">{values.map((value) => <Button key={value} onClick={() => setCurrent(value)} variant={current === value ? "default" : "outline"} className={current === value ? "bg-black text-white" : "bg-white/70"}>{value}</Button>)}</div>;
}

function Select({ value, onChange, options }: { value: string; onChange: (value: string) => void; options: string[] }) {
  return <select className={selectClass} value={value} onChange={(e) => onChange(e.target.value)}>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select>;
}

function Row({ title, meta, badge, onDelete }: { title: string; meta: string; badge: string; onDelete: () => void }) {
  return <Card className="rounded-2xl bg-white/75 p-4 shadow"><div className="flex items-center justify-between gap-3"><div><h3 className="font-black">{title}</h3><p className="text-sm text-zinc-600">{meta}</p><Badge className={badgeColors[badge] ?? "bg-amber-300 text-black"}>{badge}</Badge></div><Button size="icon" variant="destructive" onClick={onDelete}><Trash2 /></Button></div></Card>;
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-xl bg-cream/70 p-3"><p className="font-bold">{title}</p><ul className="mt-2 space-y-1 text-sm">{items.map((item) => <li key={item}>- {item}</li>)}</ul></div>;
}
