"use client";

import { useEffect, useState } from "react";
import type { Business, ContentIdea, LearningPath, MoneyEntry, Product, Settings, Task } from "@/types";
import { starterBusinesses, starterContent, starterLearning, starterMoney, starterProducts, starterSettings, starterTasks } from "@/lib/starterData";
import { supabase } from "@/lib/supabaseClient";


// Map keys to Supabase table names
const tableMap: Record<string, string> = {
  "boss-hq-businesses": "businesses",
  "boss-hq-tasks": "tasks",
  "boss-hq-content": "content",
  "boss-hq-money": "money",
  "boss-hq-products": "products",
  "boss-hq-learning": "learning",
  "boss-hq-settings": "settings",
};

function useSupabaseData<T>(key: string, starter: T) {
  const [data, setData] = useState<T>(() => {
    if (typeof window === "undefined") return starter;
    const saved = window.localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : starter;
  });

  // Load from Supabase on mount
  useEffect(() => {
    const fetchData = async () => {
      const table = tableMap[key];
      if (!table) return;
      try {
        const { data: supaData, error } = await supabase.from(table).select();
        if (!error && supaData && supaData.length > 0) {
          setData(supaData as T);
          window.localStorage.setItem(key, JSON.stringify(supaData));
        }
      } catch (e) {
        // fallback to localStorage
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Save to Supabase and localStorage on change
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(data));
    const saveData = async () => {
      const table = tableMap[key];
      if (!table) return;
      try {
        // Clear table and insert new data (simple approach)
        await supabase.from(table).delete().neq('id', '');
        if (Array.isArray(data)) {
          if (data.length > 0) await supabase.from(table).insert(data);
        } else if (data && typeof data === 'object') {
          await supabase.from(table).upsert(data);
        }
      } catch (e) {
        // fallback to localStorage only
      }
    };
    saveData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, key]);

  return [data, setData] as const;
}

export const useBusinesses = () => useSupabaseData<Business[]>("boss-hq-businesses", starterBusinesses);
export const useTasks = () => useSupabaseData<Task[]>("boss-hq-tasks", starterTasks);
export const useContent = () => useSupabaseData<ContentIdea[]>("boss-hq-content", starterContent);
export const useMoney = () => useSupabaseData<MoneyEntry[]>("boss-hq-money", starterMoney);
export const useProducts = () => useSupabaseData<Product[]>("boss-hq-products", starterProducts);
export const useLearning = () => useSupabaseData<LearningPath[]>("boss-hq-learning", starterLearning);
export const useSettings = () => useSupabaseData<Settings>("boss-hq-settings", starterSettings);
