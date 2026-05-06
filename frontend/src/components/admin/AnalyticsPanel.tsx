import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  fetchAnalyticsDaily,
  fetchAnalyticsDevices,
  fetchAnalyticsGeo,
  fetchAnalyticsPages,
  fetchAnalyticsReferrers,
  fetchAnalyticsSummary,
} from "../../lib/api";
import type { AnalyticsSummary, DailyCount, DeviceRow, GeoRow, NamedCount } from "../../types";

const COLORS = ["#22d3ee", "#a78bfa", "#fb7185", "#34d399", "#fbbf24", "#94a3b8"];

export function AnalyticsPanel() {
  const [days, setDays] = useState(30);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [daily, setDaily] = useState<DailyCount[]>([]);
  const [geo, setGeo] = useState<GeoRow[]>([]);
  const [devices, setDevices] = useState<DeviceRow[]>([]);
  const [pages, setPages] = useState<NamedCount[]>([]);
  const [referrers, setReferrers] = useState<NamedCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const dParam = days === 0 ? 3650 : days;
        const [s, di, g, dev, pg, ref] = await Promise.all([
          fetchAnalyticsSummary(days === 0 ? 0 : days),
          fetchAnalyticsDaily(Math.min(dParam, 90)),
          fetchAnalyticsGeo(days === 0 ? 0 : days),
          fetchAnalyticsDevices(days === 0 ? 0 : days),
          fetchAnalyticsPages(days === 0 ? 0 : days),
          fetchAnalyticsReferrers(days === 0 ? 0 : days),
        ]);
        if (!cancelled) {
          setSummary(s);
          setDaily(di);
          setGeo(g);
          setDevices(dev);
          setPages(pg);
          setReferrers(ref);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [days]);

  const browserPie = aggregateBrowser(devices);
  const devicePie = aggregateDeviceFamily(devices);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-slate-400">Range:</span>
        {[7, 30, 90, 0].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDays(d)}
            className={`rounded-full px-4 py-1.5 text-sm ${
              days === d
                ? "bg-accent-cyan/20 text-accent-cyan"
                : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            {d === 0 ? "All" : `${d}d`}
          </button>
        ))}
      </div>

      {loading && <p className="text-slate-400">Loading analytics…</p>}

      {summary && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi title="Total visits" value={summary.total_visits} />
          <Kpi title="Unique visitors" value={summary.unique_visitors} />
          <Kpi title="New visitors (period)" value={summary.new_visitors_period} />
          <Kpi title="Returning %" value={`${summary.returning_percent}%`} />
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <ChartCard title="Daily visits">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={daily}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#0b1020", border: "1px solid #1e293b" }} />
              <Line type="monotone" dataKey="visits" stroke="#22d3ee" strokeWidth={2} dot={false} name="Visits" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top locations">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={geo.slice(0, 10).map((r) => ({ name: `${r.country} — ${r.city}`, count: r.count }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" hide />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#0b1020", border: "1px solid #1e293b" }} />
              <Bar dataKey="count" fill="#a78bfa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <ChartCard title="Browsers">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={browserPie} dataKey="value" nameKey="name" outerRadius={90} label>
                {browserPie.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#0b1020", border: "1px solid #1e293b" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Devices">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={devicePie} dataKey="value" nameKey="name" outerRadius={90} label>
                {devicePie.map((_, i) => (
                  <Cell key={i} fill={COLORS[(i + 2) % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#0b1020", border: "1px solid #1e293b" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <TableCard title="Top pages" rows={pages} />
        <TableCard title="Top referrers" rows={referrers} />
      </div>
    </div>
  );
}

function Kpi({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-900/40 p-4">
      <h3 className="mb-2 text-sm font-semibold text-slate-200">{title}</h3>
      {children}
    </div>
  );
}

function TableCard({ title, rows }: { title: string; rows: NamedCount[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-900/40 p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-200">{title}</h3>
      <div className="max-h-64 overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-ink-900 text-slate-400">
            <tr>
              <th className="py-2 pr-2">Name</th>
              <th className="py-2">Count</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-white/5">
                <td className="py-2 pr-2 text-slate-200 break-all">{r.name}</td>
                <td className="py-2 text-accent-cyan">{r.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function aggregateBrowser(rows: DeviceRow[]) {
  const m = new Map<string, number>();
  rows.forEach((r) => {
    const name = r.browser || "Unknown";
    m.set(name, (m.get(name) ?? 0) + r.count);
  });
  return [...m.entries()].map(([name, value]) => ({ name, value }));
}

function aggregateDeviceFamily(rows: DeviceRow[]) {
  const m = new Map<string, number>();
  rows.forEach((r) => {
    const name = r.device || "Other";
    m.set(name, (m.get(name) ?? 0) + r.count);
  });
  return [...m.entries()].map(([name, value]) => ({ name, value }));
}
