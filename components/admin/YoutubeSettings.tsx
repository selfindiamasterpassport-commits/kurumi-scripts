"use client";

import { useState } from "react";
import { Youtube, Save } from "lucide-react";
import { Button, Card, Input, Label } from "@heroui/react";

interface YoutubeSettingsProps {
  initialUrl: string;
  onSaved: () => void;
}

export function YoutubeSettings({ initialUrl, onSaved }: YoutubeSettingsProps) {
  const [youtubeUrl, setYoutubeUrl] = useState(initialUrl);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ youtubeUrl }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError("Save failed");
        return;
      }

      setYoutubeUrl(data.settings?.youtubeUrl ?? youtubeUrl);
      setSuccess(true);
      onSaved();
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border border-alliance-border bg-alliance-card/80">
      <Card.Content className="space-y-4 p-6">
        <div className="mb-1 flex items-center gap-2">
          <Youtube className="h-5 w-5 text-red-500" />
          <h3 className="font-display text-lg font-bold text-white">YouTube Settings</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="youtubeUrl">Channel URL</Label>
            <Input
              id="youtubeUrl"
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://youtube.com/@yourchannel"
              variant="primary"
              fullWidth
            />
            <p className="mt-1.5 text-xs text-alliance-muted/70">
              A &quot;YouTube Channel&quot; button appears on the store when a link is saved.
              Leave empty to hide it.
            </p>
          </div>
          <Button type="submit" variant="secondary" isDisabled={loading}>
            <Save className="h-4 w-4" />
            {loading ? "Saving..." : "Save YouTube Link"}
          </Button>
        </form>

        {error && (
          <div className="rounded-lg bg-red-950/50 px-3 py-2 text-sm text-red-300 ring-1 ring-red-900/50">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-lg bg-emerald-950/50 px-3 py-2 text-sm text-emerald-300 ring-1 ring-emerald-900/50">
            YouTube settings saved!
          </div>
        )}
      </Card.Content>
    </Card>
  );
}
