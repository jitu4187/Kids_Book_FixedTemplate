// Lightweight form that captures personalization notes; currently no submission logic.
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ChildProfile } from "@/types/book";

export function ChildProfileForm() {
  const [formState, setFormState] = useState<ChildProfile>({
    firstName: "",
    favoriteThings: [],
    guardianEmail: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.info("Form submit placeholder:", formState);
  }

  return (
    <form className="space-y-4 rounded-2xl border bg-card p-6 shadow-sm" onSubmit={handleSubmit}>
      <div>
        <label className="text-sm font-medium">Child name</label>
        <Input
          required
          placeholder="Avery"
          value={formState.firstName}
          onChange={(event) =>
            setFormState((prev) => ({ ...prev, firstName: event.target.value }))
          }
        />
      </div>
      <div>
        <label className="text-sm font-medium">Age</label>
        <Input
          type="number"
          min={1}
          max={12}
          placeholder="6"
          onChange={(event) =>
            setFormState((prev) => ({ ...prev, age: Number(event.target.value) }))
          }
        />
      </div>
      <div>
        <label className="text-sm font-medium">Guardian email</label>
        <Input
          type="email"
          required
          placeholder="grownup@email.com"
          value={formState.guardianEmail}
          onChange={(event) =>
            setFormState((prev) => ({ ...prev, guardianEmail: event.target.value }))
          }
        />
      </div>
      <div>
        <label className="text-sm font-medium">Favorite things (comma separated)</label>
        <Input
          placeholder="Dragons, tutus, blueberries"
          onChange={(event) =>
            setFormState((prev) => ({
              ...prev,
              favoriteThings: event.target.value
                .split(",")
                .map((value) => value.trim())
                .filter(Boolean),
            }))
          }
        />
      </div>
      <div>
        <label className="text-sm font-medium">Special notes</label>
        <Textarea
          placeholder="Any sensitivities, favorite phrases, or pronunciation notes."
          onChange={(event) =>
            setFormState((prev) => ({ ...prev, specialNotes: event.target.value }))
          }
        />
      </div>
      <Button type="submit" className="w-full">
        Save profile scaffold
      </Button>
    </form>
  );
}
