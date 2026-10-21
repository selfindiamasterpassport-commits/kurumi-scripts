import { StoreSwitcher } from "@/components/StoreSwitcher";
import { DiscordButton } from "@/components/DiscordButton";
import { getScriptsData } from "@/lib/scripts";
import { Flame } from "lucide-react";
import { Chip } from "@heroui/react/chip";
import { Card } from "@heroui/react/card";
import { StoreGridSkeleton } from "@/components/LoadingSkeleton";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { scripts, categories, settings } = await getScriptsData();

  const freeCount = scripts.filter((s) => s.pricing === "free").length;
  const paidCount = scripts.filter((s) => s.pricing === "paid").length;

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="relative mb-12 overflow-hidden rounded-3xl border border-alliance-border text-center">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-30 blur-sm"
          style={{ backgroundImage: "url('/kurumi-hero.jpg')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-alliance-black/40 via-alliance-black/70 to-alliance-black" />
        <div className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-4 flex justify-center">
          <Chip
            variant="soft"
            color="accent"
            size="md"
            className="border border-alliance-red/30 bg-alliance-red/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-alliance-red-bright"
          >
            <Flame className="h-3.5 w-3.5" />
            Roblox Scripts
          </Chip>
        </div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          <span className="text-white">Kurumi</span>
          <br />
          <span className="text-gradient">
            Script Store
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-alliance-muted sm:text-lg">
          Browse Kurumi curated scripts or search live results from
          ScriptBlox and RScripts — all in one place.
        </p>

        {settings.discordUrl && (
          <div className="mt-6 flex justify-center">
            <DiscordButton discordUrl={settings.discordUrl} className="sm:hidden" />
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {[
            { value: scripts.length, label: "Total Scripts", color: "text-alliance-red-bright" },
            { value: freeCount, label: "Free", color: "text-emerald-400" },
            { value: paidCount, label: "Paid", color: "text-amber-400" },
            { value: categories.length, label: "Categories", color: "text-white" },
          ].map((stat) => (
            <Card
              key={stat.label}
              className="min-w-[120px] border border-alliance-border bg-alliance-card/80 backdrop-blur-sm"
            >
              <Card.Content className="px-6 py-3 text-center">
                <p className={`font-display text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-alliance-muted">{stat.label}</p>
              </Card.Content>
            </Card>
          ))}
        </div>
        </div>
        <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-alliance-red/30 to-transparent" />
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
        <Suspense fallback={<StoreGridSkeleton />}>
          <StoreSwitcher scripts={scripts} categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}