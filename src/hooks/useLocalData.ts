"use client";

import { useEffect, useState } from "react";
import type { Business, ContentIdea, LearningPath, MoneyEntry, Product, Settings, Task } from "@/types";
import { starterBusinesses, starterContent, starterLearning, starterMoney, starterProducts, starterSettings, starterTasks } from "@/lib/starterData";

function useLocalData<T>(key: string, starter: T) {
  const [data, setData] = useState<T>(() => {
    if (typeof window === "undefined") return starter;
    const saved = window.localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : starter;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData] as const;
}

export const useBusinesses = () => useLocalData<Business[]>("boss-hq-businesses", starterBusinesses);
export const useTasks = () => useLocalData<Task[]>("boss-hq-tasks", starterTasks);
export const useContent = () => useLocalData<ContentIdea[]>("boss-hq-content", starterContent);
export const useMoney = () => useLocalData<MoneyEntry[]>("boss-hq-money", starterMoney);
export const useProducts = () => useLocalData<Product[]>("boss-hq-products", starterProducts);
export const useLearning = () => useLocalData<LearningPath[]>("boss-hq-learning", starterLearning);
export const useSettings = () => useLocalData<Settings>("boss-hq-settings", starterSettings);
