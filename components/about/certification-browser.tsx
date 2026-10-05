"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import type { Certification, CertificationGroup } from "@/content/credentials";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Certifications: a coverflow "spotlight" (the active certificate large, neighbours dimmed and joined by
 * connector lines) plus a capability-grouped index of every certificate. Both share `active`.
 * The coverflow is CSS transitions only (CLAUDE.md §10 layer 1); the global reduced-motion rule makes
 * it instant. Server-rendered, so the active certificate and the full index work without JS.
 */
export function CertificationBrowser({ groups }: { groups: CertificationGroup[] }) {
  const items = groups.flatMap((g) => g.items);
  const n = items.length;
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);
  const reduce = useReducedMotion();

  if (n === 0) return null;
  const current = items[active];
  const wrap = n >= 3;
  const toIndex = (i: number) => (wrap ? (i + n) % n : Math.max(0, Math.min(n - 1, i)));
  const go = (i: number) => setActive(toIndex(i));
  /** Relative moves use the latest state, so quick repeated keys/taps never skip. */
  const step = (delta: number) => setActive((a) => toIndex(a + delta));
  /** Signed distance from the active slide, wrapping around when there are enough slides. */
  const offset = (i: number) => {
    let d = i - active;
    if (wrap) {
      if (d > n / 2) d -= n;
      if (d < -n / 2) d += n;
    }
    return d;
  };
  const hasPrev = wrap || active > 0;
  const hasNext = wrap || active < n - 1;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" && hasPrev) {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight" && hasNext) {
      e.preventDefault();
      step(1);
    }
  };
  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === "touch") touchX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (touchX.current === null) return;
    const dx = e.clientX - touchX.current;
    touchX.current = null;
    if (dx > 40 && hasPrev) step(-1);
    else if (dx < -40 && hasNext) step(1);
  };

  const select = (i: number) => {
    go(i);
    const box = stageRef.current?.getBoundingClientRect();
    if (box && (box.top < 0 || box.bottom > innerHeight)) {
      stageRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    }
  };

  return (
    <div>
      {/* Spotlight */}
      <section
        ref={stageRef}
        aria-roledescription="carousel"
        aria-label="Certificates"
        tabIndex={n > 1 ? 0 : undefined}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <div className="touch-pan-y overflow-x-clip py-12 lg:[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="relative mx-auto aspect-[1.414] w-[84%] [--step:92%] [perspective:1600px] sm:w-[64%] sm:[--step:104%] lg:w-[42%] lg:[--step:112%]">
            {items.map((cert, i) => {
              const d = offset(i);
              const far = Math.abs(d) > 1;
              const isActive = d === 0;
              const style: CSSProperties = {
                transform: `translateX(calc(${Math.max(-2, Math.min(2, d))} * var(--step))) scale(${isActive ? 1 : 0.72}) rotateY(${Math.max(-1, Math.min(1, d)) * -10}deg)`,
                opacity: isActive ? 1 : far ? 0 : 0.45,
                zIndex: 10 - Math.abs(d),
              };
              return (
                <div
                  key={cert.id}
                  role={isActive ? "group" : undefined}
                  aria-roledescription={isActive ? "slide" : undefined}
                  aria-label={isActive ? `${pad(i + 1)} of ${pad(n)}: ${cert.name}` : undefined}
                  aria-hidden={isActive ? undefined : true}
                  onClick={isActive || far ? undefined : () => go(i)}
                  style={style}
                  className={cn(
                    "absolute inset-0 rounded-lg transition-[transform,opacity] duration-500 ease-(--ease-out-expo)",
                    isActive
                      ? "bg-spectrum p-px shadow-2xl shadow-foreground/10"
                      : "border bg-border/40",
                    !isActive && !far && "cursor-pointer hover:opacity-70",
                    far && "pointer-events-none",
                  )}
                >
                  <CertificateFace cert={cert} />
                </div>
              );
            })}

            {/* connectors (reference): dashed from the previous certificate, solid into the next */}
            {n > 1 && (
              <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
                {hasPrev && (
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute top-[30%] right-full h-[40%] w-[calc(var(--step)_-_86%)] overflow-visible"
                  >
                    <path
                      d="M0 75 H45 V35 H100"
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                      strokeDasharray="5 5"
                      className="stroke-spectrum-start"
                      strokeWidth={1.5}
                    />
                  </svg>
                )}
                {hasNext && (
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute top-[30%] left-full h-[40%] w-[calc(var(--step)_-_86%)] overflow-visible"
                  >
                    <path
                      d="M0 75 H55 V35 H100"
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                      className="stroke-spectrum-end"
                      strokeWidth={1.5}
                    />
                  </svg>
                )}
                {hasNext && (
                  <span className="absolute top-[60%] right-0 size-4 translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-spectrum-end bg-background ring-4 ring-spectrum-end/20" />
                )}
              </div>
            )}
          </div>
        </div>

        <p aria-live="polite" className="sr-only">
          Certificate {active + 1} of {n}: {current.name}, {current.provider}
        </p>
      </section>

      {/* Controls + caption for the active certificate */}
      <div className="mx-auto mt-4 max-w-2xl text-center">
        {n > 1 && (
          <div className="flex items-center justify-center gap-4">
            <StageButton label="Previous certificate" disabled={!hasPrev} onClick={() => step(-1)}>
              <ChevronLeft aria-hidden className="size-4" />
            </StageButton>
            <span className="label-mono w-20 text-muted-foreground tabular-nums">
              {pad(active + 1)} / {pad(n)}
            </span>
            <StageButton label="Next certificate" disabled={!hasNext} onClick={() => step(1)}>
              <ChevronRight aria-hidden className="size-4" />
            </StageButton>
          </div>
        )}
        <p className="mt-6 font-display text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">
          {current.name}
        </p>
        <p className="mt-2 text-muted-foreground">
          {current.provider}
          {current.partner && <> · {current.partner}</>}
        </p>
        <dl className="label-mono mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <div className="flex gap-2">
            <dt className="text-foreground/40">Issued</dt>
            <dd className="text-muted-foreground">
              <time dateTime={current.issuedIso}>{current.issued}</time>
            </dd>
          </div>
          {current.credentialId && (
            <div className="flex gap-2">
              <dt className="text-foreground/40">Credential</dt>
              <dd className="break-all text-muted-foreground">{current.credentialId}</dd>
            </div>
          )}
        </dl>
        {current.url && (
          <a
            href={current.url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold transition-colors hover:text-accent"
          >
            Verify credential
            <ArrowUpRight aria-hidden className="size-4" />
            <span className="sr-only">: {current.name}</span>
          </a>
        )}
      </div>

      {/* Index: every certificate, grouped by capability */}
      <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2">
        {groups.map((group) => (
          <section key={group.category} aria-labelledby={`cert-group-${group.category}`}>
            <h4
              id={`cert-group-${group.category}`}
              className="label-mono flex justify-between text-muted-foreground"
            >
              {group.title}
              <span className="text-foreground/40">{pad(group.items.length)}</span>
            </h4>
            <ul className="mt-4">
              {group.items.map((cert) => {
                const i = items.indexOf(cert);
                const isActive = i === active;
                return (
                  <li key={cert.id} className="flex items-stretch border-t">
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => select(i)}
                      className={cn(
                        "relative flex min-h-11 flex-1 flex-col items-start py-3 pl-4 text-left transition-colors hover:text-accent",
                        "before:absolute before:inset-y-3 before:left-0 before:w-0.5 before:rounded-full before:transition-colors",
                        isActive ? "before:bg-accent" : "before:bg-transparent",
                      )}
                    >
                      <span className="font-medium">{cert.name}</span>
                      <span className="label-mono mt-1 text-muted-foreground">
                        {cert.provider} · {cert.issuedIso.slice(0, 4)}
                      </span>
                    </button>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-11 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-accent"
                      >
                        <ArrowUpRight aria-hidden className="size-4" />
                        <span className="sr-only">Verify {cert.name}</span>
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function StageButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-11 items-center justify-center rounded-full border transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}

/** The certificate itself: the owner's image, or a typographic card until one is added. */
function CertificateFace({ cert }: { cert: Certification }) {
  return (
    <div className="relative size-full overflow-hidden rounded-[7px] bg-card">
      {cert.image ? (
        <Image
          src={cert.image}
          alt={`${cert.name} certificate — ${cert.provider}`}
          fill
          sizes="(min-width: 1024px) 42vw, (min-width: 640px) 64vw, 84vw"
          className="object-contain"
        />
      ) : (
        <div className="bg-grid flex size-full flex-col justify-between p-[7%]">
          <p className="label-mono text-muted-foreground">
            {cert.provider}
            {cert.partner && <> · {cert.partner}</>}
          </p>
          <div>
            <p className="label-mono text-foreground/40">Certificate</p>
            <p className="mt-2 font-display text-[clamp(1.1rem,2.6vw,2rem)] leading-tight font-semibold tracking-tight">
              {cert.name}
            </p>
          </div>
          <p className="label-mono flex justify-between text-muted-foreground">
            <time dateTime={cert.issuedIso}>{cert.issued}</time>
            {cert.credentialId && <span>{cert.credentialId}</span>}
          </p>
        </div>
      )}
    </div>
  );
}
