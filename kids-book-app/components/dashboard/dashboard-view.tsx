"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { PagePreviewList } from "@/components/book/page-preview-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { AssembledBookPage, BookTemplate, GeneratedImageAsset } from "@/types/book";

type FlowState = "idle" | "uploading" | "generating" | "assembling" | "pdf" | "complete";

type DashboardViewProps = {
  templates: BookTemplate[];
};

const FLOW_STEPS: { id: FlowState; label: string }[] = [
  { id: "uploading", label: "Upload photos" },
  { id: "generating", label: "Generate illustrations" },
  { id: "assembling", label: "Assemble book" },
  { id: "pdf", label: "Generate PDF" },
  { id: "complete", label: "Ready!" },
];

export function DashboardView({ templates }: DashboardViewProps) {
  const [kidName, setKidName] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [favoriteThings, setFavoriteThings] = useState("");
  const [templateId, setTemplateId] = useState(templates[0]?.id ?? "when-i-grow-up");
  const [photoFiles, setPhotoFiles] = useState<FileList | null>(null);
  const [flowState, setFlowState] = useState<FlowState>("idle");
  const [pages, setPages] = useState<AssembledBookPage[]>([]);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImageAsset[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bookId, setBookId] = useState<string | null>(null);
  const [uploadedPhotoUrls, setUploadedPhotoUrls] = useState<string[]>([]);

  const selectedTemplate = useMemo(
    () => templates.find((template) => template.id === templateId) ?? templates[0],
    [templateId, templates]
  );

  const STEP_ORDER: FlowState[] = ["uploading", "generating", "assembling", "pdf", "complete"];

  function getStepStatus(stepId: FlowState): "Pending" | "Running" | "Done" {
    if (flowState === "complete") {
      return "Done";
    }

    if (flowState === "idle") {
      return "Pending";
    }

    const currentIndex = STEP_ORDER.indexOf(flowState);
    const stepIndex = STEP_ORDER.indexOf(stepId);

    if (stepIndex < currentIndex) {
      return "Done";
    }

    if (stepId === flowState) {
      return "Running";
    }

    return "Pending";
  }

  const isBusy = flowState !== "idle" && flowState !== "complete";

  async function handleGenerate() {
    setError(null);
    setPdfUrl(null);
    setPages([]);
    setGeneratedImages([]);
    setBookId(null);
    setUploadedPhotoUrls([]);

    if (!photoFiles || photoFiles.length === 0) {
      setError("Please attach between 1 and 3 photos.");
      return;
    }

    if (photoFiles.length > 3) {
      setError("You can upload up to 3 photos.");
      return;
    }

    if (!kidName.trim() || !guardianEmail.trim()) {
      setError("Kid name and guardian email are required.");
      return;
    }

    const favoriteThingsList = favoriteThings
      .split(",")
      .map((thing) => thing.trim())
      .filter(Boolean);

    try {
      setFlowState("uploading");

      const formData = new FormData();
      Array.from(photoFiles).forEach((file) => formData.append("photos", file));
      const uploadResponse = await fetch("/api/upload-photo", {
        method: "POST",
        body: formData,
      });

      const uploadJson = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadJson.error ?? "Unable to upload photos.");
      }

      const uploads: string[] = uploadJson.data?.uploads ?? [];
      setUploadedPhotoUrls(uploads);

      setFlowState("generating");
      const generateResponse = await fetch("/api/generate-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kidName,
          templateId,
          photoUrls: uploads,
        }),
      });
      const generateJson = await generateResponse.json();
      if (!generateResponse.ok) {
        throw new Error(generateJson.error ?? "Unable to generate images.");
      }
      const images: GeneratedImageAsset[] = generateJson.data?.images ?? [];
      setGeneratedImages(images);

      setFlowState("assembling");
      const assembleResponse = await fetch("/api/assemble-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kidName,
          guardianEmail,
          templateId,
          favoriteThings: favoriteThingsList,
          uploadedPhotoUrls: uploads,
          generatedImages: images,
        }),
      });
      const assembleJson = await assembleResponse.json();
      if (!assembleResponse.ok) {
        throw new Error(assembleJson.error ?? "Unable to assemble book.");
      }
      const assemblyPages: AssembledBookPage[] = assembleJson.data?.assembly?.pages ?? [];
      setPages(assemblyPages);
      setBookId(assembleJson.data?.bookId ?? null);

      setFlowState("pdf");
      const pdfResponse = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId,
          bookId: assembleJson.data?.bookId,
          child: {
            firstName: kidName,
            favoriteThings: favoriteThingsList,
          },
        }),
      });
      const pdfJson = await pdfResponse.json();
      if (!pdfResponse.ok) {
        throw new Error(pdfJson.error ?? "Unable to generate PDF.");
      }
      setPdfUrl(pdfJson.data?.pdfUrl ?? null);

      setFlowState("complete");
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "Something went wrong. Please try again.";
      setError(message);
      setFlowState("idle");
    }
  }

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Dashboard</p>
        <h1 className="text-4xl font-bold tracking-tight">Generate a personalized book in minutes</h1>
        <p className="text-muted-foreground">
          Upload up to three photos, choose a template, and let the API scaffold assemble everything:
          illustrations, layout previews, and a printable PDF.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Kid personalization</CardTitle>
            <CardDescription>Fill in the fields, then click Generate Book to run the full pipeline.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Kid name</label>
              <Input value={kidName} onChange={(event) => setKidName(event.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Guardian email</label>
              <Input
                type="email"
                value={guardianEmail}
                onChange={(event) => setGuardianEmail(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Favorite things (comma separated)</label>
              <Input
                placeholder="Dragons, moonlight, percussion"
                value={favoriteThings}
                onChange={(event) => setFavoriteThings(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select template</label>
              <div className="grid gap-3 md:grid-cols-2">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setTemplateId(template.id)}
                    className={`rounded-xl border p-4 text-left ${
                      templateId === template.id ? "border-primary bg-primary/5" : "border-muted"
                    }`}
                  >
                    <p className="text-sm font-semibold">{template.title}</p>
                    <p className="text-xs text-muted-foreground">{template.tagline}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload 1-3 photos</label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => setPhotoFiles(event.target.files)}
              />
              {uploadedPhotoUrls.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  Stored uploads: {uploadedPhotoUrls.map((url) => url.split("/").pop()).join(", ")}
                </p>
              )}
            </div>
            {error && <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
            <Button onClick={handleGenerate} disabled={isBusy}>
              {isBusy ? "Processing..." : "Generate Book"}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Flow status</CardTitle>
              <CardDescription>Each step calls its corresponding API route.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {FLOW_STEPS.map((step) => {
                const status = getStepStatus(step.id);
                const colorClass =
                  status === "Done" ? "text-emerald-600" : status === "Running" ? "text-primary" : "text-muted-foreground";
                return (
                  <div key={step.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                    <span>{step.label}</span>
                    <span className={`text-xs font-semibold ${colorClass}`}>{status}</span>
                  </div>
                );
              })}
              {pdfUrl && (
                <a href={pdfUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary">
                  Download latest PDF
                </a>
              )}
              {bookId && <p className="text-xs text-muted-foreground">Book record ID: {bookId}</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated images</CardTitle>
              <CardDescription>Stored in /generated + Prisma assets.</CardDescription>
            </CardHeader>
            <CardContent>
              {generatedImages.length === 0 ? (
                <p className="text-sm text-muted-foreground">No images yet. Run the flow to see renders.</p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                    {generatedImages.slice(0, 6).map((image) => (
                      <div key={image.id} className="rounded-lg border p-2">
                        <div className="aspect-video overflow-hidden rounded bg-muted">
                          <Image
                            src={image.url}
                            alt={image.prompt ?? image.sceneId}
                            width={320}
                            height={180}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="mt-2 text-xs font-semibold">{image.sceneId}</p>
                        <p className="text-[11px] text-muted-foreground">{image.prompt}</p>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Page preview</p>
              <h2 className="text-2xl font-bold">{selectedTemplate?.title} layout</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Pages swap in {(kidName || "your kid")}&apos;s name + art.
            </p>
          </div>
        <PagePreviewList pages={pages} />
      </section>
    </div>
  );
}
