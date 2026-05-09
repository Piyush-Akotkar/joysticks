import { useQuery } from "@tanstack/react-query";
import { api, type PackageResponse } from "@shared/routes";

export function usePackages() {
  return useQuery({
    queryKey: [api.packages.list.path],
    queryFn: async () => {
      const res = await fetch(api.packages.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch packages");
      return api.packages.list.responses[200].parse(await res.json());
    },
  });
}

export function usePackage(id: number) {
  return useQuery({
    queryKey: [api.packages.get.path, id],
    queryFn: async () => {
      // Manual URL building since buildUrl is backend-side mostly or needs import
      // But we can just use string template here if simple
      const url = api.packages.get.path.replace(":id", id.toString());
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch package");
      return api.packages.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
